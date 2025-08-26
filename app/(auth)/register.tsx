import RegisterForm from '@/components/RegisterForm';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <ScrollView 
      className='flex-1 bg-stone-950'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className='flex-1 bg-stone-950 p-6 justify-center mt-20'>
        {/* Header */}
        <View className='items-center mb-8'>
          <View className='bg-[#CBFD03] rounded-full p-6 mb-6'>
            <Feather name="user-plus" size={60} color="black" />
          </View>
          <Text className='text-white text-4xl font-bold mb-2'>Create Account</Text>
          <Text className='text-gray-400 text-lg text-center'>
            Join us to start your financial journey
          </Text>
        </View>

        {/* Registration Form */}
        <RegisterForm />

        {/* Sign In Link */}
        <View className='flex-row justify-center items-center'>
          <Text className='text-gray-400 text-base'>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className='text-[#CBFD03] text-base font-semibold'>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Skip to App (for testing) */}
        <TouchableOpacity 
          className='mt-6 bg-stone-800 rounded-xl p-4 items-center'
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className='text-gray-400 text-sm'>Skip to App</Text>
        </TouchableOpacity>

        {/* Test Verify Screen (for testing) */}
        <TouchableOpacity 
          className='mt-4 bg-stone-800 rounded-xl p-4 items-center'
          onPress={() => router.push('/verify')}
        >
          <Text className='text-gray-400 text-sm'>Test Verify Screen</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}