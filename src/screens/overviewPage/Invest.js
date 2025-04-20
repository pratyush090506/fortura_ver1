import { GEMINI_API_KEY } from '@env';
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { useLanguage } from '../../context/LanguageContext';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Card } from '../../components/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import { useThemeColor } from '../../context/ThemeProvider';

const Invest = () => {
  const { text, background, primary, warning, error, secondary, card, border } = useThemeColor();
  const { t } = useTranslation();
  const [age, setAge] = useState('');
  const [futurePlans, setFuturePlans] = useState('');
  const [income, setIncome] = useState('');
  const [loading, setLoading] = useState(false);
  const [investmentPoints, setInvestmentPoints] = useState([]);
  const navigation = useNavigation();
  const { language } = useLanguage();

  const handleGetInvestmentOptions = async () => {
    if (!age || !futurePlans || !income) {
      alert('Please answer all the questions.');
      return;
    }

    setLoading(true);
    setInvestmentPoints([]);

    let prompt = `Hey smart investor! Based on your details:
    Age: ${age}
    Future Goals: ${futurePlans}
    Annual Income: ₹${income}

    Give me 2-3 super interesting and concise investment ideas as bullet points. Make them sound exciting and easy to grasp. For each idea, briefly explain why it could be a good fit, and make sure to **bold** the key investment terms like this. Format it nicely for reading!`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: prompt }] }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': GEMINI_API_KEY,
          },
        }
      );

      const aiContent = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiContent) {
        const points = aiContent.split('\n').filter(line => line.trim().startsWith('* '));
        const formattedPoints = points.map(point => {
          const parts = point.substring(2).split('**');
          return parts.map((part, index) => ({ text: part, bold: index % 2 !== 0 }));
        });
        setInvestmentPoints(formattedPoints);
      } else {
        setInvestmentPoints([[{ text: 'Hmm, no bright ideas popped up!', bold: false }]]);
      }
    } catch (error) {
      console.error('Error fetching investment options:', error);
      setInvestmentPoints([[{ text: 'Oops! My circuits got a bit tangled.', bold: false }]]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={[styles.header, { marginTop: 20 }]}> {/* Added marginTop here */}
            <Text style={[styles.title, { color: text }]}>
              <MaterialCommunityIcons name="arrow-top-right" size={28} color={primary} />{' '}
              {t('investmentAnalysis')}
            </Text>
            <Text style={[styles.subtitle, { color: text + '80', textAlign: 'center' }]}>
              {t('unleash')}
            </Text>
          </View>

          <Card style={[styles.inputCard, { backgroundColor: card }]}>
            <Text style={[styles.label, { color: text }]}>{t('yourage')}</Text>
            <TextInput
              style={[styles.input, { borderColor: border, color: text }]}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              placeholder={t('enterAge')}
              placeholderTextColor={secondary}
            />

            <Text style={[styles.label, { color: text }]}>{t('dreamFuturePlans')}</Text>
            <TextInput
              style={[styles.inputMultiline, { borderColor: border, color: text }]}
              value={futurePlans}
              onChangeText={setFuturePlans}
              placeholder={t('enterFuturePlans')}
              placeholderTextColor={secondary}
              multiline
            />

            <Text style={[styles.label, { color: text }]}>{t('annualIncome')} (₹):</Text>
            <TextInput
              style={[styles.input, { borderColor: border, color: text }]}
              value={income}
              onChangeText={setIncome}
              keyboardType="number-pad"
              placeholder={t('enterIncome')}
              placeholderTextColor={secondary}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: primary }]}
              onPress={handleGetInvestmentOptions}
              disabled={loading || !age || !futurePlans || !income}
            >
              {loading ? (
                <ActivityIndicator size="small" color={background} />
              ) : (
                <Text style={{ color: background, fontSize: 18, fontWeight: 'bold' }}>
                  <MaterialCommunityIcons name="lightbulb-on" size={20} color={background} />{' '}
                  {t('analyseoptions')}
                </Text>
              )}
            </TouchableOpacity>
          </Card>

          {investmentPoints.length > 0 && (
            <Card style={[styles.resultCard, { backgroundColor: card }]}>
              {investmentPoints.map((point, index) => (
                <Text key={index} style={{ color: text, marginBottom: 8 }}>
                  {'• '}
                  {point.map((part, i) =>
                    part.bold ? (
                      <Text key={i} style={{ fontWeight: 'bold', color: text }}>
                        {part.text}
                      </Text>
                    ) : (
                      <Text key={i}>{part.text}</Text>
                    )
                  )}
                </Text>
              ))}
            </Card>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  flex: { flex: 1 },
  scrollContainer: { padding: 16 },
  header: { marginBottom: 24, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  subtitle: { fontSize: 16, marginTop: 8 },
  inputCard: { padding: 16, borderRadius: 12, marginBottom: 16 },
  resultCard: { padding: 16, borderRadius: 12 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  inputMultiline: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Invest;
