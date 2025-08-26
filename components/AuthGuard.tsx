import { useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, onboardingCompleted } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inOnboardingGroup = segments[0] === '(onboarding)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (!user && !inAuthGroup && !inOnboardingGroup) {
      // User is not signed in and not in auth/onboarding group, redirect to login
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // User is signed in and in auth group, check onboarding status
      if (onboardingCompleted) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(onboarding)');
      }
    } else if (user && inOnboardingGroup && onboardingCompleted) {
      // User is signed in, in onboarding, but has completed it, redirect to main app
      router.replace('/(tabs)');
    } else if (user && inTabsGroup && !onboardingCompleted) {
      // User is signed in, in tabs, but hasn't completed onboarding, redirect to onboarding
      router.replace('/(onboarding)');
    }
  }, [user, loading, onboardingCompleted, segments, router]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-stone-950">
        <Text className="text-white text-lg">Loading...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
