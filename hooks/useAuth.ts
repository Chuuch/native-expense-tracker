import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as AuthSession from 'expo-auth-session';
import * as LocalAuthentication from 'expo-local-authentication';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { API_BASE_URL, authAPI, userAPI } from '../lib/api';
import { clearAllQueries, queryKeys } from '../lib/queryClient';
import {
  clearAuthStorage,
  getRefreshToken,
  isBiometricEnabled,
  saveRefreshToken,
  setBiometricEnabled,
} from '../stores/authStore';

export function useAuth() {
  const queryClient = useQueryClient();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [isLoadingBiometric, setIsLoadingBiometric] = useState<boolean>(false);

  const {
    data: user,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: userAPI.getProfile,
    enabled: false, 
  });

  const setTokensAndNavigate = async (accessToken: string, refreshToken: string) => {
    await AsyncStorage.setItem('accessToken', accessToken);
    await AsyncStorage.setItem('refreshToken', refreshToken);
    await saveRefreshToken(refreshToken);
    await queryClient.fetchQuery({
      queryKey: queryKeys.auth.profile,
      queryFn: userAPI.getProfile,
    });
    router.replace('/(tabs)');
  }


  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      authAPI.login(email, password),
    onSuccess: async (data) => {
      if (!data || !data.accessToken || !data.refreshToken) {
        console.error('Login response missing required fields:', data);
        throw new Error('Invalid login response from server');
      }
      
      await setTokensAndNavigate(data.accessToken, data.refreshToken);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: any) => authAPI.register(userData),
    onSuccess: async () => {
      //
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: async () => {
      await clearAuthStorage();
      clearAllQueries();
      router.replace('/(auth)/login');
    },
    onError: async (error) => {
      console.error('Logout failed:', error);
      await clearAuthStorage();
      clearAllQueries();
      router.replace('/(auth)/login');
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(queryKeys.auth.profile, updatedUser);
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });

  const isAuthenticated = !!user;

  const login = async (email: string, password: string, enableBiometrics?: boolean) => {
    const data = await loginMutation.mutateAsync({ email, password });

    if (enableBiometrics) {
      try {
        const supported = await LocalAuthentication.hasHardwareAsync();
        const enrolled = supported && (await LocalAuthentication.isEnrolledAsync());

        if (!enrolled) {
          Alert.alert(
            'Biometrics not available',
            'Device does not support or have biometrics enrolled.'
          );
          await setBiometricEnabled(false);
        } else {
          await setBiometricEnabled(true);
        }
      } catch (error) {
        console.error('Failed to enable biometrics:', error);
        Alert.alert('Error', 'Failed to enable biometric authentication.');
      }
    }

    return data;
  };

  const register = async (userData: any) => {
    return registerMutation.mutateAsync(userData);
  };

  const logout = async () => {
    return logoutMutation.mutateAsync();
  };

  const updateProfile = async (updates: any) => {
    return updateProfileMutation.mutateAsync(updates);
  };

  const loginWithBiometrics = async () => {
    setIsLoadingBiometric(true);
    try {
      const enabled = await isBiometricEnabled();
      const refreshToken = await getRefreshToken();
      if (!enabled || !refreshToken) {
        Alert.alert(
          'Biometric sign-in not set up',
          'Sign in with email and turn on "Use Face ID / fingerprint next time" to use this option.'
        );
        return;
      }
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Sign in with biometrics',
        cancelLabel: 'Cancel',
      });
      if (!result.success) {
        if (result.error !== 'user_cancel') {
          Alert.alert('Biometric sign-in failed', 'Please try again or sign in with email.');
        }
        return;
      }
      const data = await authAPI.refreshToken(refreshToken);
      const accessToken = (data as { accessToken: string }).accessToken;
      if (!accessToken) {
        Alert.alert('Session expired', 'Please sign in with email and password.');
        return;
      }
      await setTokensAndNavigate(accessToken, refreshToken);
    } catch (error) {
      console.error('Biometric login failed:', error);
      Alert.alert('Error', 'Sign-in failed. Please try again or use email and password.');
    } finally {
      setIsLoadingBiometric(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoadingGoogle(true);
    try {
      const redirectUri = AuthSession.makeRedirectUri({
        scheme: 'nativeexpensetracker',
        path: 'redirect',
      });
      const authUrl = `${API_BASE_URL}/auth/google?redirect_uri=${encodeURIComponent(redirectUri)}`;
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
      if (result.type === 'success' && result.url) {
        const url = new URL(result.url);
        const accessToken = url.searchParams.get('accessToken');
        const refreshToken = url.searchParams.get('refreshToken');
        if (accessToken && refreshToken) {
          await setTokensAndNavigate(accessToken, refreshToken);
        } else {
          Alert.alert('Error', 'Google sign-in failed. Missing tokens.');
        }
      }
    } catch (error) {
      console.error('Google sign-in failed:', error);
      Alert.alert('Error', 'Google sign-in failed. Please try again.');
    } finally {
      setIsLoadingGoogle(false);
    }
  }

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        try {
          await queryClient.fetchQuery({
            queryKey: queryKeys.auth.profile,
            queryFn: userAPI.getProfile,
          });
        } catch (error) {
          console.error('Token is invalid, clearing it', error);
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
          clearAllQueries();
        }
      }
    };

    checkAuth();
  }, [queryClient]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoadingProfile || loginMutation.isPending || registerMutation.isPending,
    isLoadingProfile,
    isLoadingLogin: loginMutation.isPending,
    isLoadingRegister: registerMutation.isPending,
    isLoadingLogout: logoutMutation.isPending,
    isLoadingUpdateProfile: updateProfileMutation.isPending,
    isLoadingGoogle,
    isLoadingBiometric,
    error: profileError || loginMutation.error || registerMutation.error,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    profileError,
    
    login,
    register,
    logout,
    updateProfile,
    
    loginMutation,
    registerMutation,
    logoutMutation,
    updateProfileMutation,
    loginWithBiometrics,
    loginWithGoogle,
  };
}
