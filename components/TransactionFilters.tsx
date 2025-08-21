import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TransactionFilters() {
  return (
    <View className='w-full'>
    <Text className='text-white text-2xl font-bold mb-4'>Filters</Text>
    <View className='flex-row items-center gap-3'>
      <TouchableOpacity className='bg-[#CBFD03] rounded-xl px-4 py-2'>
        <Text className='text-black text-sm font-semibold'>All</Text>
      </TouchableOpacity>
      <TouchableOpacity className='bg-stone-800 rounded-xl px-4 py-2'>
        <Text className='text-white text-sm font-semibold'>Income</Text>
      </TouchableOpacity>
      <TouchableOpacity className='bg-stone-800 rounded-xl px-4 py-2'>
        <Text className='text-white text-sm font-semibold'>Expenses</Text>
      </TouchableOpacity>
      <TouchableOpacity className='bg-stone-800 rounded-xl px-4 py-2'>
        <Text className='text-white text-sm font-semibold'>This Month</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}