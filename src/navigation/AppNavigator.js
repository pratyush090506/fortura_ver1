import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OverviewScreen from '../screens/overviewPage/OverviewScreen';
import PayScreen from '../screens/pay/PayScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from '../screens/loginPage/LoginScreen'; 
import VerifyOTPScreen from '../screens/loginPage/VerifyOTPScreen';
import BudgetScreen from '../screens/budgetPage/BudgetScreen';
import InsightsScreen from '../screens/insightsPage/InsightsScreen';
import ProfileScreen from '../screens/profilePage/ProfileScreen';
import EditProfileScreen from '../screens/profilePage/EditProfileScreen';
import ThemeSettings from '../screens/profilePage/ThemeSettingsScreen';
import CurrencySettings from '../screens/profilePage/CurrencySettingsScreen';
import { useThemeColor } from '../hooks/useThemeColor';
import { useTheme } from '../context/ThemeContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { primary, background, text } = useThemeColor();

  return (
    <Tab.Navigator initialRouteName="Overview"
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        headerShown: false,
      }}>
      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="wallet" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pay"
        component={PayScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-line" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = () => {
  const { primary } = useThemeColor();
  const { isDark } = useTheme();

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen} 
          options={{ 
            title: 'Edit Profile',
          }} 
        />
        <Stack.Screen 
          name="ThemeSettings" 
          component={ThemeSettings} 
          options={{ 
            title: 'Theme Settings',
          }} 
        />
        <Stack.Screen 
          name="CurrencySettings" 
          component={CurrencySettings}
          options={{
            title: 'Currency Settings',
            headerStyle: {
              backgroundColor: primary,
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;