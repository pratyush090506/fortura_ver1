import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useThemeColor } from "../../hooks/useThemeColor";
import { Card } from "../../components/Card";

export default function EditProfileScreen() {
  const { primary } = useThemeColor();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('Please set your E-mail');

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedPhone = await AsyncStorage.getItem('phone');
        const storedEmail = await AsyncStorage.getItem('email');

        if (storedName) setName(storedName);
        if (storedPhone) setPhone(storedPhone);
        if (storedEmail) setEmail(storedEmail);
      } catch (error) {
        console.log('Error retrieving user data from AsyncStorage', error);
      }
    };

    getUserData();
  }, []);

  const handleNameBlur = async () => {
    setIsEditingName(false);
    await AsyncStorage.setItem('name', name);
  };

  const handleEmailBlur = async () => {
    setIsEditingEmail(false);
    await AsyncStorage.setItem('email', email);
  };

  return (
    <View style={{ marginTop: 40 }}>
      <Card style={{margin:20}}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="cellphone" size={24} />
          <Text style={styles.text}>+91{phone}</Text>
          <View style={{ flex: 1 }} />
          <MaterialCommunityIcons name="check-circle-outline" size={20} color={primary} />
        </View>
      </Card>

      <Card style={{margin:20}}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="card-account-details" size={24} />
          {isEditingName ? (
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              autoFocus
              onBlur={handleNameBlur}
              placeholder="Enter your name"
            />
          ) : (
            <Text style={styles.text}>{name}</Text>
          )}
          <View style={{ flex: 1 }} />
          {!isEditingName && (
            <MaterialCommunityIcons name="rename-box" size={24} color={primary} onPress={() => setIsEditingName(true)} />
          )}
        </View>
      </Card>

      <Card style={{margin:20}}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="email" size={24} />
          {isEditingEmail ? (
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoFocus
              onBlur={handleEmailBlur}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          ) : (
            <Text style={[styles.text, { color: 'grey' }]}>{email}</Text>
          )}
          <View style={{ flex: 1 }} />
          {!isEditingEmail && (
            <MaterialCommunityIcons name="rename-box" size={24} color={primary} onPress={() => setIsEditingEmail(true)} />
          )}
        </View>
      </Card>

      <Card style={{margin:20}}>
        <View style={styles.row}>
          <MaterialCommunityIcons name="gender-male-female" size={24} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    marginLeft: 20,
    fontSize: 16,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
});
