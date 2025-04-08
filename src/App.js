import React, { useEffect } from 'react';
import AppNavigator from './navigation/AppNavigator';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '674823172285-vfgtv5o2j655rsi9c72je48ohrvrkfng.apps.googleusercontent.com'
    });
  }, []);

  return (<AppNavigator />);
}
