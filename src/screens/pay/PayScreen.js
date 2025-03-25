import React from 'react';
import { StyleSheet, View, Text, Button, Alert, Linking } from 'react-native';

const PayScreen = () => {
  const handlePayPress = () => {
    const upiUrl = 'upi://pay?pa=example@upi&pn=Example%20Name&mc=1234&tid=1234567890&am=1.00&cu=INR&url=https://example.com';

    Linking.openURL(upiUrl).catch(err => {
      Alert.alert('Error', 'Unable to open UPI apps. Please ensure you have UPI apps installed.');
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pay Screen</Text>
      <Button title="Pay with UPI" onPress={handlePayPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default PayScreen;
