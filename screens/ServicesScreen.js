import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert, Modal, TextInput } from 'react-native';
import { CartContext } from '../CartContext';  

// Import images
import plumbingIcon from '../assets/plumbing.jpg';
import electricalIcon from '../assets/electrical.jpg';
import carpentryIcon from '../assets/carpentry.jpg';
import cleaningIcon from '../assets/cleaning.jpg';
import pestControlIcon from '../assets/pestControl.jpg';
import acRepairIcon from '../assets/acRepair.jpg';
import paintingIcon from '../assets/painting.jpg';
import movingIcon from '../assets/moving.jpg';
import gardeningIcon from '../assets/gardening.jpg';
import roofingIcon from '../assets/roofing.jpg';
import laundryIcon from '../assets/laundry.jpg';
import childCareIcon from '../assets/childCare.jpg';
import personalChefIcon from '../assets/personalChef.jpg';
import eventPlanningIcon from '../assets/eventPlanning.jpg';
import tutoringIcon from '../assets/tutoring.jpg';
import techsupportIcon from '../assets/techSupport.jpg';

export const services = [
  { 
    id: '1', 
    name: 'Plumbing', 
    description: 'Fix leaky faucets, install pipes, and more.', 
    price: '$100', 
    icon: plumbingIcon,
    extendedDescription: 'Our plumbing service includes leak detection, pipe repair, and installation of water systems for your home or office. We use top-notch materials and offer a guarantee for all our work.', 
    offer: 'Get 20% off your first plumbing service!'
  },
  { 
    id: '2', 
    name: 'Electrical', 
    description: 'Electrical wiring, troubleshooting, and installations.', 
    price: '$150', 
    icon: electricalIcon,
    extendedDescription: 'We specialize in safe and efficient electrical wiring, fault detection, and installation of modern electrical systems for residential and commercial properties.',
    offer: 'Save $25 on electrical troubleshooting.'
  },
  { 
    id: '3', 
    name: 'Carpentry', 
    description: 'Custom furniture, woodwork repairs, and installations.', 
    price: '$200', 
    icon: carpentryIcon,
    extendedDescription: 'From custom cabinets to home furniture, our carpentry services are tailored to your needs. We offer both repairs and bespoke creations.',
    offer: '15% off on custom furniture design!'
  },
  { 
    id: '4', 
    name: 'House Cleaning', 
    description: 'Comprehensive home cleaning services.', 
    price: '$120', 
    icon: cleaningIcon,
    extendedDescription: 'Our cleaning service covers all areas of your home, including deep cleaning of kitchens, bathrooms, and living spaces. We use eco-friendly products for your safety.',
    offer: 'Free carpet cleaning with any home cleaning service!'
  },
  { 
    id: '5', 
    name: 'Pest Control', 
    description: 'Rodent control, insect extermination, and prevention.', 
    price: '$150', 
    icon: pestControlIcon,
    extendedDescription: 'Our pest control experts offer quick and effective treatments for all types of pests, including termites, rodents, and insects. We ensure your home is pest-free and safe.',
    offer: '10% off pest control services this month!'
  },
  { 
    id: '6', 
    name: 'AC Repair', 
    description: 'Air conditioning installation, maintenance, and repairs.', 
    price: '$250', 
    icon: acRepairIcon,
    extendedDescription: 'We provide installation, maintenance, and repair services for all major air conditioning brands. Our experts ensure your system runs smoothly year-round.',
    offer: 'Free AC inspection with any repair service!'
  },
  { 
    id: '7', 
    name: 'Painting', 
    description: 'Interior and exterior painting services.', 
    price: '$200', 
    icon: paintingIcon,
    extendedDescription: 'Whether you want to refresh your interior or renovate the exterior, our painting services are guaranteed to provide a flawless finish that enhances your space.',
    offer: '10% off on all painting services!'
  },
  { 
    id: '8', 
    name: 'Moving Services', 
    description: 'Help with moving, packing, and transporting your items.', 
    price: '$1000', 
    icon: movingIcon,
    extendedDescription: 'Our moving team is experienced in handling all types of moves, whether it’s local or long-distance. We offer packing, transportation, and unloading services to make your move stress-free.',
    offer: '20% off on moving services for first-time customers!'
  },
  { 
    id: '9', 
    name: 'Gardening', 
    description: 'Landscaping, plant care, and garden maintenance.', 
    price: '$80', 
    icon: gardeningIcon,
    extendedDescription: 'Our gardening services include everything from regular maintenance to landscaping design. Let us take care of your garden with professional plant care and seasonal upkeep.',
  },
  { 
    id: '10', 
    name: 'Roofing', 
    description: 'Roof inspections, repairs, and installations.', 
    price: '$500', 
    icon: roofingIcon,
    extendedDescription: 'We offer comprehensive roofing services, including inspections, repairs, and installations. Whether you need a small repair or a full roof replacement, we’ve got you covered.',
  },
  { 
    id: '11', 
    name: 'Laundry Service', 
    description: 'Wash, dry, and fold services at your doorstep.', 
    price: '$50', 
    icon: laundryIcon,
    extendedDescription: 'Our laundry service includes washing, drying, and folding clothes with pickup and delivery. We use premium detergents for a fresh and clean result.',
  },
  { 
    id: '12', 
    name: 'Child Care', 
    description: 'Professional babysitting and childcare services.', 
    price: '$30', 
    icon: childCareIcon,
    extendedDescription: 'Our child care professionals provide safe, fun, and educational care for your children, whether for a few hours or full-time.',
  },
  { 
    id: '13', 
    name: 'Personal Chef', 
    description: 'Healthy meals prepared by a professional chef for your home.', 
    price: '$300', 
    icon: personalChefIcon,
    extendedDescription: 'Enjoy gourmet meals at home with a personal chef. We specialize in creating healthy, delicious meals tailored to your dietary preferences.',
    offer: 'Free service for 1 Dish'
  },
  { 
    id: '14', 
    name: 'Event Planning', 
    description: 'Wedding, parties, corporate events, and more.', 
    price: '$5000', 
    icon: eventPlanningIcon,
    extendedDescription: 'We handle every aspect of event planning from the venue selection to catering and decorations. Let us help create an unforgettable event experience.',
  },
  { 
    id: '15', 
    name: 'Tutoring', 
    description: 'Private tutoring for subjects like math, science, and more.', 
    price: '$20', 
    icon: tutoringIcon,
    extendedDescription: 'Our tutoring services cover a variety of subjects. Whether you need help with schoolwork or preparing for exams, our experienced tutors will guide you to success.',
  },
  { 
    id: '16', 
    name: 'Tech Support', 
    description: 'Private tutoring for subjects like math, science, and more.', 
    price: '$40', 
    icon: techsupportIcon,
    extendedDescription: 'Our tech support experts are here to help with software, hardware, and other tech issues. We provide fast and reliable support for your tech-related problems.',
    offer: 'Free 30-minute consultation on tech support services!'
  },
];

const ServicesScreen = ({ navigation }) => {
  const { cart, setCart } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');  // For search query
  const [filteredServices, setFilteredServices] = useState(services);  // Filtered services based on search

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredServices(services);  // Show all services if search query is empty
    } else {
      setFilteredServices(
        services.filter((service) =>
          service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  const handleAddToCart = (service) => {
    setCart([...cart, service]);
    Alert.alert('Added to Cart', `${service.name} added.`);
    setModalVisible(false);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service);
    setModalVisible(true);
  };

  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceItem}>
      <Image source={item.icon} style={styles.serviceIcon} />
      <View style={styles.textContent}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.servicePrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => handleServiceClick(item)}>
          <Text style={styles.addButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Our Services</Text>

      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for services..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* FlatList to render services based on the filtered list */}
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
      />

      <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.cartButtonText}>Go to Cart</Text>
      </TouchableOpacity>

      {/* Modal to display service details */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {selectedService && (
            <>
              <Text style={styles.modalTitle}>{selectedService.name}</Text>
              <Image source={selectedService.icon} style={styles.modalIcon} />
              <Text style={styles.modalDescription}>{selectedService.extendedDescription}</Text>
              <Text style={styles.modalPrice}>{selectedService.price}</Text>
              {selectedService.offer && (
                <Text style={styles.modalOffer}>Special Offer: {selectedService.offer}</Text>
              )}
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToCart(selectedService)}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#f8f8f8' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  
  // Search input
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },

  // Grid container
  gridContainer: {
    justifyContent: 'space-between', // This ensures the items are evenly spaced
  },

  serviceItem: { 
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
  },
  serviceIcon: { 
    width: '100%', 
    height: 100, 
    marginBottom: 10 
  },
  textContent: { 
    flex: 1 
  },
  serviceName: { 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  servicePrice: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#79ab68' 
  },
  addButton: { 
    backgroundColor: '#79ab68', 
    padding: 10, 
    marginTop: 10, 
    borderRadius: 5 
  },
  addButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  cartButton: { 
    marginTop: 20, 
    backgroundColor: '#79ab68', 
    padding: 15, 
    borderRadius: 5, 
    alignItems: 'center' 
  },
  cartButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' 
  },

  // Modal styles
  modalContainer: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  modalTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 10 
  },
  modalIcon: { 
    width: '100%', 
    height: 200, 
    marginBottom: 20 
  },
  modalDescription: { 
    fontSize: 16, 
    marginBottom: 20 
  },
  modalPrice: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  modalOffer: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#ff6347', 
    marginBottom: 20 
  },
  closeButton: { 
    backgroundColor: '#ccc', 
    padding: 10, 
    marginTop: 10, 
    borderRadius: 5 
  },
  closeButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
});

export default ServicesScreen;
