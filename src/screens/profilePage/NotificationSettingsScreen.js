import React, { useState } from 'react';
import { StyleSheet, View, Text, Switch } from 'react-native';

const NotificationSettingsScreen = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    const toggleSwitch = () => setNotificationsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notification Settings</Text>
            <View style={styles.switchContainer}>
                <Text>Enable Notifications</Text>
                <Switch
                    onValueChange={toggleSwitch}
                    value={notificationsEnabled}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    switchContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});

export default NotificationSettingsScreen;
