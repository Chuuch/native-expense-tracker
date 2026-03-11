import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/hooks';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabLayout() {
  const { colors, tint } = useTheme();
  const { isLoadingProfile, user } = useAuth();

  if (isLoadingProfile) {
    return <View style={{ flex: 1, backgroundColor: '#0c0a09'}}/>
  }

  if (!user) {
    return <Redirect href='/(auth)/login' />
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 80,
          backgroundColor: 'transparent',
        },
        tabBarBackground: () => (
          <View className={colors.tabBar} style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }} />
        ),
        tabBarActiveTintColor: tint.active,
        tabBarInactiveTintColor: tint.inactive,
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -4,
        },
        tabBarIconStyle: {
          marginTop: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <Feather name="bar-chart-2" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="transactions"
        options={{
          title: 'Transactions',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="swap" size={size} color={color} />
          ),
        }}
      />
        <Tabs.Screen
          name="analytics"
          options={{
            title: 'Analytics',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="pie-chart-outline" size={size} color={color} />
            ),
          }}
        />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}