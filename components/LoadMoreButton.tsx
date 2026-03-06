import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

export default function LoadMoreButton() {
  return (
    <TouchableOpacity className='w-full bg-indigo-500 rounded-xl p-4 items-center mb-20'>
    <Text className='text-white text-base font-semibold'>Load More Transactions</Text>
  </TouchableOpacity>
  )
}