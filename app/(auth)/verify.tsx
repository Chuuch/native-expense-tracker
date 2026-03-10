import verify from '@/assets/lottie/verify.json';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useEffect, useRef, useState } from 'react';
import type { TextInputProps } from 'react-native';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authAPI } from '../../lib/api';

export default function VerifyScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  
  const inputRefs = useRef<(TextInput | null)[]>([]);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = async () => {
    const code = otp.join('');
    
    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter the complete 6-digit code');
      return;
    }

    setIsVerifying(true);
    
    try {
      await authAPI.verifyEmail(code);
      Alert.alert(
        'Success',
        'Email verified successfully! You can now log in.',
        [{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
      );
    } catch (error: any) {
      console.error('Verification failed - Full error:', error);
      
      let errorMessage = 'Failed to verify email. Please try again.';
      if (error.message && error.message !== `HTTP error! status: ${error.status}`) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const focusIndex = (index: number) => {
    inputRefs.current[index]?.focus();
  };

  const handleOtpChange = (text: string, index: number) => {
    const digits = (text ?? '').replace(/\D/g, '');
    if (digits.length > 1) {
      const newOtp = [...otp];
      let writeIndex = index;
      for (const ch of digits) {
        if (writeIndex > 5) break;
        newOtp[writeIndex] = ch;
        writeIndex += 1;
      }
      setOtp(newOtp);
      focusIndex(Math.min(writeIndex, 5));
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = digits;
    setOtp(newOtp);

    if (digits && index < 5) {
      focusIndex(index + 1);
    }
  };

  const handleOtpKeyPress = (
    e: Parameters<NonNullable<TextInputProps['onKeyPress']>>[0],
    index: number
  ) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = '';
      setOtp(newOtp);
      focusIndex(index - 1);
    }
  };

  const resendCode = async () => {
    // TODO: Implement resend verification code
    Alert.alert('Info', 'Resend functionality will be implemented');
  };

  return (
    <ScrollView 
      className={`flex-1 ${colors.background}`}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className={`flex-1 ${colors.background} p-6 justify-center mt-10`}>
        {/* Header */}
        <View className='items-center mb-12'>
          <LottieView source={verify} autoPlay loop style={{ width: 200, height: 200 }} />
          <Text className={`${colors.text} text-4xl font-bold mb-2`}>Verify Email</Text>
          <Text className={`${colors.textSecondary} text-lg text-center mb-2`}>
            We&apos;ve sent a verification code to
          </Text>
          <Text className={`${colors.text} text-lg font-semibold`}>
            your email
          </Text>
        </View>

        {/* OTP Input */}
        <View className='mb-8'>
          <Text className={`${colors.text} text-base font-semibold mb-4 text-center`}>
            Enter the 6-digit code
          </Text>
          
          <View className='flex-row justify-center gap-2 mb-8'>
            {otp.map((digit, index) => (
              <View key={index} className={`${colors.cardSecondary} rounded-xl w-16 h-16 items-center justify-center`}>
                <TextInput
                  ref={(ref) => {
                    inputRefs.current[index] = ref;
                  }}
                  className={`${colors.text} text-2xl font-bold text-center`}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleOtpKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={{ width: 40, height: 40 }}
                />
              </View>
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity 
            className={`rounded-xl p-4 items-center mb-6 ${isVerifying ? `${colors.cardSecondary}` : `${colors.accent}`}`}
            onPress={handleSubmit}
            disabled={isVerifying}
          >
            <Text className={`text-lg font-semibold ${isVerifying ? `${colors.textSecondary}` : `${colors.text}`}`}>
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resend Section */}
        <View className='items-center mb-8'>
          <Text className={`${colors.textSecondary} text-base text-center mb-4`}>
            Didn&apos;t receive the code?
          </Text>
          
          {timeLeft > 0 ? (
            <View className='flex-row items-center'>
              <Text className={`${colors.textSecondary} text-base`}>Resend in </Text>
              <Text className={`${colors.text} text-base font-semibold`}>{timeLeft}s</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={resendCode}>
              <Text className={`${colors.text} text-base font-semibold`}>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Alternative Options */}
        <View className='mb-8'>
          <View className='flex-row items-center mb-4'>
            <View className={`flex-1 h-px ${colors.cardSecondary}`} />
            <Text className='text-gray-400 text-sm mx-4'>or</Text>
            <View className={`flex-1 h-px ${colors.cardSecondary}`} />
          </View>
        </View>

        {/* Back to Login */}
        <View className='flex-row justify-center items-center'>
          <Text className={`${colors.textSecondary} text-base`}>Back to </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text className={`${colors.text} text-base font-semibold`}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}