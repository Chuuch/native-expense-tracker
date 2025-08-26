import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleContinue = () => {
    router.push('/(onboarding)');
  };

  return (
    <View className="flex-1 bg-stone-950">
      {/* Header */}
      <View className="flex-1 justify-center items-center px-8">
        {/* App Icon */}
        <View className="mb-8">
          <View className="bg-[#CBFD03] p-6 rounded-3xl mb-6">
            <Feather name="dollar-sign" size={80} color="#000" />
          </View>
        </View>

        {/* Welcome Text */}
        <Text className="text-white text-4xl font-bold text-center mb-6">
          Welcome to
        </Text>
        <Text className="text-[#CBFD03] text-5xl font-bold text-center mb-8">
          MoneyMate
        </Text>

        {/* Subtitle */}
        <Text className="text-gray-400 text-xl text-center leading-8 px-4">
          Your personal finance companion that helps you track expenses, save money, and achieve your financial goals
        </Text>
      </View>

      {/* Bottom Section */}
      <View className="px-8 pb-16">
        {/* Continue Button */}
        <TouchableOpacity
          className="bg-[#CBFD03] rounded-xl py-5 items-center mb-4"
          onPress={handleContinue}
        >
          <Text className="text-black text-xl font-bold">
            Continue
          </Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity
          className="items-center"
          onPress={() => router.replace('/login')}
        >
          <Text className="text-gray-500 text-base">
            I&apos;ll set this up later
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
