import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function GetStartedScreen() {
  const router = useRouter();
  const { user, completeOnboarding } = useAuth();

  const features = [
    {
      icon: Feather,
      iconName: 'shield' as const,
      title: 'Secure & Private',
      description: 'Your financial data is encrypted and stored securely'
    },
    {
      icon: Ionicons,
      iconName: 'sync' as const,
      title: 'Sync Across Devices',
      description: 'Access your data from anywhere, anytime'
    },
    {
      icon: Feather,
      iconName: 'trending-up' as const,
      title: 'Smart Insights',
      description: 'AI-powered recommendations to improve your finances'
    }
  ];

  const handleGetStarted = () => {
    if (user) {
      // User is already authenticated, complete onboarding and go to main app
      completeOnboarding();
      router.replace('/(tabs)');
    } else {
      // User is not authenticated, go to registration
      router.replace('/register');
    }
  };

  const handleSignIn = () => {
    router.replace('/login');
  };

  return (
    <View className="flex-1 bg-stone-950">
      <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }}>
        {/* Header */}
        <View className="px-8 pt-20 pb-12">
          <Text className="text-white text-4xl font-bold text-center mb-4">
            Ready to Start?
          </Text>
          <Text className="text-gray-400 text-lg text-center leading-7">
            Join thousands of users who are already taking control of their finances
          </Text>
        </View>

        {/* Features */}
        <View className="px-8 flex-1">
          {features.map((feature, index) => (
            <View key={index} className="flex-row items-center mb-8 bg-stone-900 p-6 rounded-2xl">
              <View className="bg-[#CBFD03] p-3 rounded-xl mr-4">
                <feature.icon 
                  name={feature.iconName as any} 
                  size={24} 
                  color="#000" 
                />
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold mb-2">
                  {feature.title}
                </Text>
                <Text className="text-gray-400 text-base leading-6">
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Action Buttons */}
        <View className="px-8 pb-16">
          <TouchableOpacity
            className="bg-[#CBFD03] rounded-xl py-4 items-center mb-4"
            onPress={handleGetStarted}
          >
            <Text className="text-black text-lg font-semibold">
              {user ? 'Get Started' : 'Create Account'}
            </Text>
          </TouchableOpacity>

          {!user && (
            <TouchableOpacity
              className="bg-transparent border border-stone-700 rounded-xl py-4 items-center"
              onPress={handleSignIn}
            >
              <Text className="text-white text-lg font-semibold">
                I already have an account
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
