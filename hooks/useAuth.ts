import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { authAPI, userAPI } from '../lib/api';
import { clearAllQueries, queryKeys } from '../lib/queryClient';

export function useAuth() {
  const queryClient = useQueryClient();

  // Get user profile
  const {
    data: user,
    isLoading: isLoadingProfile,
    error: profileError,
  } = useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: userAPI.getProfile,
    enabled: false, // Don't auto-fetch, we'll fetch manually after login
  });

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => 
      authAPI.login(email, password),
    onSuccess: async (data) => {
      // Store tokens
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      
      // Fetch user profile
      await queryClient.fetchQuery({
        queryKey: queryKeys.auth.profile,
        queryFn: userAPI.getProfile,
      });
      
      // Navigate to main app
      router.replace('/(tabs)');
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (userData: any) => authAPI.register(userData),
    onSuccess: async (data) => {
      // Store tokens
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      
      // Fetch user profile
      await queryClient.fetchQuery({
        queryKey: queryKeys.auth.profile,
        queryFn: userAPI.getProfile,
      });
      
      // Navigate to main app
      router.replace('/(tabs)');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authAPI.logout,
    onSuccess: async () => {
      // Clear tokens
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      
      // Clear all queries
      clearAllQueries();
      
      // Navigate to auth
      router.replace('/(auth)/login');
    },
    onError: async (error) => {
      console.error('Logout failed:', error);
      // Even if logout fails on server, clear local state
      await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
      clearAllQueries();
      router.replace('/(auth)/login');
    },
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: userAPI.updateProfile,
    onSuccess: (updatedUser) => {
      // Update the profile in cache
      queryClient.setQueryData(queryKeys.auth.profile, updatedUser);
    },
    onError: (error) => {
      console.error('Profile update failed:', error);
    },
  });

  // Check if user is authenticated
  const isAuthenticated = !!user;

  // Login function
  const login = async (email: string, password: string) => {
    return loginMutation.mutateAsync({ email, password });
  };

  // Register function
  const register = async (userData: any) => {
    return registerMutation.mutateAsync(userData);
  };

  // Logout function
  const logout = async () => {
    return logoutMutation.mutateAsync();
  };

  // Update profile function
  const updateProfile = async (updates: any) => {
    return updateProfileMutation.mutateAsync(updates);
  };

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        // Try to fetch profile to validate token
        try {
          await queryClient.fetchQuery({
            queryKey: queryKeys.auth.profile,
            queryFn: userAPI.getProfile,
          });
        } catch (error) {
          console.error('Token is invalid, clearing it', error);
          // Token is invalid, clear it
          await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
          clearAllQueries();
        }
      }
    };

    checkAuth();
  }, [queryClient]);

  return {
    // State
    user,
    isAuthenticated,
    isLoading: isLoadingProfile || loginMutation.isPending || registerMutation.isPending,
    isLoadingProfile,
    isLoadingLogin: loginMutation.isPending,
    isLoadingRegister: registerMutation.isPending,
    isLoadingLogout: logoutMutation.isPending,
    isLoadingUpdateProfile: updateProfileMutation.isPending,
    
    // Errors
    error: profileError || loginMutation.error || registerMutation.error,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
    profileError,
    
    // Actions
    login,
    register,
    logout,
    updateProfile,
    
    // Mutations (for advanced usage)
    loginMutation,
    registerMutation,
    logoutMutation,
    updateProfileMutation,
  };
}
