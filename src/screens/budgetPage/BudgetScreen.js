import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { Card } from '../../components/Card';
import { ProgressChart } from 'react-native-chart-kit';
import { useThemeColor } from '../../context/ThemeProvider';
import { useCurrency } from '../../context/CurrencyContext';
import { useTranslation } from 'react-i18next';

export default function BudgetScreen() {
  const {selectedCurrencySign} = useCurrency();
  const { text, background, primary, warning, error ,card} = useThemeColor();
  const screenWidth = Dimensions.get('window').width;
  const {t} = useTranslation();

  const budgetProgress = {
    labels: [t('Food'), t('Transport'), t('Pleasures')],
    data: [0.8, 0.6, 0.9],
  };

  return (
      <ScrollView style={[styles.container, { backgroundColor: background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: text }]}>{t('monthlyBudget')}</Text>
          <Text style={[styles.subtitle, { color: text }]}>{t('april2025')}</Text>
        </View>
  
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <View>
              <Text style={[styles.summaryLabel, { color: text }]}>{t('budget')}</Text>
              <Text style={[styles.summaryAmount, { color: text }]}>{selectedCurrencySign}5,000.00</Text>
            </View>
            <View style={[styles.divider , {backgroundColor:background}]} />
            <View>
              <Text style={[styles.summaryLabel, { color: text }]}>{t('spent')}</Text>
              <Text style={[styles.summaryAmount, { color: warning }]}>{selectedCurrencySign}3,240.50</Text>
            </View>
            <View style={[styles.divider , {backgroundColor:background}]} />
            <View>
              <Text style={[styles.summaryLabel, { color: text }]}>{t('remaining')}</Text>
              <Text style={[styles.summaryAmount, { color: primary }]}>{selectedCurrencySign}1,759.50</Text>
            </View>
          </View>
        </Card>
  
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: text },]}>{t('categoryProgress')}</Text>
          <Card>
            <ProgressChart
              data={budgetProgress}
              width={screenWidth}
              height={220}
              strokeWidth={16}
              radius={32}
              style={{
                alignSelf: 'center',
                transform: [{scale:0.89}],
              }}
              chartConfig={{
                backgroundColor: card,
                backgroundGradientFrom: card,
                backgroundGradientTo: card,
                decimalPlaces: 1,
                color: (opacity = 1) => `rgba(108, 92, 231, ${opacity})`,
              }}
              hideLegend={false}
            />
          </Card>
        </View>
  
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: text }]}>{t('categories')}</Text>
          <Card style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.categoryName, { color: text }]}>{t('foodDining')}</Text>
              <Text style={[styles.categoryAmount, { color: error }]}>{selectedCurrencySign}800 / {selectedCurrencySign}1,000</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '80%', backgroundColor: error }]} />
            </View>
          </Card>
  
          <Card style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.categoryName, { color: text }]}>{t('transportation')}</Text>
              <Text style={[styles.categoryAmount, { color: text }]}>{selectedCurrencySign}300 / {selectedCurrencySign}500</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '60%', backgroundColor: primary }]} />
            </View>
          </Card>
  
          <Card style={styles.categoryCard}>
            <View style={styles.categoryHeader}>
              <Text style={[styles.categoryName, { color: text }]}>{t('shopping')}</Text>
              <Text style={[styles.categoryAmount, { color: error }]}>{selectedCurrencySign}450 / {selectedCurrencySign}500</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: '90%', backgroundColor: error }]} />
            </View>
          </Card>
        </View>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    paddingTop: 60,
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
    margin: 24,
    marginTop: 0,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  divider: {
    width: 1,
    height: 40,
  },
  section: {
    padding: 24,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  categoryCard: {
    marginBottom: 16,
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
  },
  categoryAmount: {
    fontSize: 16,
    fontWeight: '500',
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
});
