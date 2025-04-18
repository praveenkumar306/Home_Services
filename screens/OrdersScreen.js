import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { CartContext } from '../CartContext';
import { Ionicons } from '@expo/vector-icons'; // For eye icon

const OrdersScreen = () => {
  const { orders } = useContext(CartContext); // Getting orders from context
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Order Date: {item.orderDate}</Text>
      <Text style={styles.orderText}>Payment Method: {item.paymentMethod}</Text>
      <Text style={styles.orderText}>Total: ₹{item.totalAmount}</Text>

      {/* View Details Button with Eye Icon */}
      <TouchableOpacity
        style={styles.viewDetailsButton}
        onPress={() => handleViewDetails(item)}
      >
        <Ionicons name="eye" size={20} color="white" /> {/* Eye Icon */}
        <Text style={styles.viewDetailsText}> View Details</Text>
      </TouchableOpacity>
    </View>
  );

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);  // Show the modal with order details
  };

  const renderOrderServices = (services) => {
    if (services && services.length > 0) {
      return (
        <View style={styles.servicesContainer}>
          <Text style={styles.servicesHeader}>Booked Services:</Text>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceItem}>
              <Ionicons name="checkmark-circle" size={18} color="#79ab68" /> {/* Green checkmark icon */}
              <Text style={styles.serviceText}>
                {service.name} - ₹{service.price}
              </Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <Text style={styles.serviceText}>No services booked.</Text>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Bookings</Text>
      {orders.length === 0 ? (
        <Text>No orders yet</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderOrderItem}
        />
      )}

      {/* Modal to view order details */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Order Details</Text>

            {/* Render services */}
            {selectedOrder ? (
              renderOrderServices(selectedOrder.services)
            ) : (
              <Text>No order details available</Text>
            )}

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  orderItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  orderText: {
    fontSize: 16,
    color: '#333',
  },
  viewDetailsButton: {
    backgroundColor: '#79ab68',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  servicesContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  servicesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  closeModalButton: {
    backgroundColor: '#79ab68',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  closeModalText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default OrdersScreen;
