import LoginForm from '@/components/LoginForm';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
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
            <MaterialCommunityIcons name="hand-wave-outline" size={60} color="black" />
          </View>
          <Text className='text-white text-4xl font-bold mb-2'>Welcome Back</Text>
          <Text className='text-gray-400 text-lg text-center'>
            Sign in to continue managing your finances
          </Text>
        </View>

        {/* Login Form */}
        <LoginForm />

        {/* Sign Up Link */}
        <View className='flex-row justify-center items-center'>
          <Text className='text-gray-400 text-base'>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className='text-[#CBFD03] text-base font-semibold'>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}