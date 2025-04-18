import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
  });
  const [profilePic, setProfilePic] = useState(null);

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Media access is required to change profile picture.');
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const name = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      const mobile = await AsyncStorage.getItem('userMobile');
      const pic = await AsyncStorage.getItem('userProfilePic');
      setUserData({ name, email, mobile });
      if (pic) setProfilePic(pic);
    };

    requestPermission();
    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          onPress: async () => {
            await AsyncStorage.clear();
            navigation.replace('Login');
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleChangeProfilePic = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setProfilePic(uri);
      await AsyncStorage.setItem('userProfilePic', uri);
    }
  };

  // Placeholder function for "Coming Soon"
  const handleComingSoon = () => {
    Alert.alert('Coming Soon', 'This feature will be available soon!');
  };

  return (
    <LinearGradient colors={['#eef2f3', '#d6e0f0']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.header}>My Profile</Text>

        {/* Profile Pic */}
        <View style={styles.profilePicContainer}>
          <Image
            source={
              profilePic
                ? { uri: profilePic }
                : require('../assets/profile.png')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={handleChangeProfilePic}
          >
            <Ionicons name="camera" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Info Section */}
        <View style={styles.infoCard}>
          <Ionicons name="person" size={24} color="#79ab68" />
          <Text style={styles.infoTextName}>{userData.name || 'Your Name'}</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="mail" size={24} color="#79ab68" />
          <Text style={styles.infoText}>{userData.email || 'Email'}</Text>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="call" size={24} color="#79ab68" />
          <Text style={styles.infoText}>{userData.mobile || 'Mobile Number'}</Text>
        </View>

        {/* Buttons */}
        <TouchableOpacity style={styles.button} onPress={handleComingSoon}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleComingSoon}>
          <Text style={styles.buttonText}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: '#ddd',
    borderWidth: 3,
    borderColor: '#79ab68',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#79ab68',
    borderRadius: 20,
    padding: 6,
    elevation: 5,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  infoTextName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
    flex: 1,
  },
  infoText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#555',
    flex: 1,
  },
  button: {
    backgroundColor: '#79ab68',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#f39c12',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: 'center',
    elevation: 3,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
