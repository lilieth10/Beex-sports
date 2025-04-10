import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import AppNavigator from '../navigation/AppNavigator';

export const AppProviders: React.FC = () => {
  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppNavigator />
      </FavoritesProvider>
    </AuthProvider>
  );
}; 