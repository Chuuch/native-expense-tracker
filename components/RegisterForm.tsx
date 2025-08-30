import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks';

export default function RegisterForm() {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  
  const { register, isLoadingRegister } = useAuth();

  async function signUpWithEmail() {
    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    try {
      await register({
        email,
        fullName,
        phone,
        password,
      });
      
      Alert.alert(
        'Success',
        'Account created successfully! Please check your email for verification.',
        [{ text: 'OK', onPress: () => router.replace('/(tabs)') }]
      );
    } catch (error) {
      console.error("Registration failed:", error);
    }
  }

  return (
    <>
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
              value={fullName}
              onChangeText={setFullName}
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
              value={email}
              onChangeText={setEmail}
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
              value={phone}
              onChangeText={setPhone}
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
              value={password}
              onChangeText={setPassword}
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
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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
        <TouchableOpacity
          className='bg-[#CBFD03] rounded-xl p-4 items-center mb-6'
          disabled={isLoadingRegister}
          onPress={signUpWithEmail}
        >
          <Text className='text-black text-lg font-semibold'>
            {isLoadingRegister ? 'Creating Account...' : 'Create Account'}
          </Text>
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
    </>
  )
}