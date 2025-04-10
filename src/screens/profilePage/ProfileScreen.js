import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useUser } from '../../context/UserContext';
import { useCurrencyFormat } from '../../hooks/useCurrencyFormat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = ({ navigation }) => {
  const colors = useThemeColor();
  const { userProfile, isLoading: userLoading } = useUser();
  const { formatAmount, isLoading: currencyLoading } = useCurrencyFormat();

  const handleMenuPress = (screen) => {
    navigation.navigate(screen);
  };

  if (userLoading || currencyLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading profile...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Image
          source={{ uri: userProfile.avatar }}
          style={styles.avatar}
        />
        <Text style={[styles.name, { color: colors.text }]}>{userProfile.name}</Text>
        <Text style={[styles.email, { color: colors.text + 'B3' }]}>{userProfile.email}</Text>
        {userProfile.location && (
          <Text style={[styles.location, { color: colors.text + 'B3' }]}>
            {userProfile.location}
          </Text>
        )}
        {userProfile.bio && (
          <Text style={[styles.bio, { color: colors.text + 'B3' }]}>
            {userProfile.bio}
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Settings</Text>
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.card }]}
          onPress={() => handleMenuPress('EditProfile')}
        >
          <MaterialCommunityIcons name="account-edit" size={24} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Edit Profile</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text + 'B3'} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Preferences</Text>
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.card }]}
          onPress={() => handleMenuPress('ThemeSettings')}
        >
          <MaterialCommunityIcons name="theme-light-dark" size={24} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Theme</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text + 'B3'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.card }]}
          onPress={() => handleMenuPress('CurrencySettings')}
        >
          <MaterialCommunityIcons name="currency-usd" size={24} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Currency</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text + 'B3'} />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Security</Text>
        <TouchableOpacity
          style={[styles.menuItem, { backgroundColor: colors.card }]}
          onPress={() => handleMenuPress('ChangePassword')}
        >
          <MaterialCommunityIcons name="lock" size={24} color={colors.primary} />
          <Text style={[styles.menuText, { color: colors.text }]}>Change Password</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={colors.text + 'B3'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    marginBottom: 4,
  },
  bio: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ProfileScreen;