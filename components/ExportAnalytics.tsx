import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function ExportAnalytics() {
  return (
    <View className='w-full'>
          <Text className='text-indigo-500 text-2xl font-bold mb-4'>Export Report</Text>
          <View className='flex-row gap-4'>
            <TouchableOpacity className='flex-1 bg-indigo-500 rounded-xl p-4 items-center'>
              <Feather name="download" size={24} color="white" />
              <Text className='text-white text-sm font-semibold mt-2'>PDF Report</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-indigo-500 rounded-xl p-4 items-center'>
              <Feather name="file-text" size={24} color="white" />
              <Text className='text-white text-sm font-semibold mt-2'>CSV Data</Text>
            </TouchableOpacity>
          </View>
        </View> 
  )
}