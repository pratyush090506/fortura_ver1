import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: '', phone: '' });

  useEffect(() => {
    const loadUser = async () => {
      const storedName = await AsyncStorage.getItem('name');
      const storedPhone = await AsyncStorage.getItem('phone');
      if (storedName && storedPhone) {
        setUser({ name: storedName, phone: storedPhone });
      }
    };
    loadUser();
  }, []);

  const updateUser = async (updatedUser) => {
    setUser(updatedUser);
    await AsyncStorage.setItem('name', updatedUser.name);
    await AsyncStorage.setItem('phone', updatedUser.phone);
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
