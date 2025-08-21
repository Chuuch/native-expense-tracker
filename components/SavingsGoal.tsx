import React from 'react';
import { Text, View } from 'react-native';

export default function SavingsGoal() {
  return (
    <View className='w-full'>
    <Text className='text-white text-2xl font-bold mb-4'>Savings Goals</Text>
    <View className='bg-stone-800 rounded-xl p-4 gap-4'>
      <View className='gap-2'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-white text-base font-semibold'>Vacation Fund</Text>
          <Text className='text-[#CBFD03] text-sm font-semibold'>$1,200 / $2,000</Text>
        </View>
        <View className='w-full bg-stone-700 rounded-full h-2'>
          <View className='bg-[#CBFD03] h-2 rounded-full' style={{ width: '60%' }} />
        </View>
      </View>
      <View className='gap-2'>
        <View className='flex-row items-center justify-between'>
          <Text className='text-white text-base font-semibold'>Emergency Fund</Text>
          <Text className='text-[#CBFD03] text-sm font-semibold'>$3,500 / $5,000</Text>
        </View>
        <View className='w-full bg-stone-700 rounded-full h-2'>
          <View className='bg-[#CBFD03] h-2 rounded-full' style={{ width: '70%' }} />
        </View>
      </View>
    </View>
  </View>
  )
}