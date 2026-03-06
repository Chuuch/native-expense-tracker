import main from '@/assets/lottie/main.json';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgottenPasswordScreen() {
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
        <View className='items-center mb-12'>
            <LottieView source={main} autoPlay loop style={{ width: 200, height: 200 }} />
          <Text className={`${colors.text} text-4xl font-bold mb-2`}>Reset Password</Text>
          <Text className={`${colors.textSecondary} text-lg text-center`}>
            Enter your email to receive reset instructions
          </Text>
        </View>

        {/* Reset Form */}
        <View className='mb-8'>
          {/* Email Input */}
          <View className='mb-6'>
            <Text className={`${colors.text} text-base font-semibold mb-3`}>Email Address</Text>
              <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
              <Feather name="mail" size={20} color="#615eff" />
              <TextInput
                className={`flex-1 ${colors.text} text-base ml-3`}
                placeholder="Enter your email address"
                placeholderTextColor="#615eff"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Instructions */}
          <View className={`${colors.cardSecondary} rounded-xl p-4 mb-8`}>
            <View className='flex-row items-start mb-3'>
              <Ionicons name="information-circle" size={20} color="#615eff" />
              <Text className={`${colors.text} text-base font-semibold ml-2`}>What happens next?</Text>
            </View>
            <Text className={`${colors.textSecondary} text-sm leading-5`}>
              We&apos;ll send you an email with a link to reset your password. The link will expire in 1 hour for security.
            </Text>
          </View>

          {/* Reset Button */}
          <TouchableOpacity className={`${colors.accent} rounded-xl p-4 items-center mb-6`}>
            <Text className={`${colors.text} text-lg font-semibold`}>Send Reset Link</Text>
          </TouchableOpacity>
        </View>

        {/* Alternative Recovery Options */}
        <View className='mb-8'>
          <View className='flex-row items-center mb-4'>
              <View className={`flex-1 h-px ${colors.cardSecondary}`} />
            <Text className={`${colors.textSecondary} text-sm mx-4`}>or try</Text>
            <View className={`flex-1 h-px ${colors.cardSecondary}`} />
          </View>

          <TouchableOpacity className={`${colors.cardSecondary} rounded-xl p-4 items-center`}>
            <View className='flex-row items-center'>
              <Feather name="message-circle" size={20} color="#615eff" />
              <Text className={`${colors.text} text-base font-semibold ml-3`}>
                Contact Support
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Security Tips */}
        <View className={`${colors.cardSecondary} rounded-xl p-4 mb-8`}>
          <View className='flex-row items-start mb-3'>
            <Feather name="shield" size={20} color="#615eff" />
            <Text className={`${colors.text} text-base font-semibold ml-2`}>Security Tips</Text>
          </View>
          <View className='space-y-2'>
            <Text className={`${colors.textSecondary} text-sm`}>• Use a strong, unique password</Text>
            <Text className={`${colors.textSecondary} text-sm`}>• Enable two-factor authentication</Text>
            <Text className={`${colors.textSecondary} text-sm`}>• Never share your password</Text>
            <Text className={`${colors.textSecondary} text-sm`}>• Check for suspicious activity</Text>
          </View>
        </View>

        {/* Back to Login */}
        <View className='flex-row justify-center items-center'>
          <Text className={`${colors.textSecondary} text-base`}>Remember your password? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className={`${colors.text} text-base font-semibold`}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Skip to App (for testing) */}
        <TouchableOpacity 
          className={`mt-8 ${colors.cardSecondary} rounded-xl p-4 items-center mb-20`}
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className={`${colors.textSecondary} text-sm`}>Skip to App</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
