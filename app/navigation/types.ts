import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { Match } from '../services/matchService';
import { Complex } from '../context/FavoritesContext';

// Auth Stack
export type AuthStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
};

export type AuthStackNavigationProp<T extends keyof AuthStackParamList> = 
  StackNavigationProp<AuthStackParamList, T>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = {
  navigation: AuthStackNavigationProp<T>;
  route: RouteProp<AuthStackParamList, T>;
};

// Main Bottom Tab Navigator
export type MainTabParamList = {
  Profile: undefined;
  Complexes: undefined;
  Matches: undefined;
  Matchmaking: undefined;
};

export type MainTabNavigationProp<T extends keyof MainTabParamList> = 
  BottomTabNavigationProp<MainTabParamList, T>;

export type MainTabScreenProps<T extends keyof MainTabParamList> = {
  navigation: MainTabNavigationProp<T>;
  route: RouteProp<MainTabParamList, T>;
};

// App Stack (includes auth stack and main tab navigator)
export type AppStackParamList = {
  Auth: undefined;
  Main: undefined;
  ComplexDetails: { complex: Complex };
  MatchDetails: { match: Match };
  CreateMatch: { complexId?: string };
};

export type AppStackNavigationProp<T extends keyof AppStackParamList> = 
  StackNavigationProp<AppStackParamList, T>;

export type AppStackScreenProps<T extends keyof AppStackParamList> = {
  navigation: AppStackNavigationProp<T>;
  route: RouteProp<AppStackParamList, T>;
}; 