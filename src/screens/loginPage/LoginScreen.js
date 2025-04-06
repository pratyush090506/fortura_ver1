import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';
import { handleGoogleSignIn } from '../../auth/firebaseAuth';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function LoginScreen({ navigation }) {
  const { primary, text } = useThemeColor();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isMobileLogin, setIsMobileLogin] = useState(true);

  const onMobileLogin = async () => {
    if (phoneNumber.length === 0 || phoneNumber.length < 10) {
      Alert.alert('Error', 'Please enter a valid phone number.');
      return;
    }

    try {
      // Send OTP using signInWithPhoneNumber
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      
      // Pass the confirmation object to the next screen where the OTP will be verified
      Alert.alert('OTP Sent', `An OTP has been sent to ${phoneNumber}.`);
      
      // Navigate to the OTP verification screen and pass the phone number and confirmation object
      navigation.navigate('VerifyOTPScreen', { phoneNumber, confirmation });
    } catch (error) {
      console.error("Error during OTP request:", error);
      Alert.alert('Error', error.message);  // Display error message if OTP request fails
    }
  };

  const onGoogleSignIn = async () => {
    try {
      // Ensure the device has Play Services (for Android) or the correct configuration (for iOS)
      await GoogleSignin.hasPlayServices();

      // Start the Google Sign-In process
      const { idToken } = await GoogleSignin.signIn();

      // Create a Firebase credential with the Google ID token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with the credential from the Google user
      await auth().signInWithCredential(googleCredential);

      Alert.alert('Login Successful', 'You have logged in with Google.');
      navigation.navigate('Profile'); // Navigate to Profile or home screen
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {isMobileLogin ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your mobile number"
            keyboardType="phone-pad"
            maxLength={10}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={[styles.button, { backgroundColor: primary }]} onPress={onMobileLogin}>
            <Text style={[styles.buttonText, { color: text }]}>Request OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#DB4437' }]} onPress={onGoogleSignIn}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Login with Google</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.toggleButton} onPress={() => setIsMobileLogin(!isMobileLogin)}>
        <Text style={styles.toggleText}>
          {isMobileLogin ? 'Login with Google' : 'Login with Mobile Number'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  toggleButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  toggleText: {
    color: '#007AFF',
    fontSize: 16,
  },
});
