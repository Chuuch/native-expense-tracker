import signup from '@/assets/lottie/signup.json';
import RegisterForm from '@/components/RegisterForm';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
export default function RegisterScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ScrollView 
      className={`flex-1 ${colors.background}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className={`flex-1 ${colors.background} p-6 justify-center mt-20`}>
        {/* Header */}
        <View className='items-center mb-8'>
          <LottieView source={signup} autoPlay loop style={{ width: 200, height: 200 }} />
          <Text className={`${colors.text} text-4xl font-bold mb-2`}>Create Account</Text>
          <Text className={`${colors.textSecondary} text-lg text-center`}>
            Join us to start your financial journey
          </Text>
        </View>

        {/* Registration Form */}
        <RegisterForm />

        {/* Sign In Link */}
        <View className='flex-row justify-center items-center'>
          <Text className={`${colors.textSecondary} text-base`}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className={`${colors.text} text-base font-semibold`}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Skip to App (for testing) */}
        <TouchableOpacity 
          className={`mt-6 ${colors.cardSecondary} rounded-xl p-4 items-center`}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className={`${colors.textSecondary} text-sm`}>Skip to App</Text>
        </TouchableOpacity>

        {/* Test Verify Screen (for testing) */}
        <TouchableOpacity 
          className={`mt-4 ${colors.cardSecondary} rounded-xl p-4 items-center mb-20`}
          onPress={() => router.push('/verify')}
        >
          <Text className={`${colors.textSecondary} text-sm`}>Test Verify Screen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}