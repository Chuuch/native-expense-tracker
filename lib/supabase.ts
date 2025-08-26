import { createClient } from "@supabase/supabase-js";
import * as SecureStore from 'expo-secure-store';
import { AppState, Platform } from "react-native";

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItem(key);
    },

    setItem: (key: string, value: string) => {
        return SecureStore.setItem(key, value);
    },
    
    removeItem: (key: string) => {
        return SecureStore.deleteItemAsync(key);
    },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: ExpoSecureStoreAdapter,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    },
});

if (Platform.OS !== 'web') {
    AppState.addEventListener('change', (state) => {
        if (state === 'active') {
            supabase.auth.startAutoRefresh();
        } else {
            supabase.auth.stopAutoRefresh();
        }
    })
}