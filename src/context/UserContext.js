import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext';

const UserContext = createContext();
const USER_PROFILE_KEY = '@user_profile';
const USER_PREFERENCES_KEY = '@user_preferences';

export const UserProvider = ({ children }) => {
  // User profile data
  const [userProfile, setUserProfile] = useState({
    name: 'test',
    email: 'test@fortura.com',
    phone: '',
    bio: '',
    location: '',
    avatar: 'https://static.vecteezy.com/system/resources/thumbnails/029/364/950/small_2x/3d-carton-of-boy-going-to-school-ai-photo.jpg',
  });
  
  // User preferences
  const [userPreferences, setUserPreferences] = useState({
    currency: 'INR',
    language: 'English',
    notifications: true,
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const { updateTheme } = useTheme();

  // Load user data from AsyncStorage on app start
  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Load profile data
        const storedProfile = await AsyncStorage.getItem(USER_PROFILE_KEY);
        if (storedProfile) {
          setUserProfile(JSON.parse(storedProfile));
        }
        
        // Load preferences data
        const storedPreferences = await AsyncStorage.getItem(USER_PREFERENCES_KEY);
        if (storedPreferences) {
          const preferences = JSON.parse(storedPreferences);
          setUserPreferences(preferences);
          
          // Update theme if it exists in preferences
          if (preferences.theme) {
            await updateTheme(preferences.theme);
          }
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [updateTheme]);

  // Update user profile
  const updateUserProfile = async (newProfile) => {
    try {
      const updatedProfile = {
        ...userProfile,
        ...newProfile
      };
      
      // Update state
      setUserProfile(updatedProfile);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(updatedProfile));
      
      return true;
    } catch (error) {
      console.error('Failed to update user profile:', error);
      return false;
    }
  };
  
  // Update user preferences
  const updateUserPreferences = async (newPreferences) => {
    try {
      const updatedPreferences = {
        ...userPreferences,
        ...newPreferences
      };
      
      // Update state
      setUserPreferences(updatedPreferences);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(updatedPreferences));
      
      // Update theme if it changed
      if (newPreferences.theme && newPreferences.theme !== userPreferences.theme) {
        await updateTheme(newPreferences.theme);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to update user preferences:', error);
      return false;
    }
  };

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      updateUserProfile, 
      userPreferences,
      updateUserPreferences,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 