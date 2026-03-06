import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function RecentTransactions() {
  const { colors } = useTheme();
  return (
    <View className='w-full'>
    <View className='flex-row items-center justify-between mb-4'>
      <Text className={`${colors.text} text-2xl font-bold`}>Recent Transactions</Text>
      <TouchableOpacity>
        <Text className={`${colors.text} text-sm font-semibold`}>View All</Text>
      </TouchableOpacity>
    </View>
    <View className={`${colors.card} rounded-xl p-4 gap-4`}>
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3'>
          <View className='bg-red-500 rounded-full p-2'>
            <Feather name="shopping-bag" size={16} color="white" />
          </View>
          <View>
            <Text className={`${colors.text} text-base font-semibold`}>Grocery Shopping</Text>
            <Text className='text-gray-400 text-sm'>Today, 2:30 PM</Text>
          </View>
        </View>
        <Text className='text-red-400 text-lg font-bold'>-$45.20</Text>
      </View>
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3'>
          <View className='bg-green-500 rounded-full p-2'>
            <Feather name="briefcase" size={16} color="white" />
          </View>
          <View>
            <Text className={`${colors.text} text-base font-semibold`}>Salary</Text>
            <Text className='text-gray-400 text-sm'>Yesterday, 9:00 AM</Text>
          </View>
        </View>
        <Text className='text-green-500 text-lg font-bold'>+$3,200.00</Text>
      </View>
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3'>
          <View className='bg-blue-500 rounded-full p-2'>
            <Feather name="coffee" size={16} color="white" />
          </View>
          <View>
            <Text className={`${colors.text} text-base font-semibold`}>Coffee Shop</Text>
            <Text className='text-gray-400 text-sm'>Yesterday, 8:15 AM</Text>
          </View>
        </View>
        <Text className='text-red-400 text-lg font-bold'>-$4.50</Text>
      </View>
    </View>
  </View>
  )
}