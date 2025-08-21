import { Feather } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export default function AddTransactionButton({ openModal }: { openModal: () => void }) {
  return (
    <TouchableOpacity 
    className='absolute bottom-36 right-6 bg-[#CBFD03] rounded-full p-4 shadow-lg z-50'
    onPress={openModal}
  >
    <Feather name="plus" size={28} color="black" />
  </TouchableOpacity>

  )
}