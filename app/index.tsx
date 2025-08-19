import { Redirect } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function Index() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    if (isLoading) {
        return <View className="flex-1 items-center justify-center bg-slate-800">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    }

    return <Redirect href="/(tabs)" />;
}