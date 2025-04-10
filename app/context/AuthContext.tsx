import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type User = {
  id: string;
  email: string;
  name: string;
  city?: string;
  level?: 'novato' | 'intermedio' | 'avanzado';
  profileCompleted: number;
};

type AuthContextData = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
  calculateProfileCompletion: (user: User) => number;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load stored user on app initialization
    async function loadStoredData() {
      const storedUser = await AsyncStorage.getItem('@BeexSports:user');
      
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      setLoading(false);
    }

    loadStoredData();
  }, []);

  const calculateProfileCompletion = (userData: User): number => {
    const requiredFields = ['name', 'email', 'city', 'level'];
    const totalFields = requiredFields.length;
    const completedFields = requiredFields.filter(field => !!userData[field as keyof User]).length;
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const updateUser = async (userData: Partial<User>): Promise<void> => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      ...userData,
    };
    
    updatedUser.profileCompleted = calculateProfileCompletion(updatedUser);
    
    setUser(updatedUser);
    await AsyncStorage.setItem('@BeexSports:user', JSON.stringify(updatedUser));
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    // In a real app, this would call an API
    // For this demo, we'll simulate a login process
    
    // Check if user exists in AsyncStorage
    const storedUser = await AsyncStorage.getItem('@BeexSports:user');
    
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email) {
        setUser(parsedUser);
        return;
      }
    }
    
    // For demo purposes, create a new user if not found
    const newUser = {
      id: String(Date.now()),
      email,
      name: email.split('@')[0],
      profileCompleted: 50,
    };
    
    setUser(newUser);
    await AsyncStorage.setItem('@BeexSports:user', JSON.stringify(newUser));
  };

  const signUp = async (name: string, email: string, password: string): Promise<void> => {
    // Create a new user
    const newUser = {
      id: String(Date.now()),
      name,
      email,
      profileCompleted: 50,
    };
    
    newUser.profileCompleted = calculateProfileCompletion(newUser as User);
    
    setUser(newUser as User);
    await AsyncStorage.setItem('@BeexSports:user', JSON.stringify(newUser));
  };

  const signOut = async (): Promise<void> => {
    await AsyncStorage.removeItem('@BeexSports:user');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
        updateUser,
        calculateProfileCompletion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
} 