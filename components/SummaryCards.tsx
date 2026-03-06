import { useTheme } from '@/contexts/ThemeContext';
import React from 'react';
import { Text, View } from 'react-native';

export default function SummaryCards() {
  const { colors } = useTheme();
  return (
    <View className="w-full self-stretch flex-row gap-4">
      <View className={`flex-1 min-w-0 rounded-xl p-4 ${colors.card}`}>
        <Text className={`${colors.text} text-sm mb-1`}>Total Income</Text>
        <Text className="text-green-500 text-xl font-bold">$4,250.00</Text>
      </View>
      <View className={`flex-1 min-w-0 rounded-xl p-4 ${colors.card}`}>
        <Text className={`${colors.text} text-sm mb-1`}>Total Expenses</Text>
        <Text className="text-red-500 text-xl font-bold">$1,799.25</Text>
      </View>
    </View>
  )
}