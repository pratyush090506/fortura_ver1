import React, { useState } from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';

const LanguageSettingsScreen = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('English');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Language</Text>
            <Picker
                selectedValue={selectedLanguage}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Spanish" value="Spanish" />
                <Picker.Item label="French" value="French" />
                <Picker.Item label="German" value="German" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    picker: { height: 50, width: '100%' },
});

export default LanguageSettingsScreen;
