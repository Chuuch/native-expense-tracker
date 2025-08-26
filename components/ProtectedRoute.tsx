import { supabase } from '@/lib/supabase';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default async function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { data: { session } } = await supabase.auth.getSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      // Redirect to login if not authenticated
      router.replace('/(auth)/login');
    }
  }, [session, router]);

  if (!session) {
    return (
      <View className="flex-1 items-center justify-center bg-slate-800">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return <>{children}</>;
}
