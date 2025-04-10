import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from './UserContext';

const CurrencyContext = createContext();
const CURRENCY_RATES_KEY = '@currency_rates';
const CURRENCY_UPDATE_INTERVAL = 1000 * 60 * 60; // 1 hour

export const CurrencyProvider = ({ children }) => {
  const { userPreferences, updateUserPreferences } = useUser();
  const [rates, setRates] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [currentCurrency, setCurrentCurrency] = useState(userPreferences?.currency || 'INR');

  // Fetch exchange rates from an API
  const fetchExchangeRates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/INR');
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      const data = await response.json();
      
      if (data.rates) {
        setRates(data.rates);
        setLastUpdated(new Date());
        await AsyncStorage.setItem(CURRENCY_RATES_KEY, JSON.stringify({
          rates: data.rates,
          timestamp: new Date().toISOString()
        }));
      } else {
        throw new Error('Invalid exchange rate data');
      }
    } catch (error) {
      console.error('Failed to fetch exchange rates:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved rates from AsyncStorage
  const loadSavedRates = async () => {
    try {
      setIsLoading(true);
      const savedData = await AsyncStorage.getItem(CURRENCY_RATES_KEY);
      if (savedData) {
        const { rates: savedRates, timestamp } = JSON.parse(savedData);
        const lastUpdate = new Date(timestamp);
        const now = new Date();
        
        // Check if rates are older than 1 hour
        if (now - lastUpdate < CURRENCY_UPDATE_INTERVAL) {
          setRates(savedRates);
          setLastUpdated(lastUpdate);
        } else {
          await fetchExchangeRates();
        }
      } else {
        await fetchExchangeRates();
      }
    } catch (error) {
      console.error('Failed to load saved rates:', error);
      await fetchExchangeRates();
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize rates and currency on mount
  useEffect(() => {
    loadSavedRates();
    if (userPreferences?.currency) {
      setCurrentCurrency(userPreferences.currency);
    }
  }, [userPreferences?.currency]);

  // Convert amount from one currency to another
  const convertCurrency = (amount, fromCurrency = 'INR', toCurrency = currentCurrency) => {
    if (!rates[fromCurrency] || !rates[toCurrency]) return amount;
    
    // Convert to base currency (INR) first, then to target currency
    const amountInBase = amount / rates[fromCurrency];
    const convertedAmount = amountInBase * rates[toCurrency];
    
    return Number(convertedAmount.toFixed(2));
  };

  // Format amount with currency symbol
  const formatCurrency = (amount, currency = currentCurrency) => {
    try {
      const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
      
      return formatter.format(amount);
    } catch (error) {
      console.error('Currency formatting error:', error);
      return `${currency} ${amount.toFixed(2)}`;
    }
  };

  // Update user's preferred currency
  const updateCurrency = async (newCurrency) => {
    try {
      setCurrentCurrency(newCurrency);
      await updateUserPreferences({ currency: newCurrency });
      return true;
    } catch (error) {
      console.error('Failed to update currency:', error);
      return false;
    }
  };

  return (
    <CurrencyContext.Provider value={{
      rates,
      isLoading,
      lastUpdated,
      convertCurrency,
      formatCurrency,
      updateCurrency,
      currentCurrency,
      refreshRates: fetchExchangeRates
    }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}; 