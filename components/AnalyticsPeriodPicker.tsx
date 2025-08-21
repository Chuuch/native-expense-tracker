import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function AnalyticsPeriodPicker() {
  return (
    <View className='w-full'>
    <View className='flex-row items-center justify-between mb-4'>
      <Text className='text-white text-2xl font-bold'>Spending Overview</Text>
      <TouchableOpacity className='bg-stone-800 rounded-xl px-4 py-2'>
        <Text className='text-[#CBFD03] text-sm font-semibold'>This Month</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}