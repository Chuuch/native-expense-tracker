import { AntDesign, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

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
        <View className='mb-6'>
          {/* Full Name Input */}
          <View className='mb-4'>
            <Text className='text-white text-base font-semibold mb-2'>Full Name</Text>
            <View className='bg-stone-800 rounded-xl p-4 flex-row items-center'>
              <Feather name="user" size={20} color="#6b7280" />
              <TextInput
                className='flex-1 text-white text-base ml-3'
                placeholder="Enter your full name"
                placeholderTextColor="#6b7280"
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Email Input */}
          <View className='mb-4'>
            <Text className='text-white text-base font-semibold mb-2'>Email Address</Text>
            <View className='bg-stone-800 rounded-xl p-4 flex-row items-center'>
              <Feather name="mail" size={20} color="#6b7280" />
              <TextInput
                className='flex-1 text-white text-base ml-3'
                placeholder="Enter your email"
                placeholderTextColor="#6b7280"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Phone Input */}
          <View className='mb-4'>
            <Text className='text-white text-base font-semibold mb-2'>Phone Number</Text>
            <View className='bg-stone-800 rounded-xl p-4 flex-row items-center'>
              <Feather name="phone" size={20} color="#6b7280" />
              <TextInput
                className='flex-1 text-white text-base ml-3'
                placeholder="Enter your phone number"
                placeholderTextColor="#6b7280"
                keyboardType="phone-pad"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className='mb-4'>
            <Text className='text-white text-base font-semibold mb-2'>Password</Text>
            <View className='bg-stone-800 rounded-xl p-4 flex-row items-center'>
              <Feather name="lock" size={20} color="#6b7280" />
              <TextInput
                className='flex-1 text-white text-base ml-3'
                placeholder="Create a password"
                placeholderTextColor="#6b7280"
                secureTextEntry
              />
              <TouchableOpacity>
                <Feather name="eye" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password Input */}
          <View className='mb-6'>
            <Text className='text-white text-base font-semibold mb-2'>Confirm Password</Text>
            <View className='bg-stone-800 rounded-xl p-4 flex-row items-center'>
              <Feather name="lock" size={20} color="#6b7280" />
              <TextInput
                className='flex-1 text-white text-base ml-3'
                placeholder="Confirm your password"
                placeholderTextColor="#6b7280"
                secureTextEntry
              />
              <TouchableOpacity>
                <Feather name="eye" size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Terms and Conditions */}
          <View className='flex-row items-start mb-6'>
            <TouchableOpacity className='flex-row items-start'>
              <View className='w-5 h-5 bg-stone-700 rounded mr-3 mt-1'>
                <View className='w-5 h-5 bg-[#CBFD03] rounded' />
              </View>
              <View className='flex-1'>
                <Text className='text-gray-400 text-sm leading-5'>
                  I agree to the{' '}
                  <Text className='text-[#CBFD03] font-semibold'>Terms of Service</Text>
                  {' '}and{' '}
                  <Text className='text-[#CBFD03] font-semibold'>Privacy Policy</Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Newsletter Subscription */}
          <View className='flex-row items-start mb-8'>
            <TouchableOpacity className='flex-row items-start'>
              <View className='w-5 h-5 bg-stone-700 rounded mr-3 mt-1' />
            </TouchableOpacity>
            <View className='flex-1'>
              <Text className='text-gray-400 text-sm leading-5'>
                Subscribe to our newsletter for financial tips and updates
              </Text>
            </View>
          </View>

          {/* Register Button */}
          <TouchableOpacity className='bg-[#CBFD03] rounded-xl p-4 items-center mb-6'>
            <Text className='text-black text-lg font-semibold'>Create Account</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className='flex-row items-center mb-6'>
            <View className='flex-1 h-px bg-stone-700' />
            <Text className='text-gray-400 text-sm mx-4'>or sign up with</Text>
            <View className='flex-1 h-px bg-stone-700' />
          </View>

          {/* Social Registration Buttons */}
          <View className='flex-row gap-4 mb-6'>
            <TouchableOpacity className='flex-1 bg-stone-800 rounded-xl p-4 items-center'>
              <AntDesign name="google" size={24} color="#CBFD03" />
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-stone-800 rounded-xl p-4 items-center'>
              <AntDesign name="apple1" size={24} color="#CBFD03" />
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-stone-800 rounded-xl p-4 items-center'>
              <Feather name="smartphone" size={24} color="#CBFD03" />
            </TouchableOpacity>
          </View>
        </View>

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
