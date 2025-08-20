import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 40,
          height: 60,
          marginHorizontal: 20,
          backgroundColor: '#0c0a09',
          borderRadius: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
          borderTopWidth: 0,
          overflow: 'hidden',
        },
        tabBarBackground: () => (
          <BlurView 
            intensity={20} 
            tint="light"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          />
        ),
        tabBarActiveTintColor: '#CBFD03',
        tabBarInactiveTintColor: '#6b7280',
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
