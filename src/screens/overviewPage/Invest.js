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
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { GEMINI_API_KEY } from '@env';
import { Card } from '../../components/Card';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Invest = () => {
  const theme = {
    primary: '#6C5CE7',
    secondary: '#A8A8A8',
    background: '#F8F9FA',
    card: '#FFFFFF',
    text: '#2D3436',
    border: '#E9ECEF',
    notification: '#FF7675',
    success: '#00B894',
    warning: '#FDCB6E',
    error: '#FF7675',
  };
  const { text, primary } = theme;
  const [age, setAge] = useState('');
  const [futurePlans, setFuturePlans] = useState('');
  const [income, setIncome] = useState('');
  const [loading, setLoading] = useState(false);
  const [investmentPoints, setInvestmentPoints] = useState([]);
  const navigation = useNavigation();
//   const language = 'Odia';
  const handleGetInvestmentOptions = async () => {
    
    if (!age || !futurePlans || !income) {
      alert('Please answer all the questions.');
      return;
    }

    setLoading(true);
    setInvestmentPoints([]);

    const prompt = `Hey smart investor! Based on your details:
    Age: ${age}
    Future Goals: ${futurePlans}
    Annual Income: ₹${income}

    Give me 2-3 super interesting and concise investment ideas as bullet points. Make them sound exciting and easy to grasp. For each idea, briefly explain why it could be a good fit, and make sure to **bold** the key investment terms like this. Format it nicely for reading!`;

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: text }]}>
              <MaterialCommunityIcons name="arrow-top-right" size={28} color={primary} /> Investment Analysis
            </Text>
            <Text style={[styles.subtitle, { color: text + '80', textAlign: 'center' }]}>
              Unleash the potential of your money with these insights.
            </Text>
          </View>

          <Card style={[styles.inputCard, { backgroundColor: theme.card }]}>
            <Text style={[styles.label, { color: text }]}>Your Age:</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: text }]}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              placeholder="Enter your age (e.g., 25)"
              placeholderTextColor={theme.secondary}
            />

            <Text style={[styles.label, { color: text }]}>Dream Future Plans:</Text>
            <TextInput
              style={[styles.inputMultiline, { borderColor: theme.border, color: text }]}
              value={futurePlans}
              onChangeText={setFuturePlans}
              placeholder="What are your big goals? (e.g., early retirement, dream home)"
              placeholderTextColor={theme.secondary}
              multiline
            />

            <Text style={[styles.label, { color: text }]}>Your Annual Income (₹):</Text>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: text }]}
              value={income}
              onChangeText={setIncome}
              keyboardType="number-pad"
              placeholder="Your yearly earnings (e.g., 500000)"
              placeholderTextColor={theme.secondary}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: primary }]}
              onPress={handleGetInvestmentOptions}
              disabled={loading || !age || !futurePlans || !income}
            >
              <Text style={{ color: theme.background, fontSize: 18, fontWeight: 'bold' }}>
                {loading ? (
                  <ActivityIndicator size="small" color={theme.background} />
                ) : (
                  <>
                    <MaterialCommunityIcons name="lightbulb-on" size={20} color={theme.background} style={{ marginRight: 8 }} />
                    Analyze
                  </>
                )}
              </Text>
            </TouchableOpacity>
          </Card>

          {investmentPoints.length > 0 && (
            <Card style={[styles.resultsCard, { backgroundColor: theme.card }]}>
              <Text style={[styles.resultsTitle, { color: primary }]}>
                <MaterialCommunityIcons name="thought-bubble" size={24} color={primary} style={{ marginRight: 8 }} />
                Here's What I've Got:
              </Text>
              {investmentPoints.map((point, index) => (
                <View key={index} style={styles.listItem}>
                  <Text style={[styles.bulletPoint, { color: primary }]}>✨</Text>
                  <Text style={[styles.listItemText, { color: text }]}>
                    {point.map((part, partIndex) => (
                      <Text
                        key={partIndex}
                        style={{ fontWeight: part.bold ? 'bold' : 'normal', color: text }}
                      >
                        {part.text}
                      </Text>
                    ))}
                  </Text>
                </View>
              ))}
            </Card>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 20,
  },
  inputCard: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  inputMultiline: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  button: {
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    elevation: 5,
  },
  resultsCard: {
    padding: 20,
    marginTop: 20,
    borderRadius: 12,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    marginRight: 10,
    fontSize: 18,
    lineHeight: 24,
  },
  listItemText: {
    flexShrink: 1,
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Invest;