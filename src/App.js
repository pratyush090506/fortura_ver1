import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.WEBCLIENT_ID,
    });
  }, []);

  return <AppNavigator />;
}
