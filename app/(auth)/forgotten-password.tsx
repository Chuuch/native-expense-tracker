import main from '@/assets/lottie/main.json';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authAPI } from '../../lib/api';

export default function ForgottenPasswordScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    setSubmitting(true);
    try {
      await authAPI.forgotPassword(trimmed);
      Alert.alert(
        'Check your email',
        'If an account exists for this email, we sent reset instructions.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (error: any) {
      const message =
        typeof error?.message === 'string' ? error.message : 'Failed to send reset email. Please try again.';
      Alert.alert('Error', message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      className={`flex-1 ${colors.background}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className={`flex-1 ${colors.background} p-6 justify-center mt-20`}>
        <View className="items-center mb-12">
          <LottieView source={main} autoPlay loop style={{ width: 200, height: 200 }} />
          <Text className={`${colors.text} text-4xl font-bold mb-2`}>Reset Password</Text>
          <Text className={`${colors.textSecondary} text-lg text-center`}>
            Enter your email to receive reset instructions
          </Text>
        </View>

        <View className="mb-8">
          <View className="mb-6">
            <Text className={`${colors.text} text-base font-semibold mb-3`}>Email Address</Text>
            <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
              <Feather name="mail" size={20} color="#615eff" />
              <TextInput
                className={`flex-1 ${colors.text} text-base ml-3`}
                placeholder="Enter your email address"
                placeholderTextColor="#615eff"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          <View className={`${colors.cardSecondary} rounded-xl p-4 mb-8`}>
            <View className="flex-row items-start mb-3">
              <Ionicons name="information-circle" size={20} color="#615eff" />
              <Text className={`${colors.text} text-base font-semibold ml-2`}>What happens next?</Text>
            </View>
            <Text className={`${colors.textSecondary} text-sm leading-5`}>
              We&apos;ll send an email with instructions to reset your password.
            </Text>
          </View>

          <TouchableOpacity
            className={`${colors.accent} rounded-xl p-4 items-center mb-6`}
            disabled={submitting}
            onPress={onSubmit}
          >
            <Text className={`${colors.textButton} text-lg font-semibold`}>
              {submitting ? 'Sending...' : 'Send Reset Link'}
            </Text>
            {submitting ? <ActivityIndicator size="small" color="#fff" style={{ marginTop: 6 }} /> : null}
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center items-center">
          <Text className={`${colors.textSecondary} text-base`}>Remember your password? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className={`${colors.text} text-base font-semibold`}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}