import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  SafeAreaView,
} from 'react-native';
import { services } from './ServicesScreen';
import { CartContext } from '../CartContext';

const HomeScreen = ({ navigation }) => {
  const { cart, setCart } = useContext(CartContext);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentOffer, setCurrentOffer] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    require('../assets/home-image1.jpg'),
    require('../assets/home-image2.jpg'),
    require('../assets/home-image3.jpg'),
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const openOfferModal = (offer) => {
    setCurrentOffer(offer);
    setModalVisible(true);
  };

  const closeOfferModal = () => {
    setModalVisible(false);
    setCurrentOffer('');
  };

  const servicesWithOffers = services.filter((service) => service.offer);

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Image source={item.icon} style={styles.serviceIcon} />
      <Text style={styles.serviceName}>{item.name}</Text>

      {item.offer && (
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => openOfferModal(item.offer)}
        >
          <Text style={styles.viewButtonText}>View Offer</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.bookButton}
        onPress={() => {
          setCart([
            ...cart,
            {
              id: item.id,
              name: item.name,
              price: item.price,
              discountPrice: item.discountPrice || null,
              discountPercentage: item.discountPercentage || null,
            },
          ]);
          Alert.alert('Success', `${item.name} added to cart!`);
        }}
      >
        <Text style={styles.viewButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  const renderDots = () => (
    <View style={styles.dotsContainer}>
      {images.map((_, index) => (
        <View
          key={index}
          style={[styles.dot, index === currentImageIndex && styles.activeDot]}
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Welcome to{'\n'}Home Services!</Text>

            <Image
              source={images[currentImageIndex]}
              style={styles.homeImage}
              resizeMode="cover"
            />
            {renderDots()}

            <View style={styles.offersContainer}>
              <Text style={styles.offersTitle}>🔥 Special Offers Just for You! 🔥</Text>
              <Text style={styles.offersText}>
                Don’t miss out on exclusive discounts! For a limited time, enjoy incredible deals across a variety of services.
              </Text>
            </View>

            <Text style={styles.sectionTitle}>Our Offers</Text>
          </>
        }
        data={servicesWithOffers}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeOfferModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Special Offer!</Text>
            <Text style={styles.modalText}>{currentOffer}</Text>
            <TouchableOpacity onPress={closeOfferModal} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#79ab68',
    textAlign: 'center',
  },
  homeImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    margin: 5,
  },
  activeDot: {
    backgroundColor: '#79ab68',
  },
  offersContainer: {
    backgroundColor: '#ffeb3b',
    marginVertical: 20,
    marginHorizontal: 16,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  offersTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 10,
  },
  offersText: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  gridContainer: {
    paddingHorizontal: 10,
    paddingBottom: 30,
  },
  serviceItem: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    margin: 5,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceIcon: {
    width: '100%',
    height: 100,
    marginBottom: 10,
    borderRadius: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewButton: {
    backgroundColor: '#d32f2f',
    padding: 8,
    borderRadius: 5,
    marginTop: 10,
  },
  bookButton: {
    backgroundColor: '#79ab68',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#79ab68',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
