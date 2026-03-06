import security from '@/assets/lottie/security.json';
import LoginForm from '@/components/LoginForm';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <ScrollView
      className={`flex-1 ${colors.background}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className={`flex-1 ${colors.background} p-6 justify-center mt-20`}>
        {/* Header */}
        <View className='items-center mb-12'>

            <LottieView source={security} autoPlay loop style={{ width: 200, height: 200 }} />

          <Text className={`${colors.text} text-4xl font-bold mb-2`}>Welcome Back</Text>
          <Text className={`${colors.textSecondary} text-lg text-center`}>
            Sign in to continue managing your finances
          </Text>
        </View>

        {/* Login Form */}
        <LoginForm />

        {/* Sign Up Link */}
        <View className='flex-row justify-center items-center'>
          <Text className={`${colors.textSecondary} text-base`}>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className={`${colors.text} text-base font-semibold`}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}