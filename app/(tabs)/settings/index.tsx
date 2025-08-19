import { AntDesign, Feather, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

// Define the settings data structure
const settingsItems = [
  {
    id: 'profile',
    title: 'My Profile',
    subtitle: 'Manage your account details',
    icon: Feather,
    iconName: 'user' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'subscription',
    title: 'Subscription Plan',
    subtitle: 'Premium features & billing',
    icon: FontAwesome,
    iconName: 'diamond' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'notifications',
    title: 'Notifications',
    subtitle: 'Alert preferences & reminders',
    icon: MaterialCommunityIcons,
    iconName: 'bell-outline' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'privacy',
    title: 'Privacy & Security',
    subtitle: 'Data protection & security',
    icon: MaterialIcons,
    iconName: 'verified-user' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  }
];

const preferencesItems = [
  {
    id: 'darkMode',
    title: 'Dark Mode',
    subtitle: 'Toggle dark theme',
    icon: Ionicons,
    iconName: 'bulb-outline' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'currency',
    title: 'Currency',
    subtitle: 'USD - US Dollar',
    icon: Feather,
    iconName: 'dollar-sign' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'language',
    title: 'Language',
    subtitle: 'English',
    icon: Feather,
    iconName: 'globe' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  }
];

const supportItems = [
  {
    id: 'help',
    title: 'Help & Support',
    subtitle: 'Get help and contact us',
    icon: Feather,
    iconName: 'help-circle' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'feedback',
    title: 'Send Feedback',
    subtitle: 'Share your thoughts with us',
    icon: MaterialCommunityIcons,
    iconName: 'message-text-outline' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'rate',
    title: 'Rate App',
    subtitle: 'Rate us on App Store',
    icon: AntDesign,
    iconName: 'star' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  }
];

const legalItems = [
  {
    id: 'terms',
    title: 'Terms of Service',
    subtitle: 'Read our terms and conditions',
    icon: MaterialCommunityIcons,
    iconName: 'sticker-text-outline' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    subtitle: 'How we handle your data',
    icon: MaterialCommunityIcons,
    iconName: 'shield-account-outline' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  },
  {
    id: 'application',
    title: 'About App',
    subtitle: 'Version 1.0.0',
    icon: AntDesign,
    iconName: 'mobile1' as const,
    iconSize: 24,
    iconColor: '#CBFD03'
  }
];

export default function SettingsScreen() {
  const router = useRouter();

  const handleSettingPress = (settingId: string) => {
    switch (settingId) {
      case 'profile':
        router.push('/settings/profile');
        break;
      case 'subscription':
        // Handle subscription navigation
        break;
      case 'notifications':
        // Handle notifications navigation
        break;
      case 'privacy':
        // Handle privacy navigation
        break;
      default:
        console.log('Setting pressed:', settingId);
    }
  };

  return (
    <ScrollView 
      className='flex-1 bg-stone-950'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View className='flex items-center justify-start bg-stone-950 p-4 gap-8 top-20'>
        {/* Header */}
        <View className='flex-row items-end justify-start w-full gap-2'>
          <View className='bg-[#CBFD03] rounded-xl p-2'>
            <SimpleLineIcons name="settings" size={40} color="black" />
          </View>
          <Text className='text-white text-5xl font-bold'>Settings</Text>
        </View>

        {/* Account Section */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Account</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {settingsItems.map((item) => {
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

        {/* Preferences Section */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Preferences</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {preferencesItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  className='flex-row items-center justify-between w-full p-3 rounded-lg'
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

        {/* Support Section */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Support</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {supportItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  className='flex-row items-center justify-between w-full p-3 rounded-lg'
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

        {/* Legal Section */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Legal</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {legalItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <TouchableOpacity
                  key={item.id}
                  className='flex-row items-center justify-between w-full p-3 rounded-lg'
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

        {/* Logout Button */}
        <View className='w-full mb-20'>
          <TouchableOpacity
            className='bg-[#CBFD03] w-full rounded-xl p-4 items-center justify-center flex-row gap-3'
          >
            <MaterialCommunityIcons name='exit-to-app' size={24} color='black'/>
            <Text className='text-lg font-semibold text-black'>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
