import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function AddTransactionButton({ openModal }: { openModal: () => void }) {
  return (
    <TouchableOpacity 
    className='absolute bottom-20 right-6 bg-indigo-500 rounded-full p-4 shadow-lg z-50'
    onPress={openModal}
  >
    <Feather name="plus" size={28} color="white" />
  </TouchableOpacity>

  )
}