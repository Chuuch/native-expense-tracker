import { useTheme } from '@/contexts/ThemeContext';
import { AntDesign, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks';

export default function RegisterForm() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isTermsAccepted, setIsTermsAccepted] = useState<boolean>(false);
  const { colors } = useTheme();
  const { register, isLoadingRegister } = useAuth();

  async function signUpWithEmail() {
    if (!username || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    if (!isTermsAccepted) {
      Alert.alert('Error', 'You must agree to the terms and conditions');
      return;
    }

    try {
      await register({
        email,
        username,
        password,
      });
      
      Alert.alert(
        'Success',
        'Account created successfully! Please check your email for the verification code.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/verify') }]
      );
    } catch (error) {
      const message = typeof (error as any)?.message === 'string' ? (error as any).message :
      'Registration failed. Please try again.';
      Alert.alert('Error', message);
      console.error("Registration failed:", error);
    }
  }

  return (
    <>
      <View className=''>
        {/* Username Input */}
        <View className='mb-4'>
          <Text className={`${colors.text} text-base font-semibold mb-2`}>Username</Text>
          <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
            <Feather name="user" size={20} color="#615eff" />
            <TextInput
              className={`flex-1 ${colors.text} text-base ml-3`}
              placeholder="Enter your username"
              placeholderTextColor="#615eff"
              autoCapitalize="words"
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>

        {/* Email Input */}
        <View className='mb-4'>
          <Text className={`${colors.text} text-base font-semibold mb-2`}>Email Address</Text>
          <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
            <Feather name="mail" size={20} color="#615eff" />
            <TextInput
              className={`flex-1 ${colors.text} text-base ml-3`}
              placeholder="Enter your email"
              placeholderTextColor="#615eff"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Password Input */}
        <View className='mb-4'>
          <Text className={`${colors.text} text-base font-semibold mb-2`}>Password</Text>
          <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
            <Feather name="lock" size={20} color="#615eff" />
            <TextInput
              className={`flex-1 ${colors.text} text-base ml-3`}
              placeholder="Create a password"
              placeholderTextColor="#615eff"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity>
              <Feather name="eye" size={20} color="#615eff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Input */}
        {/* <View className='mb-6'>
          <Text className={`${colors.text} text-base font-semibold mb-2`}>Confirm Password</Text>
          <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
            <Feather name="lock" size={20} color="#615eff" />
            <TextInput
              className={`flex-1 ${colors.text} text-base ml-3`}
              placeholder="Confirm your password"
              placeholderTextColor="#615eff"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity>
              <Feather name="eye" size={20} color="#615eff" />
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Terms and Conditions */}
        <View className='flex-row items-start mb-6'>
          <TouchableOpacity className='flex-row items-start' onPress={() => setIsTermsAccepted(!isTermsAccepted)}>
            <View className={`w-5 h-5 ${colors.cardSecondary} rounded mr-3 mt-1`}>
              <View className={`w-5 h-5 ${colors.accent} rounded`} />
            </View>
            <View className='flex-1'>
              <Text className={`${colors.textSecondary} text-sm leading-5`}>
                I agree to the{' '}
                <Text className={`${colors.text} font-semibold`}>Terms of Service</Text>
                {' '}and{' '}
                <Text className={`${colors.text} font-semibold`}>Privacy Policy</Text>
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          className={`${colors.accent} rounded-xl p-4 items-center mb-6`}
          disabled={isLoadingRegister}
          onPress={signUpWithEmail}
        >
          <Text className={`${colors.textButton} text-lg font-semibold`}>
            {isLoadingRegister ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className='flex-row items-center mb-6'>
          <View className={`flex-1 h-px ${colors.cardSecondary}`} />
          <Text className={`${colors.textSecondary} text-sm mx-4`}>or sign up with</Text>
          <View className={`flex-1 h-px ${colors.cardSecondary}`} />
        </View>

        {/* Social Registration Buttons */}
        <View className='flex-row gap-4 mb-6'>
          <TouchableOpacity className={`flex-1 ${colors.cardSecondary} rounded-xl p-4 items-center`}>
            <AntDesign name="google" size={24} color="#615eff" />
          </TouchableOpacity>
          <TouchableOpacity className={`flex-1 ${colors.cardSecondary} rounded-xl p-4 items-center`}>
            <AntDesign name="apple" size={24} color="#615eff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}