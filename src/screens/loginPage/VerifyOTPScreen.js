import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';

export default function VerifyOTPScreen({ route, navigation }) {
  const { primary, text } = useThemeColor();
  const { phoneNumber } = route.params;
  const [otp, setOtp] = useState('');

  const handleVerifyOTP = () => {
    if (otp) {
      Alert.alert('Success', 'You have successfully logged in!');
      navigation.navigate('ProfileScreen'); 
    } else {
      Alert.alert('Error', 'Please enter a valid OTP.');
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
    backgroundColor: primary,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
