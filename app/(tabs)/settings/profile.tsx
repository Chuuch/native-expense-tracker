import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <View className={`flex-1 ${colors.background} pt-20`}>
      {/* Header with Back Button */}
      <View className='flex-row items-center justify-between w-full p-4'>
        <TouchableOpacity 
          className={`${colors.card} rounded-xl p-2`}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#615eff" />
        </TouchableOpacity>
        <Text className={`${colors.text} text-4xl font-bold mr-10`}>Profile</Text>
        <View></View>
      </View>

      <ScrollView 
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Profile Picture & Basic Info */}
        <View className={`w-full ${colors.card} rounded-xl p-6 items-center`}>
          <View className={`${colors.accent} rounded-full p-4 mb-4`}>
            <Feather name="user" size={60} color="white" />
          </View>
          <Text className={`${colors.text} text-2xl font-bold mb-2`}>John Doe</Text>
          <Text className={`${colors.textSecondary} text-base mb-4`}>john.doe@example.com</Text>
          <View className='flex-row items-center gap-4'>
            <View className={`${colors.cardSecondary} rounded-xl px-4 py-2`}>
              <Text className={`${colors.text} text-sm font-semibold`}>Premium Member</Text>
            </View>
            <View className={`${colors.cardSecondary} rounded-xl px-4 py-2`}>
              <Text className={`${colors.textSecondary} text-sm`}>Member since Dec 2024</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Personal Information</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="user" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Username</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>johndoe123</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="mail" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Email</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>johndoe@example.com</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="phone" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Phone</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>+1 (555) 123-4567</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="map-pin" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Location</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>New York, USA</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Financial Preferences */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Financial Preferences</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="dollar-sign" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Default Currency</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>USD - US Dollar</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="calendar" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Budget Cycle</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Monthly</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <MaterialCommunityIcons name="target" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Monthly Budget</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>$2,500.00</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Security */}
        <View className='w-full'>
          <Text className='text-indigo-500 text-xl font-bold mb-4'>Account Security</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="lock" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Change Password</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Last changed 30 days ago</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="smartphone" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Two-Factor Auth</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Enabled</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="shield" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Login Sessions</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>2 active sessions</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Data & Privacy */}
        <View className='w-full'>
          <Text className='text-indigo-500 text-xl font-bold mb-4'>Data & Privacy</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="download" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Export Data</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Download your data</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="trash-2" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Delete Account</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Permanently delete your account</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#615eff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Changes Button */}
        <View className='w-full'>
          <TouchableOpacity className={`${colors.accent} w-full rounded-xl p-4 items-center justify-center`}>
            <Text className='text-white text-lg font-semibold'>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
