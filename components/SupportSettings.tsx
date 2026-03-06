import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function SupportSettings({ supportItems, handleSettingPress }: { supportItems: any, handleSettingPress: (id: string) => void }) {
  const { colors } = useTheme();
  return (
    <View className='w-full'>
    <Text className={`${colors.text} text-xl font-bold mb-4`}>Support</Text>
    <View className={`${colors.card} rounded-xl p-4 gap-2`}>
      {supportItems.map((item: any) => {
        const IconComponent = item.icon;
        return (
          <TouchableOpacity
            key={item.id}
            className='flex-row items-center justify-between w-full p-3 rounded-lg'
            onPress={() => handleSettingPress(item.id)}
          >
            <View className='flex-row items-center justify-start gap-3 flex-1'>
              <View className={`${colors.cardSecondary} rounded-full p-2`}>
                <IconComponent
                  name={item.iconName as any}
                  size={item.iconSize}
                  color={item.iconColor}
                />
              </View>
              <View className='flex-1'>
                <Text className={`${colors.text} text-base font-semibold`}>{item.title}</Text>
                <Text className={`${colors.textSecondary} text-sm`}>{item.subtitle}</Text>
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