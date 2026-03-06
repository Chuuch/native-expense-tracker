import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { API_BASE_URL, authAPI, userAPI } from '../lib/api';
import { clearAllQueries, queryKeys } from '../lib/queryClient';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Alert } from 'react-native';

export function useAuth() {
  const queryClient = useQueryClient();
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);

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
      if (!data || !data.access_token || !data.refresh_token) {
        console.error('Login response missing required fields:', data);
        throw new Error('Invalid login response from server');
      }
      
      await setTokensAndNavigate(data.access_token, data.refresh_token);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: any) => authAPI.register(userData),
    onSuccess: async (data) => {
      router.replace('/(auth)/verify');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: async () => {
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      clearAllQueries();
      router.replace('/(auth)/login');
    },
    onError: async (error) => {
      console.error('Logout failed:', error);
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
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

  const login = async (email: string, password: string) => {
    return loginMutation.mutateAsync({ email, password });
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
        const accessToken = url.searchParams.get('access_token');
        const refreshToken = url.searchParams.get('refresh_token');
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
    loginWithGoogle,
  };
}
