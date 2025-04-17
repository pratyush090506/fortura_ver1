import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AIAssistantScreen from '../screens/overviewPage/AIAssistant';


import { LoginScreen,OverviewScreen,PayScreen,BudgetScreen,InsightsScreen,ProfileNavigator } from '../screens';
import { useThemeColor } from '../hooks/useThemeColor';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const OverviewIcon = ({ color, size}) => (
  <MaterialCommunityIcons name="view-dashboard" size={size} color={color} />
);

const BudgetIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="wallet" size={size} color={color} />
);

const PayIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="qrcode-scan" size={size} color={color} />
);

const InsightsIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="chart-line" size={size} color={color} />
);

const ProfileIcon = ({ color, size }) => (
  <MaterialCommunityIcons name="account" size={size} color={color} />
);

function TabNavigator() {
  const { primary } = useThemeColor();

  return (
    <Tab.Navigator
      initialRouteName="Overview"
      screenOptions={{
        tabBarActiveTintColor: primary,
        tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          height: 60,
          paddingBottom: 10,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Overview"
        component={OverviewScreen}
        options={{ tabBarIcon: OverviewIcon }}
      />
      <Tab.Screen
        name="Budget"
        component={BudgetScreen}
        options={{ tabBarIcon: BudgetIcon }}
      />
      <Tab.Screen
        name="Pay"
        component={PayScreen}
        options={{ tabBarIcon: PayIcon }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{ tabBarIcon: InsightsIcon }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigator}
        options={{ tabBarIcon: ProfileIcon }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="AIAssistant" component={AIAssistantScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


