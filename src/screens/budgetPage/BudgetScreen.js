import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Card } from '../../components/Card';
import { BarChart } from 'react-native-chart-kit';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const BUDGET_STORAGE_KEY = 'userBudgetData';
const initialBudget = {
  total: '5000.00',
  spent: '3240.50',
  categories: [
    { name: 'Food & Dining', budgeted: '1000.00', spent: '800.00' },
    { name: 'Transportation', budgeted: '500.00', spent: '300.00' },
    { name: 'Entertainment', budgeted: '1500.00', spent: '450.00' },
    { name: 'Utilities', budgeted: '300.00', spent: '250.00' },
    { name: 'Shopping', budgeted: '700.00', spent: '500.00' },
  ],
};
import { useThemeColor } from '../../context/ThemeProvider';
import { useCurrency } from '../../context/CurrencyContext';
import { useTranslation } from 'react-i18next';

export default function BudgetScreen() {
  const {selectedCurrencySign} = useCurrency();
  const { text, background, primary, warning, error, secondary ,card} = useThemeColor();
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  const [budgetData, setBudgetData] = useState(initialBudget);

  const remaining = (parseFloat(budgetData.total) - parseFloat(budgetData.spent)).toFixed(2);

  const chartData = {
    labels: budgetData.categories.map(cat => cat.name),
    datasets: [
      {
        data: budgetData.categories.map(cat => parseFloat(cat.spent)),
      },
    ],
  };

  const chartConfig = {
    backgroundColor: background,
    backgroundGradientFrom: background,
    backgroundGradientTo: background,
    decimalPlaces: 0,
    color: (opacity = 1) => primary,
    labelColor: (opacity = 0.8) => secondary,
    barPercentage: 0.6, // Adjust the width of the bars (0 to 1)
    style: {
      borderRadius: 8,
    },
    propsForLabels: {
      fontSize: 10,
    },
    xAxisLabel: '₹', // Add label to the x-axis
    yAxisSuffix: '₹', // Add suffix to the y-axis labels
    yAxisInterval: 1000, // Adjust the interval of y-axis labels if needed
  };

  useEffect(() => {
    loadBudget();
  }, []);

  const loadBudget = async () => {
    try {
      const storedBudget = await AsyncStorage.getItem(BUDGET_STORAGE_KEY);
      if (storedBudget) {
        setBudgetData(JSON.parse(storedBudget));
        console.log('BudgetScreen: Loaded budget from storage:', JSON.parse(storedBudget));
      } else {
        setBudgetData(initialBudget);
        console.log('BudgetScreen: No budget found, using initial budget.');
      }
    } catch (error) {
      console.error('BudgetScreen: Error loading budget:', error);
      setBudgetData(initialBudget);
    }
  };

  const saveBudget = async (data) => {
    try {
      await AsyncStorage.setItem(BUDGET_STORAGE_KEY, JSON.stringify(data));
      console.log('BudgetScreen: Budget saved to storage:', data);
    } catch (error) {
      console.error('BudgetScreen: Error saving budget:', error);
    }
  };

  const handleTotalBudgetChange = (newBudget) => {
    setBudgetData(prev => ({ ...prev, total: newBudget }));
  };

  const handleSpentChange = (newSpent) => {
    setBudgetData(prev => ({ ...prev, spent: newSpent }));
  };

  const handleCategoryBudgetChange = (index, newBudget) => {
    const updatedCategories = [...budgetData.categories];
    updatedCategories[index].budgeted = newBudget;
    setBudgetData(prev => ({ ...prev, categories: updatedCategories }));
  };

  const handleCategorySpentChange = (index, newSpent) => {
    const updatedCategories = [...budgetData.categories];
    updatedCategories[index].spent = newSpent;
    setBudgetData(prev => ({ ...prev, categories: updatedCategories }));
  };

  const handleSaveBudget = () => {
    console.log('Budget Data Saved:', budgetData);
    saveBudget(budgetData); // Save to AsyncStorage
    navigation.navigate('Insights', { budgetData });
  };

  return (
    <View style={[styles.container, { backgroundColor: background, flex: 1 }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: text }]}>Edit Monthly Budget</Text>
          <Text style={[styles.subtitle, { color: secondary }]}>April 2025</Text>
        </View>

        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: secondary }]}>Budget</Text>
              <TextInput
                style={[styles.summaryInput, { color: text }]}
                value={budgetData.total}
                onChangeText={handleTotalBudgetChange}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: secondary }]}>Spent</Text>
              <TextInput
                style={[styles.summaryInput, { color: text }]}
                value={budgetData.spent}
                onChangeText={handleSpentChange}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryLabel, { color: secondary }]}>Remaining</Text>
              <Text style={[styles.summaryAmount, { color: primary }]}>₹{remaining}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: text }]}>Spending Breakdown</Text>
          <Card style={styles.chartCard}>
            <BarChart
              data={chartData}
              width={screenWidth - 48}
              height={200} // Adjust height as needed
              chartConfig={chartConfig}
              style={{
                marginVertical: 8,
              }}
            />
          </Card>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: text }]}>Categories</Text>
          {budgetData.categories.map((category, index) => (
            <Card style={styles.categoryCard} key={index}>
              <View style={styles.categoryHeader}>
                <Text style={[styles.categoryName, { color: text }]}>{category.name}</Text>
                <View style={styles.categoryAmountContainer}>
                  <Text style={[styles.categoryAmountLabel, { color: secondary }]}>Budget:</Text>
                  <TextInput
                    style={[styles.categoryBudgetInput, { color: text }]}
                    value={category.budgeted}
                    onChangeText={(newBudget) => handleCategoryBudgetChange(index, newBudget)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progress,
                      {
                        width: `${(parseFloat(category.spent) / parseFloat(category.budgeted) || 0) * 100}%`,
                        backgroundColor: (parseFloat(category.spent) / parseFloat(category.budgeted) > 0.8 ? error : primary),
                      },
                    ]}
                  />
                </View>
                <View style={styles.spentInputContainer}>
                  <Text style={[styles.categorySpentLabel, { color: secondary }]}>Spent:</Text>
                  <TextInput
                    style={[styles.categorySpentInput, { color: text }]}
                    value={category.spent}
                    onChangeText={(newSpent) => handleCategorySpentChange(index, newSpent)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={[styles.saveButton, { backgroundColor: primary }]} onPress={handleSaveBudget}>
        <Icon name="check" size={24} color="white" />
        <Text style={styles.saveButtonText}>Save Budget</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: 80,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 4,
  },
  summaryCard: {
    marginHorizontal: 24,
    padding: 16,
    borderRadius: 8,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 16,
  },
  summaryItem: {
    flex: 1,
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  summaryAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  summaryInput: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    width: 90,
  },
  divider: {
    width: 1,
    height: 40,
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chartCard: {
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 24,
  },
  categoryCard: {
    marginBottom: 12,
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  categoryAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryAmountLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginRight: 4,
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  progressBarContainer: {
    marginVertical: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
  spentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  categorySpentLabel: {
    fontSize: 14,
    opacity: 0.7,
    marginRight: 8,
  },
  categoryBudgetInput: {
    width: 80,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    textAlign: 'right',
    paddingVertical: 2,
  },
  categorySpentInput: {
    width: 80,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
  },
  saveButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#6C5CE7',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
});