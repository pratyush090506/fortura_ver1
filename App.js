import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './src/context/ThemeContext';
import { UserProvider } from './src/context/UserContext';
import { CurrencyProvider } from './src/context/CurrencyContext';
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <UserProvider>
          <CurrencyProvider>
            <AppNavigator />
          </CurrencyProvider>
        </UserProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
