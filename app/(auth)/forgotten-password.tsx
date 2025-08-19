import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ForgottenPasswordScreen() {
  const router = useRouter();

  return (
    <ScrollView 
      className='flex-1 bg-stone-950'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className='flex-1 bg-stone-950 p-6 justify-center mt-20'>
        {/* Header */}
        <View className='items-center mb-12'>
          <View className='bg-[#CBFD03] rounded-full p-6 mb-6'>
            <Feather name="key" size={60} color="black" />
          </View>
          <Text className='text-white text-4xl font-bold mb-2'>Reset Password</Text>
          <Text className='text-gray-400 text-lg text-center'>
            Enter your email to receive reset instructions
          </Text>
        </View>

        {/* Reset Form */}
        <View className='mb-8'>
          {/* Email Input */}
          <View className='mb-6'>
            <Text className='text-white text-base font-semibold mb-3'>Email Address</Text>
            <View className='bg-stone-800 rounded-xl p-4 flex-row items-center'>
              <Feather name="mail" size={20} color="#6b7280" />
              <TextInput
                className='flex-1 text-white text-base ml-3'
                placeholder="Enter your email address"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Instructions */}
          <View className='bg-stone-800 rounded-xl p-4 mb-8'>
            <View className='flex-row items-start mb-3'>
              <Ionicons name="information-circle" size={20} color="#CBFD03" />
              <Text className='text-white text-base font-semibold ml-2'>What happens next?</Text>
            </View>
            <Text className='text-gray-400 text-sm leading-5'>
              We'll send you an email with a link to reset your password. The link will expire in 1 hour for security.
            </Text>
          </View>

          {/* Reset Button */}
          <TouchableOpacity className='bg-[#CBFD03] rounded-xl p-4 items-center mb-6'>
            <Text className='text-black text-lg font-semibold'>Send Reset Link</Text>
          </TouchableOpacity>
        </View>

        {/* Alternative Recovery Options */}
        <View className='mb-8'>
          <View className='flex-row items-center mb-4'>
            <View className='flex-1 h-px bg-stone-700' />
            <Text className='text-gray-400 text-sm mx-4'>or try</Text>
            <View className='flex-1 h-px bg-stone-700' />
          </View>

          <TouchableOpacity className='bg-stone-800 rounded-xl p-4 items-center mb-4'>
            <View className='flex-row items-center'>
              <Feather name="smartphone" size={20} color="#CBFD03" />
              <Text className='text-white text-base font-semibold ml-3'>
                Reset via SMS
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className='bg-stone-800 rounded-xl p-4 items-center'>
            <View className='flex-row items-center'>
              <Feather name="message-circle" size={20} color="#CBFD03" />
              <Text className='text-white text-base font-semibold ml-3'>
                Contact Support
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Security Tips */}
        <View className='bg-stone-800 rounded-xl p-4 mb-8'>
          <View className='flex-row items-start mb-3'>
            <Feather name="shield" size={20} color="#CBFD03" />
            <Text className='text-white text-base font-semibold ml-2'>Security Tips</Text>
          </View>
          <View className='space-y-2'>
            <Text className='text-gray-400 text-sm'>• Use a strong, unique password</Text>
            <Text className='text-gray-400 text-sm'>• Enable two-factor authentication</Text>
            <Text className='text-gray-400 text-sm'>• Never share your password</Text>
            <Text className='text-gray-400 text-sm'>• Check for suspicious activity</Text>
          </View>
        </View>

        {/* Back to Login */}
        <View className='flex-row justify-center items-center'>
          <Text className='text-gray-400 text-base'>Remember your password? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className='text-[#CBFD03] text-base font-semibold'>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Skip to App (for testing) */}
        <TouchableOpacity 
          className='mt-8 bg-stone-800 rounded-xl p-4 items-center'
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className='text-gray-400 text-sm'>Skip to App</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
