import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView, Image, TextInput, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const HelpScreen = () => {
  const [feedback, setFeedback] = useState(''); // State to hold the feedback input
  const [reviews, setReviews] = useState([]);  // State to store the list of reviews
  const [rating, setRating] = useState(0); // State to store the rating (1 to 5 stars)

  // Sample coordinates for the map (Replace with your actual location coordinates)
  const mapRegion = {
    latitude: 17.35046,
    longitude: 78.54785,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // Updated FAQ list with more questions and answers
  const faqList = [
    { 
      question: 'How can I reset my password?', 
      answer: 'To reset your password, go to the "Settings" screen and click "Reset Password".' 
    },
    { 
      question: 'Where can I track my orders?', 
      answer: 'You can track your orders in the "Order History" section of the app.' 
    },
    { 
      question: 'How do I contact customer support?', 
      answer: 'You can reach us through the "Contact Us" page or email us at support@example.com.' 
    },
    { 
      question: 'What payment methods do you accept?', 
      answer: 'We accept credit/debit cards, PayPal, and bank transfers.' 
    },
  ];

  // Function to handle contact email
  const handleEmailSupport = () => {
    const email = 'support@example.com';
    Linking.openURL(`mailto:${email}`);
  };

  // Function to handle calling support
  const handleCallSupport = () => {
    const phoneNumber = '+1234567890';  // Replace with the actual support phone number
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // Example link to video tutorials
  const handleVideoTutorials = () => {
    Linking.openURL('https://www.youtube.com/playlist?list=xyz'); // Replace with actual YouTube playlist link
  };

  // Function to handle submitting feedback (reviews)
  const handleSubmitReview = () => {
    if (feedback.trim() === '') {
      Alert.alert('Error', 'Please enter your feedback before submitting.');
      return;
    }
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating before submitting.');
      return;
    }

    // Add the review with the rating to the reviews state
    setReviews([...reviews, { feedback, rating }]);
    setFeedback(''); // Clear the feedback input field after submission
    setRating(0); // Reset the rating after submission

    Alert.alert('Success', 'Thank you for your feedback!');
  };

  // Function to render star rating
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Image
            source={i <= rating ? require('../assets/star-filled.png') : require('../assets/Star-empty.png')} // Use actual paths for star images
            style={styles.starIcon}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  // Function to render stars for review
  const renderStarsForReview = (reviewRating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Image
          key={i}
          source={i <= reviewRating ? require('../assets/star-filled.png') : require('../assets/Star-empty.png')}
          style={styles.starIcon}
        />
      );
    }
    return stars;
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.info}>
        For any queries, please contact our support team or refer to the FAQs below.
      </Text>

      {/* Support Contact Options */}
      <Text style={styles.sectionTitle}>Contact Support</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleEmailSupport}>
          <Text style={styles.buttonText}>Email Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCallSupport}>
          <Text style={styles.buttonText}>Call Support</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews & Feedback Section */}
      <Text style={styles.sectionTitle}>Reviews & Feedback</Text>
      <Text style={styles.info}>
        We value your feedback! Please share your experience with us below:
      </Text>
      
      <TextInput
        style={styles.feedbackInput}
        placeholder="Enter your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
        multiline
      />

      {/* Star Rating Section */}
      <Text style={styles.info}>Select Rating (1-5 Stars):</Text>
      <View style={styles.starContainer}>
        {renderStars()}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmitReview}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>

      {/* Displaying Submitted Reviews */}
      <Text style={styles.sectionTitle}>Submitted Reviews</Text>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <Text style={styles.reviewText}>{review.feedback}</Text>

            {/* Render stars for the review */}
            <View style={styles.starContainer}>
              {renderStarsForReview(review.rating)}
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noReviewsText}>No reviews submitted yet.</Text>
      )}

      {/* FAQ Section */}
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      {faqList.map((faq, index) => (
        <View key={index} style={styles.faqContainer}>
          <Text style={styles.faqQuestion}>{faq.question}</Text>
          <Text style={styles.faqAnswer}>{faq.answer}</Text>
        </View>
      ))}

      {/* Map Section */}
      <Text style={styles.sectionTitle}>Find Us On The Map</Text>
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
        >
          {/* Marker for a location */}
          <Marker coordinate={{ latitude: 17.35074, longitude: 78.54781 }} title="Support Office" description="Visit our office" />
        </MapView>
      </View>

      {/* Video Tutorials Section */}
      <Text style={styles.sectionTitle}>Video Tutorials</Text>
      <Text style={styles.info}>
        Watch our video tutorials to better understand how to use our app and resolve common issues.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleVideoTutorials}>
        <Text style={styles.buttonText}>Watch Tutorials</Text>
      </TouchableOpacity>

      {/* Troubleshooting Tips */}
      <Text style={styles.sectionTitle}>Troubleshooting Tips</Text>
      <View style={styles.troubleshootingContainer}>
        <Text style={styles.troubleshootingText}>- Ensure you have the latest version of the app installed.</Text>
        <Text style={styles.troubleshootingText}>- Clear your app's cache if it's behaving strangely.</Text>
        <Text style={styles.troubleshootingText}>- Restart the app to resolve minor glitches.</Text>
      </View>

      {/* Social Media Support */}
      <Text style={styles.sectionTitle}>Social Media Support</Text>
      <Text style={styles.info}>
        Follow us on social media or DM us for faster support:
      </Text>
      <View style={styles.socialMediaContainer}>
        <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
          <Image source={require('../assets/facebook.png')} style={styles.socialMediaIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
          <Image source={require('../assets/twitter.png')} style={styles.socialMediaIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
          <Image source={require('../assets/instagram.jpg')} style={styles.socialMediaIcon} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#79ab68',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  feedbackInput:{
    borderWidth:1,
    borderColor:'lightgrey',
    borderRadius:5,
    marginBottom:5,
  },
  mapContainer: {
    height: 250,
    marginBottom: 20,

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 5,
  },
  starIcon: {
    width: 17,
    height: 17,
    marginHorizontal: 10,
  },
  reviewContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 18,
    marginLeft: 5,
    color: 'gray',
    textAlign: 'center',
  },
  noReviewsText: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  faqContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 5,
  },
  faqQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  troubleshootingContainer: {
    marginVertical: 15,
  },
  troubleshootingText: {
    fontSize: 16,
    color: 'gray',
  },
  socialMediaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom:30,
  },
  socialMediaIcon: {
    width: 40,
    height: 40,
    margin: 10,
    borderRadius:40,
  },
});

export default HelpScreen;
