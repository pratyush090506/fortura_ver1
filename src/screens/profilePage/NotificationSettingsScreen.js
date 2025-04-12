import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Switch, Button, Platform, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useThemeColor } from '../../hooks/useThemeColor';

const NotificationSettingsScreen = () => {
    const {primary} = useThemeColor();

    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    
    useEffect(() => {
        const loadToggleState = async () => {
        const value = await AsyncStorage.getItem('notificationsEnabled');
        if (value !== null) setNotificationsEnabled(value === 'true');
        };
        loadToggleState();
    }, []);
    
    const toggleSwitch = async () => {
        const newValue = !notificationsEnabled;
        setNotificationsEnabled(newValue);
        await AsyncStorage.setItem('notificationsEnabled', newValue.toString());
    };
    
    const openNotificationSettings = () => {
        if (Platform.OS === 'android') {
        Linking.openSettings();
        } else if (Platform.OS === 'ios') {
        Linking.openURL('app-settings:');
        } else {
        Alert.alert('Unsupported platform');
        }
    };
    
    return (
        <View style={styles.container}>
        <View style={styles.switchContainer}>
            <Text style={styles.label}>Enable Notifications</Text>
            <Switch
            onValueChange={toggleSwitch}
            value={notificationsEnabled}
            trackColor={{ false: '#ccc', true: '#ccc' }}
            thumbColor={notificationsEnabled ? primary : '#f4f3f4'}
            />
        </View>
    
        <Button title="Open App Settings" onPress={openNotificationSettings} color={primary}/>
        </View>
    );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  switchContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: 20,
  },
  label: { fontSize: 16 },
});

export default NotificationSettingsScreen;
