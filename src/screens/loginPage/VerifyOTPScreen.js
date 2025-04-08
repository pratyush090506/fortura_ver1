import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { getConfirmation } from '../../auth/confirmationStore';

export default function VerifyOTPScreen({ route, navigation }) {
  const { phoneNumber } = route.params;
  const confirmation = getConfirmation(); // ✅ retrieve it
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = async () => {
    if (otp.length < 6) {
      Alert.alert('Error', 'Please enter a valid OTP.');
      return;
    }

    try {
      await confirmation.confirm(otp);
      Alert.alert('Success', 'You have successfully logged in!');
      navigation.replace('Main');
    } catch (error) {
      Alert.alert('Error', 'Invalid OTP. Please try again.');
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify OTP</Text>
      <Text style={styles.subtitle}>An OTP has been sent to {phoneNumber}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        keyboardType="number-pad"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
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
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
