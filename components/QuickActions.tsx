import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function QuickActions() {
  return (
    <View className='w-full'>
    <Text className='text-white text-2xl font-bold mb-4'>Quick Actions</Text>
    <View className='flex-row items-center justify-between gap-4'>
      <TouchableOpacity className='flex-1 bg-indigo-500 rounded-xl p-4 items-center justify-center'>
        <Feather name="plus" size={24} color="white" />
        <Text className='text-white text-sm font-semibold mt-2'>Add Expense</Text>
      </TouchableOpacity>
      <TouchableOpacity className='flex-1 bg-indigo-500 rounded-xl p-4 items-center justify-center'>
        <Feather name="dollar-sign" size={24} color="white" />
        <Text className='text-white text-sm font-semibold mt-2'>Add Income</Text>
      </TouchableOpacity>
      <TouchableOpacity className='flex-1 bg-indigo-500 rounded-xl p-4 items-center justify-center'>
        <MaterialCommunityIcons name="piggy-bank" size={24} color="white" />
        <Text className='text-white text-sm font-semibold mt-2'>Save Money</Text>
      </TouchableOpacity>
    </View>
  </View>

  )
}