import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import ProfileScreen from '../screens/ProfileScreen';
import ComplexesScreen from '../screens/ComplexesScreen';
import MatchesScreen from '../screens/MatchesScreen';
import MatchmakingScreen from '../screens/MatchmakingScreen';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0066CC',
        tabBarInactiveTintColor: '#777777',
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: true,
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      }}
    >
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          title: 'Mi Perfil',
          tabBarLabel: 'Perfil',
        }}
      />
      <Tab.Screen 
        name="Complexes" 
        component={ComplexesScreen} 
        options={{
          title: 'Complejos',
          tabBarLabel: 'Complejos',
        }}
      />
      <Tab.Screen 
        name="Matches" 
        component={MatchesScreen} 
        options={{
          title: 'Partidos',
          tabBarLabel: 'Partidos',
        }}
      />
      <Tab.Screen 
        name="Matchmaking" 
        component={MatchmakingScreen} 
        options={{
          title: 'Recomendados',
          tabBarLabel: 'Para ti',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default MainTabNavigator; 