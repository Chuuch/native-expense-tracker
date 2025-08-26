import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View } from "react-native";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AuthGuard from "../components/AuthGuard";
import { AuthProvider } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import "../global.css";

function RootLayoutContent() {
  return (
    <AuthGuard>
      <View style={{ flex: 1, backgroundColor: '#0c0a09' }}>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} >
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(onboarding)" />
            <Stack.Screen name="(tabs)" />
          </Stack>
        </SafeAreaProvider>
      </View>
    </AuthGuard>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <ThemeProvider>
        <RootLayoutContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
