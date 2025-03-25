import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BudgetScreen, OverviewScreen } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator(); // Creates a bottom tab navigation instance

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Budget') {
              iconName = 'wallet-outline';
            } else if (route.name === 'Overview') {
              iconName = 'grid-outline';
            }
            else if (route.name === '') {
                
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue', // Active tab color
          tabBarInactiveTintColor: 'gray', // Inactive tab color
        })}
      >
        <Tab.Screen name="Budget" component={BudgetScreen} />
        <Tab.Screen name="Overview" component={OverviewScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
