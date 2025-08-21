import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function AnalyticsSummaryCards() {
  return (
    <View className='w-full flex-row gap-4'>
          <View className='flex-1 bg-stone-800 rounded-xl p-4'>
            <View className='flex-row items-center justify-between mb-2'>
              <Text className='text-gray-400 text-sm'>Total Spent</Text>
              <Feather name="trending-up" size={16} color="#CBFD03" />
            </View>
            <Text className='text-white text-xl font-bold'>$1,799.25</Text>
            <Text className='text-[#CBFD03] text-xs'>+12% vs last month</Text>
          </View>
          <View className='flex-1 bg-stone-800 rounded-xl p-4'>
            <View className='flex-row items-center justify-between mb-2'>
              <Text className='text-gray-400 text-sm'>Daily Average</Text>
              <Feather name="calendar" size={16} color="#CBFD03" />
            </View>
            <Text className='text-white text-xl font-bold'>$59.98</Text>
            <Text className='text-[#CBFD03] text-xs'>$2,450 budget</Text>
          </View>
        </View>
  )
}