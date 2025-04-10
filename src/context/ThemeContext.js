import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();
const THEME_KEY = '@app_theme';

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState('system'); // 'light', 'dark', or 'system'
  const [isLoading, setIsLoading] = useState(true);

  // Load theme preference from AsyncStorage on app start
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_KEY);
        if (storedTheme) {
          setTheme(storedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme preference:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTheme();
  }, []);

  // Get the actual theme based on the preference and system setting
  const getActiveTheme = () => {
    if (theme === 'system') {
      return systemColorScheme || 'light';
    }
    return theme;
  };

  const isDark = getActiveTheme() === 'dark';

  // Update theme preference
  const updateTheme = async (newTheme) => {
    if (!['light', 'dark', 'system'].includes(newTheme)) {
      console.error('Invalid theme value:', newTheme);
      return false;
    }
    
    try {
      // Update state
      setTheme(newTheme);
      
      // Save to AsyncStorage
      await AsyncStorage.setItem(THEME_KEY, newTheme);
      
      return true;
    } catch (error) {
      console.error('Failed to update theme preference:', error);
      return false;
    }
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      updateTheme, 
      getActiveTheme,
      isLoading,
      isDark
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 