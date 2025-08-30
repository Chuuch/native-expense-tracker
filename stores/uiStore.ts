import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface UIState {
  // Theme and appearance
  isDarkMode: boolean;
  
  // Navigation state
  currentTab: string;
  
  // UI preferences
  showNotifications: boolean;
  hapticFeedback: boolean;
  
  // App state
  hasCompletedOnboarding: boolean;
  lastSyncTimestamp: number | null;
}

export interface UIActions {
  // Theme actions
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
  
  // Navigation actions
  setCurrentTab: (tab: string) => void;
  
  // Preference actions
  toggleNotifications: () => void;
  setHapticFeedback: (enabled: boolean) => void;
  
  // App state actions
  completeOnboarding: () => void;
  setLastSync: (timestamp: number) => void;
}

export type UIStore = UIState & UIActions;

export const useUIStore = create<UIStore>()(
  persist(
    (set, get) => ({
      // Initial state
      isDarkMode: true, // Default to dark mode
      currentTab: 'index',
      showNotifications: true,
      hapticFeedback: true,
      hasCompletedOnboarding: false,
      lastSyncTimestamp: null,

      // Theme actions
      toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setDarkMode: (isDark) => set({ isDarkMode: isDark }),

      // Navigation actions
      setCurrentTab: (tab) => set({ currentTab: tab }),

      // Preference actions
      toggleNotifications: () => set((state) => ({ showNotifications: !state.showNotifications })),
      setHapticFeedback: (enabled) => set({ hapticFeedback: enabled }),

      // App state actions
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      setLastSync: (timestamp) => set({ lastSyncTimestamp: timestamp }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        isDarkMode: state.isDarkMode,
        showNotifications: state.showNotifications,
        hapticFeedback: state.hapticFeedback,
        hasCompletedOnboarding: state.hasCompletedOnboarding,
        lastSyncTimestamp: state.lastSyncTimestamp,
      }),
    }
  )
);
