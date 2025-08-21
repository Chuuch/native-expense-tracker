import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

export default function DailyTip() {
  return (
    <View className='w-full bg-stone-800 rounded-xl p-4 mb-2'>
          <View className='flex-row items-start gap-3'>
            <Ionicons name="bulb-outline" size={24} color="#CBFD03" />
            <View className='flex-1'>
              <Text className='text-white text-base font-semibold mb-1'>Tip of the Day</Text>
              <Text className='text-gray-400 text-sm'>Try cooking at home more often. You could save up to $300 per month on dining out!</Text>
            </View>
          </View>
        </View>
  )
}