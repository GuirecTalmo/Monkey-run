import type { NavigatorScreenParams } from '@react-navigation/native';

export type HomeStackParamList = {
  Dashboard: undefined;
};

export type ChronoStackParamList = {
  ChronoMain: undefined;
};

export type HistoryStackParamList = {
  HistoryMain: undefined;
  SessionDetail: undefined;
};

export type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
};

export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Chrono: NavigatorScreenParams<ChronoStackParamList>;
  History: NavigatorScreenParams<HistoryStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

export type RootStackParamList = {
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  Signup: undefined;
  /** Onglets principaux (params optionnels pour navigation imbriquée). */
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
};
