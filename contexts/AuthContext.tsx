import { authAPI, User, userAPI } from '@/lib/api';
import * as LocalAuthentication from 'expo-local-authentication';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { clearAuthStorage, getAccessToken, getRefreshToken, isBiometricEnabled, saveAccessToken, saveRefreshToken, setBiometricEnabled } from '../stores/authStore';

interface AuthContextValue {
    user: User | null;
    accessToken: string | null;
    loading: boolean;
    login: (email: string, password: string, enableBiometrics?: boolean) => Promise<void>;
    logout: () => Promise<void>;
    refreshSession: () => Promise<boolean>;
    enableBiometrics: () => Promise<void>;
    disableBiometrics: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return ctx;
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const storedAccessToken = await getAccessToken();
                const biometricsOn = await isBiometricEnabled();
                const storedRefreshToken = await getRefreshToken();

                if (storedAccessToken) {
                    setAccessToken(storedAccessToken);
                    const profile = await userAPI.getProfile();
                    setUser(profile);
                    setLoading(false);
                } else if (biometricsOn && storedRefreshToken) {
                    const result = await LocalAuthentication.authenticateAsync({
                        promptMessage: 'Unlock to continue',
                        cancelLabel: 'Use password',
                    });

                    if (result.success) {
                        const ok = await doRefresh(storedRefreshToken);
                        if (!ok) {
                            await clearAuthStorage();
                        }
                    }
                }
            } catch (error) {
                console.warn("Error bootstrapping auth:", error)
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const doRefresh = async (refreshToken: string): Promise<boolean> => {
        try {
            const response = await authAPI.refreshToken(refreshToken);
            const newAccessToken = (response as any).accessToken;
            if (!newAccessToken) throw new Error('No access token from refresh response');

            await saveAccessToken(newAccessToken)
            setAccessToken(newAccessToken);
            return true;
        } catch (error) {
            console.warn("Failed to refresh access token:", error);
            return false;
        }
    };

    const login: AuthContextValue['login'] = async (email, password, enableBiometrics = false) => {
        const response = await authAPI.login(email, password) as any;
        const { user: loggedInUser, accessToken, refreshToken } = response;

        setUser(loggedInUser);
        setAccessToken(accessToken)
        await saveAccessToken(accessToken);
        await saveRefreshToken(refreshToken);

        if (enableBiometrics) {
            const supported = await LocalAuthentication.hasHardwareAsync();
            const enrolled = await supported && (await LocalAuthentication.isEnrolledAsync());

            if (!enrolled) {
                Alert.alert('Biometrics not available', 'Device does not support biometric authentication');
                await setBiometricEnabled(false);
            } else {
                await setBiometricEnabled(true);
            }
        }
    };

    const logout = async () => {
        try {
            await authAPI.logout();
        } catch (error) {
            console.warn('Logout request failed (ignored):', error);
        } finally {
            setUser(null);
            setAccessToken(null);
            await clearAuthStorage();
        }
    };

    const refreshSession = async () => {
        const token = await getAccessToken();
        if (!token) return false;
        const ok = await doRefresh(token);
        if (!ok) {
            await clearAuthStorage();
            setUser(null);
            setAccessToken(null);
        }
        return ok;
    }

    const enableBiometrics = async () => {
        const supported = await LocalAuthentication.hasHardwareAsync();
        const enrolled = supported && (await LocalAuthentication.isEnrolledAsync());

        if (!enrolled) {
            Alert.alert('Biometrics not available', 'Device does not support biometric authentication');
            return;
        }

        await setBiometricEnabled(true);
        Alert.alert('Biometrics enabled', 'You can now use biometrics yo unlock your account.');
    };

    const disableBiometrics = async () => {
        await setBiometricEnabled(false);
        Alert.alert('Biometrics disabled', 'You will need to log in with email and password');
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                accessToken,
                loading,
                login,
                logout,
                refreshSession,
                enableBiometrics,
                disableBiometrics
            }}>
            {children}
        </AuthContext.Provider>
    )
}