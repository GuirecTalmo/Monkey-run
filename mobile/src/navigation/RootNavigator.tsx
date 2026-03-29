import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainTabBar } from '../components/MainTabBar';
import { ChronoScreen } from '../screens/ChronoScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { OnboardingStep1Screen } from '../screens/OnboardingStep1Screen';
import { OnboardingStep2Screen } from '../screens/OnboardingStep2Screen';
import { OnboardingStep3Screen } from '../screens/OnboardingStep3Screen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { SessionDetailScreen } from '../screens/SessionDetailScreen';
import { SignupScreen } from '../screens/SignupScreen';
import { colors } from '../theme/colors';
import type {
  ChronoStackParamList,
  HistoryStackParamList,
  HomeStackParamList,
  MainTabParamList,
  ProfileStackParamList,
  RootStackParamList,
} from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const ChronoStack = createNativeStackNavigator<ChronoStackParamList>();
const HistoryStack = createNativeStackNavigator<HistoryStackParamList>();
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.background,
    primary: colors.primary,
    text: colors.white,
    border: colors.border,
    notification: colors.primary,
  },
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
    </HomeStack.Navigator>
  );
}

function ChronoStackNavigator() {
  return (
    <ChronoStack.Navigator screenOptions={{ headerShown: false }}>
      <ChronoStack.Screen name="ChronoMain" component={ChronoScreen} />
    </ChronoStack.Navigator>
  );
}

function HistoryStackNavigator() {
  return (
    <HistoryStack.Navigator screenOptions={{ headerShown: false }}>
      <HistoryStack.Screen name="HistoryMain" component={HistoryScreen} />
      <HistoryStack.Screen
        name="SessionDetail"
        component={SessionDetailScreen}
      />
    </HistoryStack.Navigator>
  );
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
    </ProfileStack.Navigator>
  );
}

function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <MainTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Chrono" component={ChronoStackNavigator} />
      <Tab.Screen name="History" component={HistoryStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <RootStack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
        initialRouteName="Onboarding1"
      >
        <RootStack.Screen
          name="Onboarding1"
          component={OnboardingStep1Screen}
        />
        <RootStack.Screen
          name="Onboarding2"
          component={OnboardingStep2Screen}
        />
        <RootStack.Screen
          name="Onboarding3"
          component={OnboardingStep3Screen}
        />
        <RootStack.Screen name="Login" component={LoginScreen} />
        <RootStack.Screen name="Signup" component={SignupScreen} />
        <RootStack.Screen name="Main" component={MainTabNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
