import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card } from '../../components/Card';
import { useThemeColor } from '../../context/ThemeProvider';
import { useTranslation } from 'react-i18next';

export default function InsightsScreen() {
  const { text, background, primary, success, warning, error } = useThemeColor();
  const {t} = useTranslation();

  const spendingData = [
    { label: t('Essential'), value: 45, color: primary },
    { label: t('Investment'), value: 30, color: success },
    { label: t('Leisure'), value: 15, color: warning },
    { label: t('Other'), value: 10, color: error },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: text }]}>{t('aiInsights')}</Text>
        <Text style={[styles.subtitle, { color: text }]}>{t('financialHealthReport')}</Text>
      </View>

      <Card style={styles.scoreCard}>
        <Text style={[styles.scoreLabel, { color: text }]}>{t('financialHealthScore')}</Text>
        <Text style={[styles.scoreValue, { color: success }]}>69</Text>
        <Text style={[styles.scoreTrend, { color: text }]}>'↑ 6.69 {t('pointsFromLastMonth')}</Text>
      </Card>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: text }]}>{t('spendingAnalysis')}</Text>
        <Card style={styles.chartCard}>
          {spendingData.map((item, index) => (
            <View key={index} style={styles.spendingItem}>
              <View style={styles.spendingHeader}>
                <Text style={[styles.spendingLabel, { color: text }]}>{item.label}</Text>
                <Text style={[styles.spendingValue, { color: item.color }]}>{item.value}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${item.value}%`, backgroundColor: item.color }
                  ]} 
                />
              </View>
            </View>
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: text }]}>{t('aiRecommendations')}</Text>
        
        <Card style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <Text style={[styles.recommendationTitle, { color: success }]}>
              💰 {t('savingsOpportunity')}
            </Text>
            <Text style={styles.impactScore}>{t('highImpact')}</Text>
          </View>
          <Text style={[styles.recommendationText, { color: text }]}>
            {t('suggestionStreaming')}
          </Text>
        </Card>

        <Card style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <Text style={[styles.recommendationTitle, { color: warning }]}>
              📊 {t('investmentTiming')}
            </Text>
            <Text style={styles.impactScore}>{t('mediumImpact')}</Text>
          </View>
          <Text style={[styles.recommendationText, { color: text }]}>
            {t('suggestionInvestment')}
          </Text>
        </Card>

        <Card style={styles.recommendationCard}>
          <View style={styles.recommendationHeader}>
            <Text style={[styles.recommendationTitle, { color: error }]}>
              ⚠️ {t('riskAlert')}
            </Text>
            <Text style={styles.impactScore}>{t('High Impact')}</Text>
          </View>
          <Text style={[styles.recommendationText, { color: text }]}>
            {t('suggestionEmergency')}
          </Text>
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
  scoreCard: {
    margin: 24,
    marginTop: 0,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    opacity: 0.7,
    marginBottom: 8,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  scoreTrend: {
    fontSize: 14,
    marginTop: 8,
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
  chartCard: {
    padding: 16,
  },
  spendingItem: {
    marginBottom: 16,
  },
  spendingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  spendingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  spendingValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  recommendationCard: {
    marginBottom: 16,
  },
  recommendationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  impactScore: {
    fontSize: 12,
    backgroundColor: '#E9ECEF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recommendationText: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
  },
});
