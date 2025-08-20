import { Stack } from 'expo-router';
import React from 'react';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="notification-settings" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="darkMode" />
      <Stack.Screen name="currency" />
      <Stack.Screen name="language" />
      <Stack.Screen name="support" />
      <Stack.Screen name="feedback" />
      <Stack.Screen name="rate" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="privacyPolicy" />
      <Stack.Screen name="application" />
    </Stack>
  );
}
