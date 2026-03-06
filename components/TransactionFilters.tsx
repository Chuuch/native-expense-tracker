import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TransactionFilters() {
  const { colors } = useTheme();
  return (
    <View className='w-full'>
    <Text className={`${colors.text} text-2xl font-bold mb-4`}>Filters</Text>
    <View className='flex-row items-center gap-3'>
      <TouchableOpacity className={`${colors.accent} rounded-xl px-4 py-2`}>
        <Text className={`${colors.text} text-sm font-semibold`}>All</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`${colors.card} rounded-xl px-4 py-2`}>
        <Text className={`${colors.text} text-sm font-semibold`}>Income</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`${colors.card} rounded-xl px-4 py-2`}>
        <Text className={`${colors.text} text-sm font-semibold`}>Expenses</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`${colors.card} rounded-xl px-4 py-2`}>
        <Text className={`${colors.text} text-sm font-semibold`}>This Month</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}