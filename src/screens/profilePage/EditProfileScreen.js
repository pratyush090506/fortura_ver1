import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const EditProfileScreen = ({ navigation, route }) => {
  const { text, background, primary, card } = useThemeColor();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    location: '',
  });

  useEffect(() => {
    // In a real app, you would fetch the user's data here
    // For now, we'll use some mock data
    setFormData({
      name: 'test',
      email: 'test@fortura.com',
      phone: '',
      bio: '',
      location: '',
    });
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert('Validation Error', 'Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call here to update the user's profile
      Alert.alert('Success', 'Your profile has been updated successfully!');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="account" size={24} color={primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: text, borderColor: card }]}
            placeholder="Name"
            placeholderTextColor="#666"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" size={24} color={primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: text, borderColor: card }]}
            placeholder="Email"
            placeholderTextColor="#666"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="phone" size={24} color={primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: text, borderColor: card }]}
            placeholder="Phone Number"
            placeholderTextColor="#666"
            value={formData.phone}
            onChangeText={(value) => handleInputChange('phone', value)}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="map-marker" size={24} color={primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, { color: text, borderColor: card }]}
            placeholder="Location"
            placeholderTextColor="#666"
            value={formData.location}
            onChangeText={(value) => handleInputChange('location', value)}
          />
        </View>

        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="text-box" size={24} color={primary} style={styles.inputIcon} />
          <TextInput
            style={[styles.input, styles.bioInput, { color: text, borderColor: card }]}
            placeholder="Bio"
            placeholderTextColor="#666"
            value={formData.bio}
            onChangeText={(value) => handleInputChange('bio', value)}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: primary }]}
          onPress={handleSave}
          disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  bioInput: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 10,
  },
  saveButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen;
