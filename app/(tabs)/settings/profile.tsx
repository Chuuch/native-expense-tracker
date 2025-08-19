import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView 
      className='flex-1 bg-stone-950'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View className='flex items-center justify-start bg-stone-950 p-4 gap-8 top-20'>
        {/* Header with Back Button */}
        <View className='flex-row items-center justify-between w-full'>
          <TouchableOpacity 
            className='bg-stone-800 rounded-xl p-2'
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#CBFD03" />
          </TouchableOpacity>
          <Text className='text-white text-4xl font-bold mr-10'>Profile</Text>
          <View></View>
        </View>

        {/* Profile Picture & Basic Info */}
        <View className='w-full bg-stone-800 rounded-xl p-6 items-center'>
          <View className='bg-[#CBFD03] rounded-full p-4 mb-4'>
            <Feather name="user" size={60} color="black" />
          </View>
          <Text className='text-white text-2xl font-bold mb-2'>John Doe</Text>
          <Text className='text-gray-400 text-base mb-4'>john.doe@example.com</Text>
          <View className='flex-row items-center gap-4'>
            <View className='bg-stone-700 rounded-xl px-4 py-2'>
              <Text className='text-[#CBFD03] text-sm font-semibold'>Premium Member</Text>
            </View>
            <View className='bg-stone-700 rounded-xl px-4 py-2'>
              <Text className='text-gray-400 text-sm'>Member since Dec 2024</Text>
            </View>
          </View>
        </View>

        {/* Personal Information */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Personal Information</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="user" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Full Name</Text>
                  <Text className='text-gray-400 text-sm'>John Doe</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="mail" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Email</Text>
                  <Text className='text-gray-400 text-sm'>john.doe@example.com</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="phone" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Phone</Text>
                  <Text className='text-gray-400 text-sm'>+1 (555) 123-4567</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="map-pin" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Location</Text>
                  <Text className='text-gray-400 text-sm'>New York, USA</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Financial Preferences */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Financial Preferences</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="dollar-sign" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Default Currency</Text>
                  <Text className='text-gray-400 text-sm'>USD - US Dollar</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="calendar" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Budget Cycle</Text>
                  <Text className='text-gray-400 text-sm'>Monthly</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <MaterialCommunityIcons name="target" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Monthly Budget</Text>
                  <Text className='text-gray-400 text-sm'>$2,500.00</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="edit-2" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Account Security */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Account Security</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="lock" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Change Password</Text>
                  <Text className='text-gray-400 text-sm'>Last changed 30 days ago</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="smartphone" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Two-Factor Auth</Text>
                  <Text className='text-gray-400 text-sm'>Enabled</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="shield" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Login Sessions</Text>
                  <Text className='text-gray-400 text-sm'>2 active sessions</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Data & Privacy */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Data & Privacy</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="download" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Export Data</Text>
                  <Text className='text-gray-400 text-sm'>Download your data</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="trash-2" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Delete Account</Text>
                  <Text className='text-gray-400 text-sm'>Permanently delete your account</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Feather name="chevron-right" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Changes Button */}
        <View className='w-full mb-20'>
          <TouchableOpacity className='bg-[#CBFD03] w-full rounded-xl p-4 items-center justify-center'>
            <Text className='text-black text-lg font-semibold'>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
