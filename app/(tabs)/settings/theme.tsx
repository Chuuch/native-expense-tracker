import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface ThemeOption {
  id: string;
  name: string;
  description: string;
  icon: keyof typeof Feather.glyphMap;
  isActive: boolean;
  previewColors: {
    background: string;
    card: string;
    text: string;
    accent: string;
  };
}

const themeOptions: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Dark Mode',
    description: 'Classic dark theme with high contrast',
    icon: 'moon',
    isActive: true,
    previewColors: {
      background: 'bg-stone-950',
      card: 'bg-stone-800',
      text: 'text-white',
      accent: 'bg-[#CBFD03]'
    }
  },
  {
    id: 'light',
    name: 'Light Mode',
    description: 'Clean light theme for daytime use',
    icon: 'sun',
    isActive: false,
    previewColors: {
      background: 'bg-white',
      card: 'bg-gray-100',
      text: 'text-gray-900',
      accent: 'bg-[#CBFD03]'
    }
  },
  {
    id: 'auto',
    name: 'Auto',
    description: 'Follows your system settings',
    icon: 'smartphone',
    isActive: false,
    previewColors: {
      background: 'bg-stone-950',
      card: 'bg-stone-800',
      text: 'text-white',
      accent: 'bg-[#CBFD03]'
    }
  },
  {
    id: 'oled',
    name: 'OLED Black',
    description: 'True black for OLED screens',
    icon: 'monitor',
    isActive: false,
    previewColors: {
      background: 'bg-black',
      card: 'bg-gray-900',
      text: 'text-white',
      accent: 'bg-[#CBFD03]'
    }
  }
];

export default function DarkModeScreen() {
  const router = useRouter();
  const [selectedTheme, setSelectedTheme] = useState<string>('dark');

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
  };



  return (
    <ScrollView 
      className="flex-1 bg-stone-950"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View className="flex items-center justify-start bg-stone-950 p-4 top-20 gap-8">
        {/* Header */}
        <View className="flex-row items-center justify-between w-full">
          <TouchableOpacity 
            className="bg-stone-800 rounded-xl p-2"
            onPress={() => router.back()}
          >
            <Feather name="arrow-left" size={24} color="#CBFD03" />
          </TouchableOpacity>
          <Text className="text-white text-4xl font-bold">Appearance</Text>
          <TouchableOpacity className="bg-stone-800 rounded-xl p-2">
            <Feather name="info" size={24} color="#CBFD03" />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <View className="w-full bg-stone-800 rounded-xl p-4">
          <View className="flex-row items-start gap-3">
            <Ionicons name="information-circle-outline" size={24} color="#CBFD03" />
            <View className="flex-1">
              <Text className="text-white text-base font-semibold mb-1">Theme Settings</Text>
              <Text className="text-gray-400 text-sm">
                Choose your preferred theme. The app will remember your selection and apply it across all screens.
              </Text>
            </View>
          </View>
        </View>

        {/* Theme Options */}
        <View className="w-full">
          <Text className="text-white text-2xl font-bold mb-4">Theme Options</Text>
          <View className="gap-4">
            {themeOptions.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                className={`w-full bg-stone-800 rounded-xl p-4 border-2 ${
                  selectedTheme === theme.id ? 'border-[#CBFD03]' : 'border-stone-700'
                }`}
                onPress={() => handleThemeSelect(theme.id)}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className={`${theme.previewColors.accent} rounded-full p-3`}>
                      <Feather name={theme.icon} size={24} color="black" />
                    </View>
                    <View className="flex-1">
                      <Text className="text-white text-lg font-semibold">{theme.name}</Text>
                      <Text className="text-gray-400 text-sm">{theme.description}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    {selectedTheme === theme.id && (
                      <View className="bg-[#CBFD03] rounded-full p-1">
                        <Feather name="check" size={16} color="black" />
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Theme Preview */}
        <View className="w-full">
          <Text className="text-white text-2xl font-bold mb-4">Preview</Text>
          <View className="bg-stone-800 rounded-xl p-6">
            <Text className="text-gray-400 text-sm mb-4">How your app will look with the selected theme:</Text>
            <View className="items-center">
              {(() => {
                const selectedThemeOption = themeOptions.find(theme => theme.id === selectedTheme);
                if (!selectedThemeOption) return null;
                
                return (
                  <View className={`${selectedThemeOption.previewColors.background} rounded-xl p-6 border-2 border-[#CBFD03] w-full max-w-sm`}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-4">
                      <View className="flex-row items-center gap-3">
                        <View className={`${selectedThemeOption.previewColors.accent} rounded-full p-2`}>
                          <Feather name="bar-chart-2" size={20} color="black" />
                        </View>
                        <Text className={`${selectedThemeOption.previewColors.text} text-lg font-semibold`}>Dashboard</Text>
                      </View>
                      <View className={`w-8 h-8 rounded-full ${selectedThemeOption.previewColors.card}`} />
                    </View>

                    {/* Balance Card */}
                    <View className={`${selectedThemeOption.previewColors.card} rounded-xl p-4 mb-4`}>
                      <Text className={`${selectedThemeOption.previewColors.text} text-sm mb-2`}>Total Balance</Text>
                      <Text className={`${selectedThemeOption.previewColors.accent} text-2xl font-bold mb-2`}>$2,450.75</Text>
                      <View className="flex-row items-center gap-2">
                        <Feather name="trending-up" size={16} color={selectedThemeOption.previewColors.accent.includes('CBFD03') ? '#CBFD03' : '#22c55e'} />
                        <Text className={`${selectedThemeOption.previewColors.accent} text-sm font-semibold`}>+$125.50</Text>
                      </View>
                    </View>

                    {/* Quick Actions */}
                    <View className="flex-row gap-3">
                      <View className={`${selectedThemeOption.previewColors.accent} rounded-xl p-3 flex-1 items-center`}>
                        <Feather name="plus" size={20} color="black" />
                        <Text className="text-black text-sm font-semibold mt-1">Add</Text>
                      </View>
                      <View className={`${selectedThemeOption.previewColors.accent} rounded-xl p-3 flex-1 items-center`}>
                        <Feather name="dollar-sign" size={20} color="black" />
                        <Text className="text-black text-sm font-semibold mt-1">Income</Text>
                      </View>
                    </View>
                  </View>
                );
              })()}
            </View>
          </View>
        </View>

        {/* Additional Settings */}
        <View className="w-full">
          <Text className="text-white text-2xl font-bold mb-4">Additional Settings</Text>
          <View className="bg-stone-800 rounded-xl p-4 gap-4">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-blue-500 rounded-full p-2">
                  <Feather name="eye" size={20} color="white" />
                </View>
                <View>
                  <Text className="text-white text-base font-semibold">Reduce Motion</Text>
                  <Text className="text-gray-400 text-sm">Minimize animations for accessibility</Text>
                </View>
              </View>
              <TouchableOpacity className="bg-stone-700 rounded-full p-1">
                <View className="w-5 h-5 rounded-full bg-stone-600" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-green-500 rounded-full p-2">
                  <Feather name="eye-off" size={20} color="white" />
                </View>
                <View>
                  <Text className="text-white text-base font-semibold">High Contrast</Text>
                  <Text className="text-gray-400 text-sm">Increase contrast for better visibility</Text>
                </View>
              </View>
              <TouchableOpacity className="bg-stone-700 rounded-full p-1">
                <View className="w-5 h-5 rounded-full bg-stone-600" />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-purple-500 rounded-full p-2">
                  <Feather name="type" size={20} color="white" />
                </View>
                <View>
                  <Text className="text-white text-base font-semibold">Large Text</Text>
                  <Text className="text-gray-400 text-sm">Increase font size for better readability</Text>
                </View>
              </View>
              <TouchableOpacity className="bg-stone-700 rounded-full p-1">
                <View className="w-5 h-5 rounded-full bg-stone-600" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity className="w-full bg-[#CBFD03] rounded-xl p-4 items-center mb-20">
          <Text className="text-black text-lg font-bold">Apply Theme</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
