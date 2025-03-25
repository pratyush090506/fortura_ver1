import React from 'react';
import { StyleSheet, ScrollView, View, Text } from 'react-native';
import { Card } from '../../components/Card';

const OverviewScreen = () => {
  // Hardcoded values daale hai from BudgetScreen.js
  const totalBudget = 5000.00;
  const spentAmount = 3240.50;
  const remainingAmount = 1759.50;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.cardContainer}>
        <Card>
          <Text style={styles.summaryLabel}>Total Budget</Text>
          <Text style={styles.summaryAmount}>₹{totalBudget.toFixed(2)}</Text>
        </Card>
        <Card>
          <Text style={styles.summaryLabel}>Spent Amount</Text>
          <Text style={styles.summaryAmount}>₹{spentAmount.toFixed(2)}</Text>
        </Card>
        <Card>
          <Text style={styles.summaryLabel}>Remaining Amount</Text>
          <Text style={styles.summaryAmount}>₹{remainingAmount.toFixed(2)}</Text>
        </Card>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  cardContainer: {
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default OverviewScreen;
