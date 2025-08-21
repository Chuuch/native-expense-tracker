import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function PreferenceSettings({ preferencesItems, handleSettingPress }: { preferencesItems: any, handleSettingPress: (id: string) => void }) {
  return (
    <View className='w-full'>
    <Text className='text-white text-xl font-bold mb-4'>Preferences</Text>
    <View className='bg-stone-800 rounded-xl p-4 gap-2'>
      {preferencesItems.map((item: any) => {
        const IconComponent = item.icon;
        return (
          <TouchableOpacity
            key={item.id}
            className='flex-row items-center justify-between w-full p-3 rounded-lg'
            onPress={() => handleSettingPress(item.id)}
          >
            <View className='flex-row items-center justify-start gap-3 flex-1'>
              <View className='bg-stone-700 rounded-full p-2'>
                <IconComponent
                  name={item.iconName as any}
                  size={item.iconSize}
                  color={item.iconColor}
                />
              </View>
              <View className='flex-1'>
                <Text className='text-white text-base font-semibold'>{item.title}</Text>
                <Text className='text-gray-400 text-sm'>{item.subtitle}</Text>
              </View>
            </View>
            <Feather name="chevron-right" size={20} color="#6b7280" />
          </TouchableOpacity>
        );
      })}
    </View>
  </View>
  )
}