import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Complex = {
  id: string;
  name: string;
  city: string;
  distance: number;
  address?: string;
  image?: string;
};

type FavoritesContextData = {
  favorites: Complex[];
  addFavorite: (complex: Complex) => Promise<void>;
  removeFavorite: (complexId: string) => Promise<void>;
  isFavorite: (complexId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextData>({} as FavoritesContextData);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Complex[]>([]);

  useEffect(() => {
    // Load stored favorites on app initialization
    async function loadStoredFavorites() {
      const storedFavorites = await AsyncStorage.getItem('@BeexSports:favorites');
      
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    }

    loadStoredFavorites();
  }, []);

  const addFavorite = async (complex: Complex): Promise<void> => {
    const updatedFavorites = [...favorites, complex];
    
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('@BeexSports:favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = async (complexId: string): Promise<void> => {
    const updatedFavorites = favorites.filter(complex => complex.id !== complexId);
    
    setFavorites(updatedFavorites);
    await AsyncStorage.setItem('@BeexSports:favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = (complexId: string): boolean => {
    return favorites.some(complex => complex.id === complexId);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites(): FavoritesContextData {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }

  return context;
} 