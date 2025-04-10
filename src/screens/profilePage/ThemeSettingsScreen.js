import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { useThemeColor } from '../../hooks/useThemeColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ThemeSettings = ({ navigation }) => {
  const { theme, updateTheme, isLoading } = useTheme();
  const [saving, setSaving] = useState(false);
  const colors = useThemeColor();
  
  const handleThemeChange = async (newTheme) => {
    if (theme === newTheme) return;
    
    setSaving(true);
    try {
      const success = await updateTheme(newTheme);
      if (!success) {
        Alert.alert('Error', 'Failed to update theme. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Theme update error:', error);
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>Loading theme settings...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Theme Settings</Text>
        <Text style={[styles.subtitle, { color: colors.text + 'B3' }]}>
          Choose how you want the app to look
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.option,
            { 
              backgroundColor: colors.card,
              borderColor: theme === 'light' ? colors.primary : colors.border,
            }
          ]}
          onPress={() => handleThemeChange('light')}
          disabled={saving}
        >
          <View style={styles.optionContent}>
            <MaterialCommunityIcons 
              name="white-balance-sunny" 
              size={24} 
              color={theme === 'light' ? colors.primary : colors.text} 
            />
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Light</Text>
              <Text style={[styles.optionDescription, { color: colors.text + 'B3' }]}>
                Light theme with white background
              </Text>
            </View>
          </View>
          {theme === 'light' && (
            <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            { 
              backgroundColor: colors.card,
              borderColor: theme === 'dark' ? colors.primary : colors.border,
            }
          ]}
          onPress={() => handleThemeChange('dark')}
          disabled={saving}
        >
          <View style={styles.optionContent}>
            <MaterialCommunityIcons 
              name="moon-waning-crescent" 
              size={24} 
              color={theme === 'dark' ? colors.primary : colors.text} 
            />
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>Dark</Text>
              <Text style={[styles.optionDescription, { color: colors.text + 'B3' }]}>
                Dark theme with black background
              </Text>
            </View>
          </View>
          {theme === 'dark' && (
            <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            { 
              backgroundColor: colors.card,
              borderColor: theme === 'system' ? colors.primary : colors.border,
            }
          ]}
          onPress={() => handleThemeChange('system')}
          disabled={saving}
        >
          <View style={styles.optionContent}>
            <MaterialCommunityIcons 
              name="theme-light-dark" 
              size={24} 
              color={theme === 'system' ? colors.primary : colors.text} 
            />
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, { color: colors.text }]}>System Default</Text>
              <Text style={[styles.optionDescription, { color: colors.text + 'B3' }]}>
                Follow system theme settings
              </Text>
            </View>
          </View>
          {theme === 'system' && (
            <MaterialCommunityIcons name="check-circle" size={24} color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>

      {saving && (
        <View style={styles.savingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={[styles.savingText, { color: colors.text }]}>Updating theme...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
  savingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  savingText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default ThemeSettings; 