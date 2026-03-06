import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native";

export type ThemeMode = "light" | "dark" | "auto" | "oled";

export interface ThemeColors {
  background: string;
  card: string;
  cardSecondary: string;
  text: string;
  textSecondary: string;
  accent: string;
  border: string;
  success: string;
  warning: string;
  error: string;
  /** Tab bar background (Tailwind class, e.g. bg-stone-800) */
  tabBar: string;
}

/** For style/icon props that require a color string (hex). Use colors.* for className. */
export interface ThemeTint {
  active: string;
  inactive: string;
  /** Hex for icon color etc. (matches colors.text) */
  text: string;
  /** Hex for secondary icon color (matches colors.textSecondary) */
  textSecondary: string;
  /** Hex for accent (matches colors.accent) */
  accent: string;
}

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  description: string;
  colors: ThemeColors;
  tint: ThemeTint;
}

const lightTheme: ThemeConfig = {
  id: "light",
  name: "Light Mode",
  description: "Clean light theme for daytime use",
  colors: {
    background: "bg-white",
    card: "bg-gray-100",
    cardSecondary: "bg-gray-200",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    accent: "bg-indigo-500",
    border: "border-gray-200",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    tabBar: "bg-gray-200",
  },
  tint: { active: "#6366f1", inactive: "#6b7280", text: "#111827", textSecondary: "#4b5563", accent: "#6366f1" },
};

const darkTheme: ThemeConfig = {
  id: "dark",
  name: "Dark Mode",
  description: "Classic dark theme with high contrast",
  colors: {
    background: "bg-stone-950",
    card: "bg-slate-800",
    cardSecondary: "bg-gray-900",
    text: "text-white",
    textSecondary: "text-gray-400",
    accent: "bg-indigo-500",
    border: "border-stone-700",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    tabBar: "bg-slate-800",
  },
  tint: { active: "#6366f1", inactive: "#a8a29e", text: "#fafafa", textSecondary: "#a8a29e", accent: "#6366f1" },
};

const oledTheme: ThemeConfig = {
  id: "oled",
  name: "OLED Black",
  description: "True black for OLED screens",
  colors: {
    background: "bg-black",
    card: "bg-gray-900",
    cardSecondary: "bg-gray-800",
    text: "text-white",
    textSecondary: "text-gray-400",
    accent: "bg-indigo-500",
    border: "border-gray-800",
    success: "bg-green-500",
    warning: "bg-yellow-500",
    error: "bg-red-500",
    tabBar: "bg-gray-900",
  },
  tint: { active: "#6366f1", inactive: "#a8a29e", text: "#fafafa", textSecondary: "#a8a29e", accent: "#6366f1" },
};

export const themes: ThemeConfig[] = [lightTheme, darkTheme, oledTheme];

interface ThemeContextType {
  currentTheme: ThemeConfig;
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  isDark: boolean;
  colors: ThemeColors;
  /** For style props that require a color string (e.g. tab bar tint). Prefer colors.* for className. */
  tint: ThemeTint;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("auto");
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig>(darkTheme);

  // Load saved theme preference
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update current theme when themeMode or system color scheme changes
  useEffect(() => {
    const updateCurrentTheme = () => {
      let effectiveTheme: ThemeConfig;

      if (themeMode === "auto") {
        effectiveTheme = systemColorScheme === "dark" ? darkTheme : lightTheme;
      } else if (themeMode === "light") {
        effectiveTheme = lightTheme;
      } else if (themeMode === "dark") {
        effectiveTheme = darkTheme;
      } else if (themeMode === "oled") {
        effectiveTheme = oledTheme;
      } else {
        effectiveTheme = darkTheme; // fallback
      }

      setCurrentTheme(effectiveTheme);
    };
    updateCurrentTheme();
  }, [themeMode, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      const savedTheme = SecureStore.getItem("themeMode");
      if (
        savedTheme &&
        ["light", "dark", "auto", "oled"].includes(savedTheme)
      ) {
        setThemeMode(savedTheme as ThemeMode);
      }
    } catch (error) {
      console.error("Failed to load theme preference:", error);
    }
  };

  const setThemeModeAndSave = async (mode: ThemeMode) => {
    try {
      SecureStore.setItem("themeMode", mode);
      setThemeMode(mode);
    } catch (error) {
      console.error("Failed to save theme preference:", error);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    themeMode,
    setThemeMode: setThemeModeAndSave,
    isDark: currentTheme.id === "dark" || currentTheme.id === "oled",
    colors: currentTheme.colors,
    tint: currentTheme.tint,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

