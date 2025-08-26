import { supabase } from '@/lib/supabase';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await supabase.auth.signInWithPassword({
        email,
        password
      });
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

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
        <View className='mb-8'>
          {/* Email Input */}
          <View className='mb-6'>
            <Text className='text-white text-base font-semibold mb-3'>Email Address</Text>
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

          {/* Password Input */}
          <View className='mb-6'>
            <Text className='text-white text-base font-semibold mb-3'>Password</Text>
            <View className='bg-stone-800 rounded-xl p-4 flex-row items-center'>
              <Feather name="lock" size={20} color="#6b7280" />
              <TextInput
                className='flex-1 text-white text-base ml-3'
                placeholder="Enter your password"
                placeholderTextColor="#6b7280"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather name={showPassword ? "eye-off" : "eye"} size={20} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Remember Me & Forgot Password */}
          <View className='flex-row items-center justify-between mb-8'>
            <TouchableOpacity className='flex-row items-center'>
              <View className='w-5 h-5 bg-stone-700 rounded mr-2'>
                <View className='w-5 h-5 bg-[#CBFD03] rounded' />
              </View>
              <Text className='text-gray-400 text-sm'>Remember me</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(auth)/forgotten-password')}>
              <Text className='text-[#CBFD03] text-sm font-semibold'>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Login Button */}
          <TouchableOpacity 
            className={`rounded-xl p-4 items-center mb-6 ${isLoading ? 'bg-stone-600' : 'bg-[#CBFD03]'}`}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text className={`text-lg font-semibold ${isLoading ? 'text-gray-400' : 'text-black'}`}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Text>
          </TouchableOpacity>

          {/* Divider */}
          <View className='flex-row items-center mb-6'>
            <View className='flex-1 h-px bg-stone-700' />
            <Text className='text-gray-400 text-sm mx-4'>or continue with</Text>
            <View className='flex-1 h-px bg-stone-700' />
          </View>

          {/* Social Login Buttons */}
          <View className='flex-row gap-4 mb-8'>
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

        {/* Sign Up Link */}
        <View className='flex-row justify-center items-center'>
          <Text className='text-gray-400 text-base'>Don&apos;t have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
            <Text className='text-[#CBFD03] text-base font-semibold'>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
