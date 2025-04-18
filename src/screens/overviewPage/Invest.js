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
  const {card , primary , text , background, secondary , border} = useThemeColor();
  const { t } = useTranslation();
  const [age, setAge] = useState('');
  const [futurePlans, setFuturePlans] = useState('');
  const [income, setIncome] = useState('');
  const [loading, setLoading] = useState(false);
  const [investmentPoints, setInvestmentPoints] = useState([]);
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

    if (language === 'or') {
      prompt = `ହେ ସ୍ମାର୍ଟ ନିବେଶକ! ଆପଣଙ୍କ ବିବରଣୀ ଆଧାରରେ:
      ବୟସ: ${age}
      ଭବିଷ୍ୟତର ଯୋଜନା: ${futurePlans}
      ବାର୍ଷିକ ଆୟ: ₹${income}

      ମୋତେ ୨-୩ ଟି ସୁପର ମଜାଦାର ଏବଂ ସଂକ୍ଷିପ୍ତ ନିବେଶ ଧାରଣା ବୁଲେଟ ପଏଣ୍ଟରେ ଦିଅନ୍ତୁ। ସେଗୁଡ଼ିକୁ ରୋମାଞ୍ଚକର ଏବଂ ବୁଝିବା ସହଜ ହେବା ଉଚିତ୍। ପ୍ରତ୍ୟେକ ଧାରଣା ପାଇଁ, ଏହା କାହିଁକି ଉପଯୁକ୍ତ ହୋଇପାରେ ସେ ବିଷୟରେ ସଂକ୍ଷିପ୍ତରେ ବର୍ଣ୍ଣନା କରନ୍ତୁ, ଏବଂ ନିଶ୍ଚିତ କରନ୍ତୁ ଯେ **ମୁଖ୍ୟ ନିବେଶ ଶବ୍ଦଗୁଡ଼ିକୁ** ଏହିପରି ବୋଲ୍ଡ କରନ୍ତୁ। ପଢିବା ପାଇଁ ଏହାକୁ ସୁନ୍ଦର ଭାବରେ ଫର୍ମାଟ୍ କରନ୍ତୁ!`;
    } else if (language === 'hi') {
      prompt = `हे स्मार्ट निवेशक! आपकी डिटेल्स के आधार पर:
      उम्र: ${age}
      भविष्य के लक्ष्य: ${futurePlans}
      वार्षिक आय: ₹${income}

      मुझे 2-3 सुपर दिलचस्प और संक्षिप्त निवेश विचार बुलेट पॉइंट्स में दें। उन्हें रोमांचक और समझने में आसान बनाएं। प्रत्येक विचार के लिए, संक्षेप में बताएं कि यह क्यों एक अच्छा विकल्प हो सकता है, और **मुख्य निवेश शब्दों** को इस तरह बोल्ड करना सुनिश्चित करें। इसे पढ़ने के लिए अच्छी तरह से फॉर्मेट करें!`;
    } else if (language === 'bn') {
      prompt = `হে স্মার্ট বিনিয়োগকারী! আপনার বিবরণের উপর ভিত্তি করে:
      বয়স: ${age}
      ভবিষ্যতের পরিকল্পনা: ${futurePlans}
      বার্ষিক আয়: ₹${income}

      আমাকে 2-3 টি সুপার আকর্ষণীয় এবং সংক্ষিপ্ত বিনিয়োগের ধারণা বুলেট পয়েন্টে দিন। সেগুলোকে উত্তেজনাপূর্ণ এবং সহজে বোধগম্য করে তুলুন। প্রতিটি ধারণার জন্য, সংক্ষেপে ব্যাখ্যা করুন কেন এটি একটি ভাল বিকল্প হতে পারে, এবং **মূল বিনিয়োগ শব্দ** গুলোকে এভাবে মোটা করে লিখুন। এটিকে সুন্দরভাবে পড়ার জন্য ফরম্যাট করুন!`;
    } else if (language === 'kn') {
      prompt = `ಹೇ ಬುದ್ಧಿವಂತ ಹೂಡಿಕೆದಾರ! ನಿಮ್ಮ ವಿವರಗಳ ಆಧಾರದ ಮೇಲೆ:
      ವಯಸ್ಸು: ${age}
      ಭವಿಷ್ಯದ ಯೋಜನೆಗಳು: ${futurePlans}
      ವಾರ್ಷಿಕ ಆದಾಯ: ₹${income}

      ನನಗೆ 2-3 ಸೂಪರ್ ಆಸಕ್ತಿದಾಯಕ ಮತ್ತು ಸಂಕ್ಷಿಪ್ತ ಹೂಡಿಕೆ ಕಲ್ಪನೆಗಳನ್ನು ಬುಲೆಟ್ ಪಾಯಿಂಟ್‌ಗಳಲ್ಲಿ ನೀಡಿ. ಅವು ರೋಮಾಂಚಕ ಮತ್ತು ಗ್ರಹಿಸಲು ಸುಲಭವಾಗಿರಬೇಕು. ಪ್ರತಿ ಕಲ್ಪನೆಗೆ, ಅದು ಏಕೆ ಉತ್ತಮ ಆಯ್ಕೆಯಾಗಬಹುದು ಎಂಬುದನ್ನು ಸಂಕ್ಷಿಪ್ತವಾಗಿ ವಿವರಿಸಿ, ಮತ್ತು **ಮುಖ್ಯ ಹೂಡಿಕೆ ಪದಗಳನ್ನು** ಈ ರೀತಿ ದಪ್ಪಗಾಗಿಸಲು ಮರೆಯದಿರಿ. ಓದಲು ಸುಂದರವಾಗಿ ಫಾರ್ಮ್ಯಾಟ್ ಮಾಡಿ!`;
    } else if (language === 'pa') {
      prompt = `ਹੇ ਸਮਾਰਟ ਨਿਵੇਸ਼ਕ! ਤੁਹਾਡੇ ਵੇਰਵਿਆਂ ਦੇ ਆਧਾਰ 'ਤੇ:
      ਉਮਰ: ${age}
      ਭਵਿੱਖ ਦੀਆਂ ਯੋਜਨਾਵਾਂ: ${futurePlans}
      ਸਾਲਾਨਾ ਆਮਦਨ: ₹${income}

      ਮੈਨੂੰ 2-3 ਸੁਪਰ ਦਿਲਚਸਪ ਅਤੇ ਸੰਖੇਪ ਨਿਵੇਸ਼ ਵਿਚਾਰ ਬੁਲੇਟ ਪੁਆਇੰਟਾਂ ਵਿੱਚ ਦਿਓ। ਉਹਨਾਂ ਨੂੰ ਦਿਲਚਸਪ ਅਤੇ ਸਮਝਣ ਵਿੱਚ ਆਸਾਨ ਬਣਾਉ। ਹਰੇਕ ਵਿਚਾਰ ਲਈ, ਸੰਖੇਪ ਵਿੱਚ ਦੱਸੋ ਕਿ ਇਹ ਇੱਕ ਵਧੀਆ ਵਿਕਲਪ ਕਿਉਂ ਹੋ ਸਕਦਾ ਹੈ, ਅਤੇ **ਮੁੱਖ ਨਿਵੇਸ਼ ਸ਼ਬਦਾਂ** ਨੂੰ ਇਸ ਤਰ੍ਹਾਂ ਬੋਲਡ ਕਰਨਾ ਯਕੀਨੀ ਬਣਾਓ। ਇਸਨੂੰ ਪੜ੍ਹਨ ਲਈ ਵਧੀਆ ਢੰਗ ਨਾਲ ਫਾਰਮੈਟ ਕਰੋ!`;
    }

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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: text , marginTop:25 }]}>
              <MaterialCommunityIcons name="arrow-top-right" size={28} color={primary} /> 
              {t('investmentAnalysis')}
            </Text>
            <Text style={[styles.subtitle, { color: text + '80', textAlign: 'center'}]}>
              Unleash the potential of your money with these insights.
            </Text>
          </View>

          <Card style={[styles.inputCard, { backgroundColor: card }]}>
            <Text style={[styles.label, { color: text }]}>{t('yourAge')}</Text>
            <TextInput
              style={[styles.input, { borderColor: border, color: text }]}
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              placeholder="Enter your age (e.g., 25)"
              placeholderTextColor={secondary}
            />

            <Text style={[styles.label, { color: text }]}>{t('dreamFuturePlans')}</Text>
            <TextInput
              style={[styles.inputMultiline, { borderColor: border, color: text }]}
              value={futurePlans}
              onChangeText={setFuturePlans}
              placeholder="What are your big goals? (e.g., early retirement, dream home)"
              placeholderTextColor={secondary}
              multiline
            />

            <Text style={[styles.label, { color: text }]}>{t('annualIncome')} (₹):</Text>
            <TextInput
              style={[styles.input, { borderColor: border, color: text }]}
              value={income}
              onChangeText={setIncome}
              keyboardType="number-pad"
              placeholder="Your yearly earnings (e.g., 500000)"
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <MaterialCommunityIcons name="lightbulb-on" size={20} color={background} style={{ marginRight: 8 }} />
                  <Text style={{ color: background, fontSize: 18, fontWeight: 'bold' }}>
                    {t('analyze')}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </Card>

          {investmentPoints.length > 0 && (
            <Card style={[styles.resultsCard, { backgroundColor: card }]}>
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