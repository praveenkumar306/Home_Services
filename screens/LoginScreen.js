import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Linking, Modal, ActivityIndicator, Animated } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation values
  const titleFadeAnim = new Animated.Value(0);  // Fade in animation for title
  const inputSlideAnim = new Animated.Value(30); // Slide-in animation for inputs
  const buttonScaleAnim = new Animated.Value(1); // Scale animation for buttons

  // Function to handle login by validating against AsyncStorage data
  const handleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    setLoading(true);

    try {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedPassword = await AsyncStorage.getItem('userPassword');

      if (storedEmail === email && storedPassword === password) {
        Alert.alert('Success', 'Login successful!');
        navigation.navigate('HomeTabs');
      } else {
        Alert.alert('Error', 'Invalid email or password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  // Open the website in the browser
  const openWebsite = async () => {
    try {
      await Linking.openURL('http://www.home--services.in');
    } catch (error) {
      console.error("Couldn't open website", error);
    }
  };

  // Open the Help Center modal
  const openHelpCenter = () => {
    setModalVisible(true);
  };

  // Close the Help Center modal
  const closeHelpCenter = () => {
    setModalVisible(false);
  };

  // Use useEffect to trigger the fade-in and slide-in animations when the component mounts
  useEffect(() => {
    Animated.timing(titleFadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(inputSlideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Scale button animation on press
  const handleButtonPressIn = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPressOut = () => {
    Animated.spring(buttonScaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Fade-in Title */}
      <Animated.Text style={[styles.title, { opacity: titleFadeAnim }]}>
        HOME{'\n'}SERVICES
      </Animated.Text>

      {/* Slide-in Email Input */}
      <Animated.View style={{ transform: [{ translateY: inputSlideAnim }] }}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          accessibilityLabel="Email Input"
        />
      </Animated.View>

      {/* Slide-in Password Input */}
      <Animated.View style={{ transform: [{ translateY: inputSlideAnim }] }}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          accessibilityLabel="Password Input"
        />
      </Animated.View>

      {/* Scale Login Button */}
      <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          onPressIn={handleButtonPressIn}
          onPressOut={handleButtonPressOut}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      {/* Signup Button */}
      <View style={styles.signupContainer}>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.buttonText}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => Alert.alert('Coming Soon', 'Forgot Password feature coming soon!')}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Help Center Button */}
      <View style={styles.helpCenterContainer}>
        <TouchableOpacity style={styles.helpCenterButton} onPress={openHelpCenter}>
          <Text style={styles.buttonText1}>Help Center</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={openWebsite}>
          <Text style={styles.footerText}>www.home-services.in</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Help Center Information */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeHelpCenter}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Help Center</Text>
            <Text style={styles.modalText}>
              If you have any questions or issues, please reach out to our support team at support@home-services.com or call +91-9876543210. We are here to assist you with any problems.
            </Text>

            {/* Close button */}
            <TouchableOpacity onPress={closeHelpCenter} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
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
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 50,
    color: '#79ab68',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 40,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#79ab68',
    paddingVertical: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  signupContainer: {
    marginTop: 20,
  },
  signupButton: {
    alignItems: 'center',
    backgroundColor: '#79ab68',
    paddingVertical: 12,
    borderRadius: 5,
  },
  helpCenterContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  helpCenterButton: {
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText1: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  forgotPasswordText: {
    color: '#79ab68',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:20,
    textDecorationLine: 'underline',
    fontSize: 14,
  },  

  // Footer Styles
  footerContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#79ab68',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
    color: '#79ab68',
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

export default LoginScreen;
