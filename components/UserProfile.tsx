import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../hooks';

export default function UserProfile() {
  const { user, updateProfile, isLoadingUpdateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.fullName || '');

  const handleSaveProfile = async () => {
    if (!editName.trim()) {
      Alert.alert('Error', 'Name cannot be empty');
      return;
    }

    try {
      await updateProfile({ fullName: editName.trim() });
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
      console.error('Failed to update profile:', error);
    }
  };

  if (!user) {
    return (
      <View className="p-4">
        <Text className="text-white text-center">No user data available</Text>
      </View>
    );
  }

  return (
    <View className="p-4">
      <View className="bg-stone-800 rounded-xl p-6 mb-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-xl font-bold">Profile</Text>
          <TouchableOpacity
            onPress={() => setIsEditing(!isEditing)}
            className="bg-[#615eff] px-4 py-2 rounded-lg"
          >
            <Text className="text-black font-semibold">
              {isEditing ? 'Cancel' : 'Edit'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="space-y-4">
          {/* Email */}
          <View className="flex-row items-center">
            <Feather name="mail" size={20} color="#6b7280" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-400 text-sm">Email</Text>
              <Text className="text-white text-base">{user.email}</Text>
            </View>
          </View>

          {/* Full Name */}
          <View className="flex-row items-center">
            <Feather name="user" size={20} color="#6b7280" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-400 text-sm">Full Name</Text>
              {isEditing ? (
                <TextInput
                  className="text-white text-base border-b border-gray-600 py-1"
                  value={editName}
                  onChangeText={setEditName}
                  placeholder="Enter your name"
                  placeholderTextColor="#6b7280"
                />
              ) : (
                <Text className="text-white text-base">{user.fullName}</Text>
              )}
            </View>
          </View>

          {/* Phone */}
          {user.phone && (
            <View className="flex-row items-center">
              <Feather name="phone" size={20} color="#6b7280" />
              <View className="ml-3 flex-1">
                <Text className="text-gray-400 text-sm">Phone</Text>
                <Text className="text-white text-base">{user.phone}</Text>
              </View>
            </View>
          )}

          {/* Member Since */}
          <View className="flex-row items-center">
            <Feather name="calendar" size={20} color="#6b7280" />
            <View className="ml-3 flex-1">
              <Text className="text-gray-400 text-sm">Member Since</Text>
              <Text className="text-white text-base">
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        {isEditing && (
          <TouchableOpacity
            onPress={handleSaveProfile}
            disabled={isLoadingUpdateProfile}
            className="bg-[#615eff] rounded-xl p-4 items-center mt-6"
          >
            <Text className="text-black text-lg font-semibold">
              {isLoadingUpdateProfile ? 'Saving...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
