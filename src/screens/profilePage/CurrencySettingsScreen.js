import React, { useState } from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';

const CurrencySettingsScreen = () => {
    const [selectedCurrency, setSelectedCurrency] = useState('USD');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Select Currency</Text>
            <Picker
                selectedValue={selectedCurrency}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
            >
                <Picker.Item label="INR" value="INR" />
                <Picker.Item label="USD" value="USD" />
                <Picker.Item label="EUR" value="EUR" />
                <Picker.Item label="GBP" value="GBP" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, marginBottom: 20 },
    picker: { height: 50, width: '100%' },
});

export default CurrencySettingsScreen;
