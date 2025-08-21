import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'auto' | 'oled';

export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  description: string;
  colors: ThemeColors;
}

const lightTheme: ThemeConfig = {
  id: 'light',
  name: 'Light Mode',
  description: 'Clean light theme for daytime use',
  colors: {
    background: 'bg-white',
    card: 'bg-gray-100',
    text: 'text-gray-900',
    textSecondary: 'text-gray-600',
    accent: 'bg-[#CBFD03]',
    border: 'border-gray-200',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  },
};

const darkTheme: ThemeConfig = {
  id: 'dark',
  name: 'Dark Mode',
  description: 'Classic dark theme with high contrast',
  colors: {
    background: 'bg-stone-950',
    card: 'bg-stone-800',
    text: 'text-white',
    textSecondary: 'text-gray-400',
    accent: 'bg-[#CBFD03]',
    border: 'border-stone-700',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  },
};

const oledTheme: ThemeConfig = {
  id: 'oled',
  name: 'OLED Black',
  description: 'True black for OLED screens',
  colors: {
    background: 'bg-black',
    card: 'bg-gray-900',
    text: 'text-white',
    textSecondary: 'text-gray-400',
    accent: 'bg-[#CBFD03]',
    border: 'border-gray-800',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  },
};

export const themes: ThemeConfig[] = [lightTheme, darkTheme, oledTheme];

interface ThemeContextType {
  currentTheme: ThemeConfig;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colors: ThemeColors;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('auto');
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(darkTheme);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update current theme when themeMode or system color scheme changes
  useEffect(() => {
    updateCurrentTheme();
  }, [themeMode, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await SecureStore.getItem('themeMode');
      if (savedTheme && ['light', 'dark', 'auto', 'oled'].includes(savedTheme)) {
        setThemeMode(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
    }
  };

  const updateCurrentTheme = () => {
    let effectiveTheme: ThemeConfig;

    if (themeMode === 'auto') {
      effectiveTheme = systemColorScheme === 'dark' ? darkTheme : lightTheme;
    } else if (themeMode === 'light') {
      effectiveTheme = lightTheme;
    } else if (themeMode === 'dark') {
      effectiveTheme = darkTheme;
    } else if (themeMode === 'oled') {
      effectiveTheme = oledTheme;
    } else {
      effectiveTheme = darkTheme; // fallback
    }

    setCurrentTheme(effectiveTheme);
  };

  const setThemeModeAndSave = async (mode: ThemeMode) => {
    try {
      await SecureStore.setItem('themeMode', mode);
      setThemeMode(mode);
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    themeMode,
    setThemeMode: setThemeModeAndSave,
    isDark: currentTheme.id === 'dark' || currentTheme.id === 'oled',
    colors: currentTheme.colors,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
