import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';
import { handleMobileLogin, handleGoogleSignIn } from '../../auth/firebaseAuth';


export default function LoginScreen({ navigation }) {
  const { primary, text } = useThemeColor();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isMobileLogin, setIsMobileLogin] = useState(true);

  const onMobileLogin = async () => {
    const appVerifier = window.recaptchaVerifier; // reCAPTCA set krna parega

    try {
      await handleMobileLogin(phoneNumber, appVerifier);
      Alert.alert('OTP Sent', `An OTP has been sent to ${phoneNumber}.`);
      navigation.navigate('VerifyOTPScreen', { phoneNumber });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const onGoogleSignIn = async () => {
    try {
      await handleGoogleSignIn();
      Alert.alert('Login Successful', 'You have logged in with Google.');
      navigation.navigate('Profile');
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
