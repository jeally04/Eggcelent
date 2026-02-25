import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('@eggcelent_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error reading stored auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    // Simulate API call — replace with real auth in production
    if (!email || !password) {
      throw new Error('Please fill in all fields.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const userData = {
      id: Date.now().toString(),
      email: email.toLowerCase().trim(),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      avatar: '🧑',
      phone: '',
      address: '',
      joinedDate: new Date().toISOString(),
    };

    await AsyncStorage.setItem('@eggcelent_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const register = async (name, email, password, phone) => {
    if (!name || !email || !password) {
      throw new Error('Please fill in all required fields.');
    }
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }
    if (!email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }

    const userData = {
      id: Date.now().toString(),
      email: email.toLowerCase().trim(),
      name: name.trim(),
      avatar: '🧑',
      phone: phone || '',
      address: '',
      joinedDate: new Date().toISOString(),
    };

    await AsyncStorage.setItem('@eggcelent_user', JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    return userData;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@eggcelent_user');
    await AsyncStorage.removeItem('@eggcelent_orders');
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (updates) => {
    const updated = { ...user, ...updates };
    await AsyncStorage.setItem('@eggcelent_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};

export default AuthContext;
