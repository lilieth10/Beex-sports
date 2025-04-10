import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { AppStackParamList } from './types';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import ComplexDetailsScreen from '../screens/ComplexDetailsScreen';
import MatchDetailsScreen from '../screens/MatchDetailsScreen';
import CreateMatchScreen from '../screens/CreateMatchScreen';

const Stack = createStackNavigator<AppStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  // Show loading screen if still determining authentication state
  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} />
            <Stack.Screen 
              name="ComplexDetails" 
              component={ComplexDetailsScreen} 
              options={{
                headerShown: true,
                title: 'Detalles del Complejo',
              }}
            />
            <Stack.Screen 
              name="MatchDetails" 
              component={MatchDetailsScreen} 
              options={{
                headerShown: true,
                title: 'Detalles del Partido',
              }}
            />
            <Stack.Screen 
              name="CreateMatch" 
              component={CreateMatchScreen} 
              options={{
                headerShown: true,
                title: 'Crear Partido',
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 