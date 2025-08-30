import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authAPI } from '../../lib/api';

export default function VerifyScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  
  // Create refs for each input box
  const inputRefs = useRef<(TextInput | null)[]>([]);
  
  // Auto-focus first input when component mounts
  useEffect(() => {
    // Focus the first input after a short delay to ensure component is rendered
    const timer = setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSubmit = async () => {
    // Combine OTP digits into a single string
    const code = otp.join('');
    
    // Validate OTP
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
      console.error('🔍 Verification failed - Full error:', error);
      console.error('🔍 Error message:', error.message);
      console.error('🔍 Error status:', error.status);
      console.error('🔍 Error statusText:', error.statusText);
      
      let errorMessage = 'Failed to verify email. Please try again.';
      if (error.message && error.message !== `HTTP error! status: ${error.status}`) {
        errorMessage = error.message;
      }
      
      Alert.alert('Error', errorMessage);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto-focus next input
    if (text && index < 5) {
      // Focus next input logic would go here
      // For now, we'll just update the state
    }
  };

  const resendCode = async () => {
    // TODO: Implement resend verification code
    Alert.alert('Info', 'Resend functionality will be implemented');
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
            <Ionicons name="shield-checkmark" size={60} color="black" />
          </View>
          <Text className='text-white text-4xl font-bold mb-2'>Verify Email</Text>
          <Text className='text-gray-400 text-lg text-center mb-2'>
            We&apos;ve sent a verification code to
          </Text>
          <Text className='text-[#CBFD03] text-lg font-semibold'>
            your email
          </Text>
        </View>

        {/* OTP Input */}
        <View className='mb-8'>
          <Text className='text-white text-base font-semibold mb-4 text-center'>
            Enter the 6-digit code
          </Text>
          
          <View className='flex-row justify-center gap-2 mb-8'>
            {otp.map((digit, index) => (
              <View key={index} className='bg-stone-800 rounded-xl w-16 h-16 items-center justify-center'>
                <TextInput
                  className='text-white text-2xl font-bold text-center'
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={{ width: 40, height: 40 }}
                />
              </View>
            ))}
          </View>

          {/* Verify Button */}
          <TouchableOpacity 
            className={`rounded-xl p-4 items-center mb-6 ${isVerifying ? 'bg-stone-600' : 'bg-[#CBFD03]'}`}
            onPress={handleSubmit}
            disabled={isVerifying}
          >
            <Text className={`text-lg font-semibold ${isVerifying ? 'text-gray-400' : 'text-black'}`}>
              {isVerifying ? 'Verifying...' : 'Verify Email'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Resend Section */}
        <View className='items-center mb-8'>
          <Text className='text-gray-400 text-base text-center mb-4'>
            Didn&apos;t receive the code?
          </Text>
          
          {timeLeft > 0 ? (
            <View className='flex-row items-center'>
              <Text className='text-gray-400 text-base'>Resend in </Text>
              <Text className='text-[#CBFD03] text-base font-semibold'>{timeLeft}s</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={resendCode}>
              <Text className='text-[#CBFD03] text-base font-semibold'>Resend Code</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Alternative Options */}
        <View className='mb-8'>
          <View className='flex-row items-center mb-4'>
            <View className='flex-1 h-px bg-stone-700' />
            <Text className='text-gray-400 text-sm mx-4'>or</Text>
            <View className='flex-1 h-px bg-stone-700' />
          </View>

          <TouchableOpacity className='bg-stone-800 rounded-xl p-4 items-center mb-4'>
            <View className='flex-row items-center'>
              <Feather name="phone" size={20} color="#CBFD03" />
              <Text className='text-white text-base font-semibold ml-3'>
                Send via SMS
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className='bg-stone-800 rounded-xl p-4 items-center'>
            <View className='flex-row items-center'>
              <Feather name="mail" size={20} color="#CBFD03" />
              <Text className='text-white text-base font-semibold ml-3'>
                Change Email Address
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Back to Login */}
        <View className='flex-row justify-center items-center'>
          <Text className='text-gray-400 text-base'>Back to </Text>
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