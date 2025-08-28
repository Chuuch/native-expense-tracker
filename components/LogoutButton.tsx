
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export default function LogoutButton() {
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
            
            // TODO: Implement logout
          },
        },
      ]
    );
  };

  return (
    <View className='w-full mb-20'>
      <TouchableOpacity
        onPress={handleLogout}
        className='bg-[#CBFD03] w-full rounded-xl p-4 items-center justify-center flex-row gap-3'
      >
        <MaterialCommunityIcons name='exit-to-app' size={24} color='black'/>
        <Text className='text-lg font-semibold text-black'>Log out</Text>
      </TouchableOpacity>
    </View>
  )
}
