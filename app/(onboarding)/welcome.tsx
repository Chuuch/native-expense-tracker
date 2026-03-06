import welcomeOne from '@/assets/lottie/welcome_one.json';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const handleContinue = () => {
    router.push('/(onboarding)');
  };

  return (
    <View className={`flex-1 ${colors.background}`}>
      {/* Header */}
      <View className="flex-1 justify-center items-center px-8">
        {/* App Icon */}
        <View className="">
            <LottieView source={welcomeOne} autoPlay loop style={{ width: 300, height: 300 }} />
        </View>

        {/* Welcome Text */}
        <Text className={`${colors.text} text-4xl font-bold text-center mb-2`}>
          Welcome to
        </Text>
        <Text className={`text-indigo-500 text-5xl font-bold text-center mb-2`}>
          MoneyMate
        </Text>

        {/* Subtitle */}
        <Text className={`${colors.textSecondary} text-xl text-center leading-8 px-4`}>
          Your personal finance companion that helps you track expenses, save money, and achieve your financial goals
        </Text>
      </View>

      {/* Bottom Section */}
      <View className="px-8 pb-32">
        {/* Continue Button */}
        <TouchableOpacity
          className={`${colors.accent} rounded-xl py-5 items-center mb-4`}
          onPress={handleContinue}
        >
          <Text className={`${colors.text} text-xl font-bold`}>
            Continue
          </Text>
        </TouchableOpacity>

        {/* Skip Option */}
        <TouchableOpacity
          className="items-center"
          onPress={() => router.replace('/login')}
        >
          <Text className={`${colors.textSecondary} text-base font-semibold`}>
            I&apos;ll set this up later
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
