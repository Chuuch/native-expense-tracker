import { supabase } from "@/lib/supabase";
import { Redirect } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default async function Index() {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        return (
            <View className="flex-1 items-center justify-center bg-slate-800">
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        );
    }

    // If user is authenticated, redirect to main app
    if (session) {
        return <Redirect href="/(tabs)" />;
    }

    // If no user, redirect to onboarding
    return <Redirect href="/(onboarding)/welcome" />;
}