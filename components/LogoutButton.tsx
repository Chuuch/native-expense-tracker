
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function LogoutButton() {
  return (
    <View className='w-full mb-20'>
    <TouchableOpacity
      className='bg-[#CBFD03] w-full rounded-xl p-4 items-center justify-center flex-row gap-3'
    >
      <MaterialCommunityIcons name='exit-to-app' size={24} color='black'/>
      <Text className='text-lg font-semibold text-black'>Log out</Text>
    </TouchableOpacity>
  </View>
  )
}
