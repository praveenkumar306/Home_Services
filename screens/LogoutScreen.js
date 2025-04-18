import React from 'react';
import { View, Text, Button, Alert } from 'react-native';

const LogoutScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Show confirmation dialog
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout Cancelled"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            // Navigate to the Login Screen after logout confirmation
            navigation.navigate('Login');
          },
        },
      ]
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Logout Screen</Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default LogoutScreen;
