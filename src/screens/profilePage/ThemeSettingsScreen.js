import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const ThemeSettingsScreen = () => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(previousState => !previousState);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Theme</Text>
            <TouchableOpacity style={styles.button} onPress={toggleTheme}>
                <Text style={styles.buttonText}>{isDarkTheme ? 'Switch to Light Theme' : 'Switch to Dark Theme'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    button: { padding: 15, backgroundColor: '#007BFF', borderRadius: 5 },
    buttonText: { color: 'white', textAlign: 'center' },
});

export default ThemeSettingsScreen;
