import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OverviewScreen from '../screens/overviewPage/OverviewScreen';
import PayScreen from '../screens/pay/PayScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginScreen from '../screens/loginPage/LoginScreen'; 
import BudgetScreen from '../screens/budgetPage/BudgetScreen';
import InsightsScreen from '../screens/insightsPage/InsightsScreen';
import ProfileScreen from '../screens/profilePage/ProfileScreen';
import { useThemeColor } from '../hooks/useThemeColor';

const Stack = createStackNavigator();

<Stack.Navigator>
  <Stack.Screen name="Overview" component={OverviewScreen} />
  <Stack.Screen name="Pay" component={PayScreen} />
</Stack.Navigator>

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const { primary } = useThemeColor();

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

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
