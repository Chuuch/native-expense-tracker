import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Define the settings data structure
const settingsItems = [
  {
    id: 'profile',
    title: 'My Profile',
    icon: Feather,
    iconName: 'user' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'subscription',
    title: 'Subscription Plan',
    icon: FontAwesome,
    iconName: 'diamond' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'darkMode',
    title: 'Dark Mode',
    icon: Ionicons,
    iconName: 'bulb-outline' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'help',
    title: 'Help & Support',
    icon: Feather,
    iconName: 'help-circle' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    icon: MaterialCommunityIcons,
    iconName: 'sticker-text-outline' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: MaterialCommunityIcons,
    iconName: 'bell-outline' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    icon: MaterialIcons,
    iconName: 'verified-user' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'application',
    title: 'Application',
    icon: AntDesign,
    iconName: 'mobile1' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  }
];

export default function SettingsScreen() {
  return (
    <ScrollView className='flex-1 bg-stone-950'>
      <View className='flex items-center justify-start bg-stone-950 p-4 top-32 gap-8'>
        <View className='flex-row items-end justify-start w-full gap-2'>
          <View className='bg-[#CBFD03] rounded-xl p-2'>
            <SimpleLineIcons name="settings" size={40} color="black" />
          </View>
          <Text className='text-white text-5xl font-bold'>Settings</Text>
        </View>

        <View className='flex-col items-start justify-start w-full gap-2 p-4 bg-stone-800 rounded-xl'>
          {settingsItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={item.id}
                className='flex-row items-center justify-between w-full p-2'
              >
                <View className='flex-row items-center justify-start gap-2'>
                  <IconComponent
                    name={item.iconName as any}
                    size={item.iconSize}
                    color={item.iconColor}
                  />
                  <Text className='text-white text-2xl font-bold'>{item.title}</Text>
                </View>
                <Feather name="chevron-right" size={24} color="#CBFD03" />
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          className='bg-[#CBFD03] w-full rounded-xl p-2 items-center justify-center flex-row gap-2'
        >
          <Text className='text-black text-2xl font-semibold'>Log out</Text>
          <MaterialCommunityIcons name='exit-to-app' size={24} color='black'/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}