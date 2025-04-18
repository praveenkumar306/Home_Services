import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Animated, Modal } from 'react-native';
import { CartContext } from '../CartContext';  // Import CartContext

const PaymentGatewayScreen = ({ navigation }) => {
  const { cart, addOrder } = useContext(CartContext);  // Access cart and addOrder function
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);  // Loading state for payment processing
  const [modalVisible, setModalVisible] = useState(false);  // Modal visibility state
  const progressAnim = useState(new Animated.Value(0))[0];  // Progress bar animation value

  // Handle payment success and save order
  const handlePaymentSuccess = () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Please add items to the cart before proceeding.');
      return;
    }

    if (!selectedPaymentMethod) {
      Alert.alert('Payment Method Required', 'Please select a payment method before proceeding.');
      return;
    }

    setIsProcessing(true);  // Set loading state to true when payment starts
    setModalVisible(true);   // Show the modal during payment processing

    const order = {
      orderDate: new Date().toLocaleDateString(),
      paymentMethod: selectedPaymentMethod,
      totalAmount: calculateTotal(),
      services: cart,  // Save cart items as services in the order
    };

    // Simulate payment processing delay
    Animated.timing(progressAnim, {
      toValue: 1,  // Move progress bar to 100%
      duration: 2000,  // 2 seconds for the bar to fill
      useNativeDriver: false,  // Use native driver false because we are animating width
    }).start();

    // Simulate a delay of payment processing
    setTimeout(() => {
      addOrder(order);  // Add order to the orders list and clear the cart

      Alert.alert('Payment Successful', `Your payment via ${selectedPaymentMethod} has been processed successfully!`);
      
      setIsProcessing(false);  // Set loading state to false after payment is complete
      setModalVisible(false);  // Close the modal after payment
      navigation.navigate('HomeTabs');  // Navigate to the HomeTabs or any other screen
    }, 2000);  // Simulate a 2-second payment processing delay
  };

  // Calculate total amount from cart
  const calculateTotal = () => {
    let total = 0;
    cart.forEach(item => {
      let itemPrice = item.price;
      if (typeof itemPrice === 'string') {
        itemPrice = itemPrice.replace(/[^0-9.-]+/g, '');  // Remove currency symbols
        itemPrice = parseFloat(itemPrice);
      }
      total += itemPrice;
    });
    return total.toFixed(2);
  };

  const getButtonStyle = (paymentMethod) => {
    return selectedPaymentMethod === paymentMethod ? styles.selectedButton : styles.paymentButton;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      {/* Display total amount */}
      <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>

      {/* Payment Methods */}
      <Text style={styles.paymentMethodTitle}>Select Payment Method:</Text>

      <View style={styles.paymentButtonsContainer}>
        <TouchableOpacity
          style={getButtonStyle('PayPal')}
          onPress={() => setSelectedPaymentMethod('PayPal')}
        >
          <Text style={styles.paymentButtonText}>PayPal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getButtonStyle('Razorpay')}
          onPress={() => setSelectedPaymentMethod('Razorpay')}
        >
          <Text style={styles.paymentButtonText}>Razorpay</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getButtonStyle('Credit Card')}
          onPress={() => setSelectedPaymentMethod('Credit Card')}
        >
          <Text style={styles.paymentButtonText}>Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getButtonStyle('Debit Card')}
          onPress={() => setSelectedPaymentMethod('Debit Card')}
        >
          <Text style={styles.paymentButtonText}>Debit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getButtonStyle('UPI')}
          onPress={() => setSelectedPaymentMethod('UPI')}
        >
          <Text style={styles.paymentButtonText}>UPI</Text>
        </TouchableOpacity>
      </View>

      {/* Confirm Payment Button */}
      <TouchableOpacity style={styles.button} onPress={handlePaymentSuccess} disabled={isProcessing}>
        {isProcessing ? (
          <ActivityIndicator size="large" color="#fff" />  // Show loading spinner while processing
        ) : (
          <Text style={styles.buttonText}>Confirm Payment</Text>
        )}
      </TouchableOpacity>

      {/* Payment Processing Modal */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Processing Payment...</Text>
            <ActivityIndicator size="large" color="#79ab68" />
            <Text style={styles.modalText}>Please wait while we process your payment.</Text>

            {/* Progress Bar */}
            <View style={styles.progressBarBackground}>
              <Animated.View
                style={[styles.progressBarFill, { width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],  // Animate width from 0% to 100%
                }) }]}
              />
            </View>
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
    justifyContent: 'center' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20,
    color: '#333'
  },
  totalText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333', 
    marginVertical: 10 
  },
  paymentMethodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333'
  },
  paymentButtonsContainer: {
    marginVertical: 10
  },
  paymentButton: {
    backgroundColor: '#79ab68',  // Default green color
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#4a90e2',  // Blue color for selected payment option
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  button: { 
    backgroundColor: '#79ab68', 
    paddingVertical: 15, 
    borderRadius: 5, 
    alignItems: 'center', 
    marginTop: 20 
  },
  buttonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
  progressBarBackground: {
    width: '100%',
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginTop: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#79ab68',
    borderRadius: 5,
  },
});

export default PaymentGatewayScreen;
