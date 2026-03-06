import { useTheme } from '@/contexts/ThemeContext';
import React from 'react'
import { Text, View } from 'react-native'

export default function MonthlyTrendGraph() {
  const { colors } = useTheme();
  return (
    <View className='w-full'>
    <Text className={`${colors.text} text-2xl font-bold mb-4`}>Monthly Trend</Text>
    <View className={`${colors.card} rounded-xl p-4`}>
      <View className='flex-row items-center justify-between mb-4'>
        <Text className={`${colors.text} text-base font-semibold`}>Spending Pattern</Text>
        <View className='flex-row items-center gap-2'>
          <View className='w-3 h-3 bg-indigo-500 rounded-full'></View>
          <Text className='text-indigo-500 text-sm'>This Month</Text>
        </View>
      </View>
      
      {/* Simple Bar Chart */}
      <View className='flex-row items-end justify-between h-32 gap-2'>
        <View className='flex-1 items-center'>
          <View className='w-full bg-indigo-500 rounded-t' style={{ height: '60%' }}></View>
          <Text className='text-gray-400 text-xs mt-2'>Week 1</Text>
        </View>
        <View className='flex-1 items-center'>
          <View className='w-full bg-indigo-500 rounded-t' style={{ height: '80%' }}></View>
          <Text className='text-gray-400 text-xs mt-2'>Week 2</Text>
        </View>
        <View className='flex-1 items-center'>
          <View className='w-full bg-indigo-500 rounded-t' style={{ height: '45%' }}></View>
          <Text className='text-gray-400 text-xs mt-2'>Week 3</Text>
        </View>
        <View className='flex-1 items-center'>
          <View className='w-full bg-indigo-500 rounded-t' style={{ height: '70%' }}></View>
          <Text className='text-gray-400 text-xs mt-2'>Week 4</Text>
        </View>
      </View>
    </View>
  </View>
  )
}