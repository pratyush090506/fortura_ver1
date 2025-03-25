import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = () => {
    if (!name || !email) {
      Alert.alert('Validation Error', 'Please fill in both name and email fields.');
      return;
    }

    Alert.alert('Profile Updated', 'Your profile has been updated successfully!');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 20, paddingLeft: 10 },
});

export default EditProfileScreen;
