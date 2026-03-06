import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AnalyticsPeriodPicker() {
  const { colors } = useTheme();
  return (
    <View className='w-full'>
    <View className='flex-row items-center justify-between mb-4'>
      <Text className={`${colors.text} text-2xl font-bold`}>Spending Overview</Text>
      <TouchableOpacity className={`${colors.accent} rounded-xl px-4 py-2`}>
        <Text className='text-white text-sm font-semibold'>This Month</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}