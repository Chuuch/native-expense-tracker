import { useTheme } from '@/contexts/ThemeContext';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks';
import { getRefreshToken, isBiometricEnabled } from '../stores/authStore';

const AUTO_BIOMETRIC_DELAY_MS = 500;

export default function LoginForm() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [enableBiometrics, setEnableBiometrics] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const hasAutoTriggeredBiometric = useRef(false);

  const {
    login,
    loginWithBiometrics,
    loginWithGoogle,
    isLoadingLogin,
    isLoadingGoogle,
    isLoadingBiometric,
  } = useAuth();

  const isLoading = isLoadingLogin || isLoadingGoogle || isLoadingBiometric;

  useEffect(() => {
    if (hasAutoTriggeredBiometric.current) return;

    let cancelled = false;
    const timer = setTimeout(async () => {
      try {
        const [enabled, refreshToken] = await Promise.all([isBiometricEnabled(), getRefreshToken()]);
        if (!cancelled && enabled && refreshToken) {
          hasAutoTriggeredBiometric.current = true;
          await loginWithBiometrics();
        }
      } catch {
        // silent fallback
      }
    }, AUTO_BIOMETRIC_DELAY_MS);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, []);

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await login(email.trim(), password, enableBiometrics);
      router.replace('/(tabs)');
    } catch (error: any) {
      const message =
        typeof error?.message === 'string' && error.message.length > 0
          ? error.message
          : 'Sign-in failed. Please check your details and try again.';
      Alert.alert('Sign-in failed', message);
    }
  }

  return (
    <View className="mb-8">
      {/* Email */}
      <View className="mb-6">
        <Text className={`${colors.text} text-base font-semibold mb-3`}>Email Address</Text>
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

      {/* Password */}
      <View className="mb-6">
        <Text className={`${colors.text} text-base font-semibold mb-3`}>Password</Text>
        <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
          <Feather name="lock" size={20} color="#615eff" />
          <TextInput
            className={`flex-1 ${colors.text} text-base ml-3`}
            placeholder="Enter your password"
            placeholderTextColor="#615eff"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={20} color="#615eff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot + biometrics toggle */}
      <View className="mb-4">
        <View className="flex-row items-center justify-between mb-3">
          <View />
          <TouchableOpacity onPress={() => router.push('/(auth)/forgotten-password')}>
            <Text className={`${colors.text} text-sm font-semibold`}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className={`${colors.textSecondary} text-sm`}>Use Face ID / fingerprint next time</Text>
          <Switch value={enableBiometrics} onValueChange={setEnableBiometrics} />
        </View>
      </View>

      {/* Sign in */}
      <TouchableOpacity
        className={`${colors.accent} rounded-xl p-4 items-center mb-6`}
        disabled={isLoading}
        onPress={signInWithEmail}
      >
        <Text className={`${colors.textButton} text-lg font-semibold`}>
          {isLoadingLogin ? 'Signing In...' : 'Sign In'}
        </Text>
      </TouchableOpacity>

      {/* Divider */}
      <View className="flex-row items-center mb-6">
        <View className={`flex-1 h-px ${colors.cardSecondary}`} />
        <Text className={`${colors.textSecondary} text-sm mx-4`}>or continue with</Text>
        <View className={`flex-1 h-px ${colors.cardSecondary}`} />
      </View>

      {/* Social */}
      <View className="flex-row gap-4">
        <TouchableOpacity
          className={`flex-1 ${colors.cardSecondary} rounded-xl p-4 items-center`}
          disabled={isLoading}
          onPress={loginWithGoogle}
        >
          <AntDesign name="google" size={24} color="#615eff" />
          {isLoadingGoogle ? <ActivityIndicator size="small" color="#615eff" style={{ marginTop: 4 }} /> : null}
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 ${colors.cardSecondary} rounded-xl p-4 items-center`}
          disabled={isLoading}
          onPress={() => Alert.alert('Coming soon', 'Sign in with Apple will be available soon.')}
        >
          <AntDesign name="apple" size={24} color="#615eff" />
        </TouchableOpacity>

        <TouchableOpacity
          className={`flex-1 ${colors.cardSecondary} rounded-xl p-4 items-center`}
          disabled={isLoading}
          onPress={loginWithBiometrics}
        >
          <MaterialCommunityIcons name="fingerprint" size={24} color="#615eff" />
          {isLoadingBiometric ? <ActivityIndicator size="small" color="#615eff" style={{ marginTop: 4 }} /> : null}
        </TouchableOpacity>
      </View>
    </View>
  );
}