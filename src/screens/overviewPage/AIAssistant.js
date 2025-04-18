import { GEMINI_API_KEY } from '@env';
import React, { useState } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { useThemeColor } from '../../context/ThemeProvider';
const API_ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

import { useLanguage } from '../../context/LanguageContext';

const AIAssistantScreen = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const { text, background, primary } = useThemeColor();
  const { language } = useLanguage();

  const handleAskGemini = async () => {
    if (!query.trim()) return;

    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');

    const greetings = ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'];
    if (greetings.includes(query.toLowerCase().trim())) {
      let aiWelcomeMessageContent = `Welcome to Fortura AI! How can I help you with your personal finances today?`;
      if (language === 'or') {
        aiWelcomeMessageContent += ' ଓଡ଼ିଆରେ ଉତ୍ତର ଦିଅନ୍ତୁ।';
      } else if (language === 'hi') {
        aiWelcomeMessageContent += ' हिंदी में उत्तर दें।';
      } else if (language === 'bn') {
        aiWelcomeMessageContent += ' বাংলায় উত্তর দাও।';
      } else if (language === 'kn') {
        aiWelcomeMessageContent += ' ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ।';
      } else if (language === 'pa') {
        aiWelcomeMessageContent += ' ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ।';
      } else {
        aiWelcomeMessageContent += ' give the response in English.';
      }
      const aiWelcomeMessage = { role: 'assistant', content: aiWelcomeMessageContent };
      setMessages(prev => [...prev, aiWelcomeMessage]);
      return;
    }

    setLoading(true);
    let engineeredPrompt = `You are Fortura AI, a helpful personal finance assistant. Please answer the following question clearly and concisely: ${query}`;

    if (language === 'or') {
      engineeredPrompt = `ଓଡ଼ିଆରେ ଉତ୍ତର ଦିଅନ୍ତୁ। ${engineeredPrompt}`;
    } else if (language === 'hi') {
      engineeredPrompt = `हिंदी में उत्तर दें। ${engineeredPrompt}`;
    } else if (language === 'bn') {
      engineeredPrompt = `বাংলায় উত্তর দাও। ${engineeredPrompt}`;
    } else if (language === 'kn') {
      engineeredPrompt = `ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ। ${engineeredPrompt}`;
    } else if (language === 'pa') {
      engineeredPrompt = `ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ। ${engineeredPrompt}`;
    } else {
      engineeredPrompt += ' give the response in English.';
    }

    try {
      const response = await axios.post(
        API_ENDPOINT,
        {
          contents: [
            {
              parts: [
                {
                  text: engineeredPrompt,
                },
              ],
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const aiContent =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (aiContent) {
        const aiMessage = { role: 'assistant', content: aiContent };
        setMessages(prev => [...prev, aiMessage]);
      } else {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: 'Sorry, the AI response was empty.' },
        ]);
      }
    } catch (error) {
      console.error('Error calling AI:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong!' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#1f1c2c', '#928DAB']} style={styles.gradient}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.flex}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Fortura AI</Text>
          <Text style={styles.subHeader}>Your Personal Finance Assistant</Text>
        </View>

        <ScrollView
          style={styles.chatContainer}
          contentContainerStyle={{ padding: 16, flexGrow: 1 }}
          showsVerticalScrollIndicator={false}>
          {messages.length === 0 && !loading && (
            <View style={styles.placeholderContainer}>
              <Text style={styles.placeholderText}>
                💬 Ask me anything about budgeting, saving, or finance!
              </Text>
            </View>
          )}

          {messages.map((msg, index) => (
            <View
              key={index}
              style={[
                styles.messageBubble,
                msg.role === 'user' ? styles.userBubble : styles.aiBubble,
              ]}>
              <Text
                style={[
                  styles.messageText,
                  { color: msg.role === 'user' ? '#fff' : '#111' },
                ]}>
                {msg.content}
              </Text>
            </View>
          ))}

          {loading && (
            <ActivityIndicator
              size="small"
              color={primary}
              style={{ marginTop: 10 }}
            />
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={query}
            placeholder="Ask me something..."
            placeholderTextColor="#ccc"
            onChangeText={setQuery}
            multiline
          />
          <TouchableOpacity
            onPress={handleAskGemini}
            style={[styles.sendButton, { backgroundColor: primary }]}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  gradient: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
  subHeader: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 6,
  },
  chatContainer: {
    flex: 1,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  userBubble: {
    backgroundColor: '#4e54c8',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 0,
  },
  aiBubble: {
    backgroundColor: '#f0f0f0',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 0.5,
    borderTopColor: '#999',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    minHeight: 48,
    maxHeight: 100,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 8,
    color: '#000',
  },
  sendButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
  placeholderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  placeholderText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default AIAssistantScreen;