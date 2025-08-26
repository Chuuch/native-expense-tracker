import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { useAuth } from '../contexts/AuthContext'

export default function LogoutButton() {
  const { signOut } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            setIsLoading(true)
            try {
              await signOut()
              // AuthContext will handle the redirect automatically
            } catch (error: any) {
              Alert.alert('Logout Failed', error.message || 'An error occurred during logout')
            } finally {
              setIsLoading(false)
            }
          }
        }
      ]
    )
  }

  return (
    <View className='w-full mb-20'>
      <TouchableOpacity
        className={`w-full rounded-xl p-4 items-center justify-center flex-row gap-3 ${isLoading ? 'bg-stone-600' : 'bg-[#CBFD03]'}`}
        onPress={handleLogout}
        disabled={isLoading}
      >
        <MaterialCommunityIcons name='exit-to-app' size={24} color={isLoading ? '#6b7280' : 'black'}/>
        <Text className={`text-lg font-semibold ${isLoading ? 'text-gray-400' : 'text-black'}`}>
          {isLoading ? 'Logging out...' : 'Log out'}
        </Text>
      </TouchableOpacity>
    </View>
  )
}