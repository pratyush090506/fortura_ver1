import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ImageBackground,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';

import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth';
import { useThemeColor } from '../../hooks/useThemeColor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const auth = getAuth();

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [confirm, setConfirm] = useState(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const colors = useThemeColor();

  const handleSendOTP = async () => {
    if (!name) {
      Alert.alert('Name Required', 'Please enter your name.');
      return;
    }

    if (phone.length < 10) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit number.');
      return;
    }

    setLoading(true);
    try {
      const fullPhone = phone.startsWith('+91') ? phone : `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(getAuth(), fullPhone);
      setConfirm(confirmation);
    } catch (error) {
      console.log('OTP Error:', error);
      Alert.alert('Error', 'Failed to send OTP. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      await confirm.confirm(code);
      
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('phone', phone);
      
      navigation.replace('Main', { name, phone });
    } catch (error) {
      console.log('❌ Invalid code:', error);
      Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../../assets/payScreenBackground.png')}
        style={styles.bg}
        resizeMode="cover"
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
        >
          <View style={styles.flexGrow} />

          <View style={[styles.sheet, { backgroundColor: colors.card }]}>
            <View style={styles.grabberContainer}>
              <View style={styles.grabber} />
            </View>

            <Text style={[styles.title, { color: colors.text }]}>Login to continue</Text>

            {!confirm ? (
              <>
                {/* Name Input */}
                <Text style={[styles.label, { color: colors.text }]}>Enter Name:</Text>
                <TextInput
                  style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your name"
                  placeholderTextColor={colors.secondary}
                />

                {/* Phone Number Input */}
                <Text style={[styles.label, { color: colors.text }]}>Enter Phone Number:</Text>
                <TextInput
                  style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  placeholder="Enter phone number"
                  placeholderTextColor={colors.secondary}
                />
                
                {/* Send OTP Button */}
                <Pressable
                  style={[styles.button, { backgroundColor: colors.primary }]}
                  onPress={handleSendOTP}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Send OTP</Text>
                  )}
                </Pressable>
              </>
            ) : (
              <>
                {/* OTP Input */}
                <Text style={[styles.label, { color: colors.text }]}>Enter OTP:</Text>
                <TextInput
                  style={[styles.input, { borderColor: colors.border, color: colors.text }]}
                  value={code}
                  onChangeText={setCode}
                  keyboardType="phone-pad"
                  placeholder="123456"
                  placeholderTextColor={colors.secondary}
                />
                
                {/* Verify OTP Button */}
                <Pressable
                  style={[styles.button, { backgroundColor: colors.primary }]}
                  onPress={handleVerifyOTP}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Verify OTP</Text>
                  )}
                </Pressable>
              </>
            )}
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  flexGrow: {
    flexGrow: 1,
  },
  sheet: {
    width: '100%',
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },
  grabberContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  grabber: {
    width: 60,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default LoginScreen;
