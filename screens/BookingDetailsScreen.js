import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';  // Import the DateTimePicker

const BookingDetailsScreen = ({ navigation }) => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [bookingDate, setBookingDate] = useState(new Date());
  const [bookingTime, setBookingTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Handle Date Picker change
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || bookingDate;
    setShowDatePicker(Platform.OS === 'ios' ? true : false);
    setBookingDate(currentDate);
  };

  // Handle Time Picker change
  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || bookingTime;
    setShowTimePicker(Platform.OS === 'ios' ? true : false);
    setBookingTime(currentTime);
  };

  // Validate form fields and proceed to payment gateway
  const handlePaymentConfirm = () => {
    if (!customerName || !mobileNumber || !email || !address || !bookingDate || !bookingTime) {
      Alert.alert('Missing Information', 'Please fill all fields.');
    } else {
      // Navigate to the payment gateway screen
      navigation.navigate('PaymentGateway', {
        customerName,
        mobileNumber,
        email,
        address,
        bookingDate,
        bookingTime,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Booking Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Customer Name"
        value={customerName}
        onChangeText={setCustomerName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Date Picker */}
      <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateText}>{bookingDate.toLocaleDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={bookingDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Time Picker */}
      <TouchableOpacity style={styles.input} onPress={() => setShowTimePicker(true)}>
        <Text style={styles.dateText}>{bookingTime.toLocaleTimeString()}</Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={bookingTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}

      <TouchableOpacity style={styles.paymentButton} onPress={handlePaymentConfirm}>
        <Text style={styles.paymentButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#fff' 
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginVertical: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#555',
    paddingTop: 14,
  },
  paymentButton: {
    backgroundColor: '#79ab68',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  paymentButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
});

export default BookingDetailsScreen; 