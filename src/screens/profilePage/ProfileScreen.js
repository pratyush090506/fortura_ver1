import React, { useState , useContext} from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { Card } from '../../components/Card';
import { useThemeColor } from '../../hooks/useThemeColor';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { UserContext } from '../../context/UserContext';

const ProfileScreen = ({ navigation}) => {
  const {user} = useContext(UserContext);

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { text, background, primary, card } = useThemeColor();

  const handleMenuPress = (action) => {
    switch (action) {
      case 'logout':
        setIsLoggedIn(false);
        Alert.alert('Logged Out', 'You have been logged out.');
        navigation.navigate('Login');
        break;
      case 'login':
        navigation.navigate('Login');
        break;
      case 'edit-profile':
        navigation.navigate('EditProfile');
        break;
      case 'notifications':
        navigation.navigate('NotificationSettings');
        break;
      case 'currency':
        navigation.navigate('CurrencySettings');
        break;
      case 'theme':
        navigation.navigate('ThemeSettings');

        break;
      case 'language':
        navigation.navigate('LanguageSettings');
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* <ScrollView style={styles.scrollView}> */}
        <View style={styles.header}>
          <Image
            source={{
              uri: 'https://static.vecteezy.com/system/resources/thumbnails/029/364/950/small_2x/3d-carton-of-boy-going-to-school-ai-photo.jpg',
            }}
            style={styles.avatar}
          />
          <Text style={[styles.name, { color: 'black' }]}>{user.name}</Text>
          <Text style={[styles.phone, { color: 'black' }]}>{user.phone}</Text>
        </View>

        {isLoggedIn ? (
          <>
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: 'black' }]}>Account Settings</Text>

              <Card style={styles.menuCard}>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('edit-profile')}>
                  <MaterialCommunityIcons name="account-edit" size={24} color={primary} />
                  <Text style={[styles.menuText, { color: text }]}>Profile settings</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('notifications')}>
                  <MaterialCommunityIcons name="bell" size={24} color={primary} />
                  <Text style={[styles.menuText, { color: text }]}>Notifications</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
                </TouchableOpacity>
                
              </Card>
            </View>

            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: 'black' }]}>Preferences</Text>

              <Card style={styles.menuCard}>
                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('currency')}>
                  <MaterialCommunityIcons name="currency-inr" size={24} color={primary} />
                  <Text style={[styles.menuText, { color: text }]}>Currency</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('theme')}>
                  <MaterialCommunityIcons name="theme-light-dark" size={24} color={primary} />
                  <Text style={[styles.menuText, { color: text }]}>Theme</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
                </TouchableOpacity>

                <View style={styles.divider} />

                <TouchableOpacity style={styles.menuItem} onPress={() => handleMenuPress('language')}>
                  <MaterialCommunityIcons name="translate" size={24} color={primary} />
                  <Text style={[styles.menuText, { color: text }]}>Language</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={text} />
                </TouchableOpacity>
              </Card>
            </View>

            <View style={styles.section}>
              <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: card }]}
                onPress={() => handleMenuPress('logout')}>
                 <MaterialCommunityIcons name='logout' size={30} color={primary}/>   
                <Text style={[styles.logoutText, { color: primary }]}>Log Out</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: card }]}
            onPress={() => handleMenuPress('login')}>
            <Text style={[styles.logoutText, { color: primary }]}>Login</Text>
          </TouchableOpacity>
        )}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  header: { padding: 24, paddingTop: 60, alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  phone: { fontSize: 16 },
  section: { padding: 24, paddingTop: 0 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  menuCard: { padding: 0 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  menuText: { flex: 1, fontSize: 16, marginLeft: 16 },
  divider: { height: 1, backgroundColor: '#E9ECEF' },
  logoutButton: { flexDirection: 'row', alignItems: 'center',justifyContent:'center', marginTop: 24, padding: 16, borderRadius: 12, alignItems: 'center' },
  logoutText: { fontSize: 16, fontWeight: '600' },
});

export default ProfileScreen;
