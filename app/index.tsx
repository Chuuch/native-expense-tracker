import { userAPI } from "@/lib/api";
import { clearAllQueries, queryKeys } from "@/lib/queryClient";
import { getHasSeenOnboarding } from "@/stores/appStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
  const queryClient = useQueryClient();
  const [booting, setBooting] = useState<boolean>(true);

  useEffect(() => {
    let cancelled = false;

    async function boot() {
      try {
        const [hasSeenOnboarding, accessToken] = await Promise.all([
          getHasSeenOnboarding(),
          AsyncStorage.getItem('accessToken'),
        ]);

        if (accessToken) {
          try {
            await queryClient.fetchQuery({
              queryKey: queryKeys.auth.profile,
              queryFn: userAPI.getProfile,
            });
            if (!cancelled) router.replace('/(tabs)');
            return;
          } catch (error) {
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
            clearAllQueries();
          }
        }

        if (!cancelled) {
          router.replace(hasSeenOnboarding ? '/(auth)/login' : '/welcome');
        }
      } finally {
        if (!cancelled) setBooting(false);
      }
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [queryClient]);

    if (booting) {
        return <View className="flex-1 items-center justify-center bg-slate-800">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    }

    return <View className="flex-1 bg-slate-800" />;
}