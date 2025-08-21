import React from 'react';
import { Text, View } from 'react-native';

export default function SummaryCards() {
  return (
    <View className='w-full flex-row gap-4'>
    <View className='flex-1 bg-stone-800 rounded-xl p-4'>
      <Text className='text-gray-400 text-sm mb-1'>Total Income</Text>
      <Text className='text-green-400 text-xl font-bold'>$4,250.00</Text>
    </View>
    <View className='flex-1 bg-stone-800 rounded-xl p-4'>
      <Text className='text-gray-400 text-sm mb-1'>Total Expenses</Text>
      <Text className='text-red-400 text-xl font-bold'>$1,799.25</Text>
    </View>
  </View>
  )
}