import React, { useContext, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CartContext } from '../CartContext';  // Import the context
import { useNavigation } from '@react-navigation/native';  // Import useNavigation

const CartScreen = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigation = useNavigation();  // Get the navigation object

  // Dynamically update the cart item count in the tab icon
  useEffect(() => {
    navigation.setOptions({
      tabBarBadge: cart.length > 0 ? cart.length : null,  // Show the cart count or remove the badge if empty
    });
  }, [cart]);  // Re-run whenever the cart changes

  // Calculate total price of all services in the cart
  const calculateTotal = () => {
    let total = 0;

    // Loop through the cart and add up all valid prices
    cart.forEach(item => {
      let itemPrice = item.price;

      // Check if price is a string with currency symbol (₹ or $)
      if (typeof itemPrice === 'string') {
        // Remove any non-numeric characters (e.g., ₹, $, etc.)
        itemPrice = itemPrice.replace(/[^0-9.-]+/g, ''); // Regex to remove non-numeric characters
        itemPrice = parseFloat(itemPrice);  // Convert to number
      } else if (typeof itemPrice === 'number') {
        // If it's already a number, no need to parse
        itemPrice = itemPrice;
      }

      // Check if itemPrice is valid and a number
      if (!isNaN(itemPrice)) {
        total += itemPrice;
      } else {
        console.log('Invalid price value:', item.price); // Debugging log
      }
    });

    // Return the total formatted to 2 decimal places
    return total.toFixed(2);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);  // Update the cart context
    Alert.alert('Removed', 'Item removed from cart.');
  };

  const handleBookNow = () => {
    if (cart.length === 0) {
      Alert.alert('Cart Empty', 'Please add items to the cart before proceeding.');
    } else {
      navigation.navigate('BookingDetails');  // Navigate to BookingDetailsScreen
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {/* Display the number of items in the cart */}
      <Text style={styles.itemCountText}>Items in Cart: {cart.length}</Text>

      {/* Cart Items */}
      <FlatList
        data={cart}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.cartItem}>
            <Text style={styles.itemText}>{item.name} - ₹{item.price}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => handleRemoveFromCart(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Display the total price of all services */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Price: ₹{calculateTotal()}</Text>
      </View>

      {/* Button to navigate to booking details */}
      <TouchableOpacity style={styles.bookNowButton} onPress={handleBookNow}>
        <Text style={styles.bookNowButtonText}>Book Now</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles for the CartScreen
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
  itemCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',  // Centered text for item count
  },
  cartItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10, 
    marginVertical: 5, 
    backgroundColor: '#f8f8f8', 
    borderRadius: 5,
    elevation: 2,  // Add shadow for Android
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: { 
    fontSize: 18, 
    color: '#333' },
  removeButton: { 
    backgroundColor: 'red', 
    padding: 8, 
    borderRadius: 5 
  },
  removeButtonText: { 
    color: '#fff', 
    fontWeight: 'bold' 
  },
  totalContainer: { 
    marginTop: 20, 
    padding: 10, 
    backgroundColor: '#e6f7ff', 
    borderRadius: 5,
    elevation: 2,
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  totalText: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: '#333',
    textAlign: 'center', // Centered total price
  },
  bookNowButton: { 
    backgroundColor: '#79ab68', 
    padding: 15, 
    borderRadius: 5, 
    marginTop: 20, 
    alignItems: 'center',
    elevation: 3, // For button shadow
  },
  bookNowButtonText: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#fff' 
  },
});

export default CartScreen;
