import { createStackNavigator } from "@react-navigation/stack";
import CurrencySettingsScreen from './CurrencySettingsScreen'
import EditProfileScreen from './EditProfileScreen'
import LanguageSettingsScreen from './LanguageSettingsScreen'
import NotificationSettingsScreen from './NotificationSettingsScreen'
import ThemeSettingsScreen from './ThemeSettingsScreen'
import ProfileScreen from "./ProfileScreen";

export default function ProfileNavigator(){
  const Stack = createStackNavigator();

  return(
    <Stack.Navigator>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{headerShown: false}}/>
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="CurrencySettings" component={CurrencySettingsScreen} />
      <Stack.Screen name="LanguageSettings" component={LanguageSettingsScreen} />
      <Stack.Screen name="ThemeSettings" component={ThemeSettingsScreen} />
    </Stack.Navigator>
  )

}
