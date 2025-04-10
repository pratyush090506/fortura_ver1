import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { useThemeColor } from '../../hooks/useThemeColor';
import { useCurrency } from '../../context/CurrencyContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const COMMON_CURRENCIES = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
];

const CurrencySettings = ({ navigation }) => {
  const colors = useThemeColor();
  const { currentCurrency, updateCurrency, isLoading, lastUpdated, refreshRates } = useCurrency();
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshRates();
    } catch (error) {
      Alert.alert('Error', 'Failed to refresh exchange rates');
    } finally {
      setRefreshing(false);
    }
  };

  const handleCurrencyChange = async (newCurrency) => {
    if (currentCurrency === newCurrency) return;
    
    setSaving(true);
    try {
      const success = await updateCurrency(newCurrency);
      if (!success) {
        Alert.alert('Error', 'Failed to update currency. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error('Currency update error:', error);
    } finally {
      setSaving(false);
    }
  };

  const renderCurrencyItem = ({ item }) => {
    const isSelected = currentCurrency === item.code;
    
    return (
      <TouchableOpacity
        style={[
          styles.currencyItem,
          {
            backgroundColor: colors.card,
            borderColor: isSelected ? colors.primary : colors.border,
          },
        ]}
        onPress={() => handleCurrencyChange(item.code)}
        disabled={saving || isLoading}
      >
        <View style={styles.currencyInfo}>
          <Text style={[styles.currencySymbol, { color: colors.text }]}>
            {item.symbol}
          </Text>
          <View style={styles.currencyDetails}>
            <Text style={[styles.currencyCode, { color: colors.text }]}>
              {item.code}
            </Text>
            <Text style={[styles.currencyName, { color: colors.text + 'B3' }]}>
              {item.name}
            </Text>
          </View>
        </View>
        {isSelected && (
          <MaterialCommunityIcons
            name="check-circle"
            size={24}
            color={colors.primary}
          />
        )}
      </TouchableOpacity>
    );
  };

  if (isLoading && !refreshing) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.text }]}>
          Loading currency settings...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Currency Settings</Text>
        <Text style={[styles.subtitle, { color: colors.text + 'B3' }]}>
          Select your preferred currency
        </Text>
        {lastUpdated && (
          <Text style={[styles.lastUpdated, { color: colors.text + 'B3' }]}>
            Last updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
      </View>

      <FlatList
        data={COMMON_CURRENCIES}
        renderItem={renderCurrencyItem}
        keyExtractor={(item) => item.code}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[colors.primary]}
          />
        }
      />

      {saving && (
        <View style={styles.savingContainer}>
          <ActivityIndicator size="small" color={colors.primary} />
          <Text style={[styles.savingText, { color: colors.text }]}>
            Updating currency...
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  lastUpdated: {
    fontSize: 12,
    marginTop: 4,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
  },
  currencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 16,
  },
  currencyDetails: {
    flex: 1,
  },
  currencyCode: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  currencyName: {
    fontSize: 14,
  },
  savingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  savingText: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default CurrencySettings; 