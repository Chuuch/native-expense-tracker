import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';
const BIOMETRIC_ENABLED_KEY = 'biometricEnabled';

export async function saveAccessToken(token: string | null) {
    if (!token) {
        await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
        return;
    }
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken(): Promise<string | null> {
    return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function saveRefreshToken(token: string | null) {
    if (!token) {
        await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
        return;
    }
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token, {
        keychainService: REFRESH_TOKEN_KEY,
    });
}

export async function getRefreshToken(): Promise<string | null> {
    try {
        return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
    } catch (error) {
        return null;
    }
}

export async function setBiometricEnabled(enabled: boolean) {
    await SecureStore.setItemAsync(BIOMETRIC_ENABLED_KEY, enabled ? 'true' : 'false');
}

export async function isBiometricEnabled(): Promise<boolean> {
    const value = await SecureStore.getItemAsync(BIOMETRIC_ENABLED_KEY);
    return value === 'true';
}

export async function clearAuthStorage() {
    await Promise.all([
        saveAccessToken(null),
        saveRefreshToken(null),
        setBiometricEnabled(false),
    ])
}