import { Feather, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ThemeMode, themes, useTheme } from '../../../contexts/ThemeContext';

export default function DarkModeScreen() {
  const router = useRouter();
  const { currentTheme, themeMode, setThemeMode, colors } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<ThemeMode>(themeMode);

  const handleThemeSelect = (themeId: ThemeMode) => {
    setSelectedTheme(themeId);
  };

  const handleApplyTheme = () => {
    setThemeMode(selectedTheme);
  };

  return (
    <View className={`flex-1 ${colors.background} pt-20`}>
      {/* Header */}
      <View className="flex-row items-center justify-between w-full p-4">
        <TouchableOpacity 
          className={`${colors.card} rounded-xl p-2`}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#615eff" />
        </TouchableOpacity>
        <Text className='text-indigo-500 dark:text-white text-4xl font-bold'>Appearance</Text>
        <TouchableOpacity className={`${colors.card} rounded-xl p-2`}>
          <Feather name="info" size={24} color="#615eff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Description */}
        <View className={`w-full ${colors.card} rounded-xl p-4`}>
          <View className="flex-row items-start gap-3">
            <Ionicons name="information-circle-outline" size={24} color="#615eff" />
            <View className="flex-1">
              <Text className={`${colors.text} text-base font-semibold mb-1`}>Theme Settings</Text>
              <Text className={`${colors.textSecondary} text-sm`}>
                Choose your preferred theme. The app will remember your selection and apply it across all screens.
              </Text>
            </View>
          </View>
        </View>

        {/* Theme Options */}
        <View className="w-full">
          <Text className={`${colors.text} text-2xl font-bold mb-4`}>Theme Options</Text>
          <View className="gap-4">
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.id}
                className={`w-full ${colors.card} rounded-xl p-4 border-2 ${
                  selectedTheme === theme.id ? 'border-[#615eff]' : colors.border
                }`}
                onPress={() => handleThemeSelect(theme.id)}
                activeOpacity={0.8}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-4 flex-1">
                    <View className={`${theme.colors.accent} rounded-full p-3`}>
                      <Feather name={theme.id === 'auto' ? 'smartphone' : theme.id === 'oled' ? 'monitor' : theme.id === 'light' ? 'sun' : 'moon'} size={24} color="white" />
                    </View>
                    <View className="flex-1">
                      <Text className={`${colors.text} text-lg font-semibold`}>{theme.name}</Text>
                      <Text className={`${colors.textSecondary} text-sm`}>{theme.description}</Text>
                    </View>
                  </View>
                  <View className="items-end">
                    {selectedTheme === theme.id && (
                      <View className="bg-[#615eff] rounded-full p-1">
                        <Feather name="check" size={16} color="white" />
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
          <Text className={`${colors.text} text-2xl font-bold mb-4`}>Preview</Text>
          <View className={`${colors.card} rounded-xl p-6`}>
            <Text className={`${colors.textSecondary} text-sm mb-4`}>How your app will look with the selected theme:</Text>
            <View className="items-center">
              {(() => {
                const selectedThemeOption = themes.find(theme => theme.id === selectedTheme);
                if (!selectedThemeOption) return null;
                
                return (
                  <View className={`${selectedThemeOption.colors.background} rounded-xl p-6 border-2 border-[#615eff] w-full max-w-sm`}>
                    {/* Header */}
                    <View className="flex-row items-center justify-between mb-4">
                      <View className="flex-row items-center gap-3">
                        <View className={`${selectedThemeOption.colors.accent} rounded-full p-2`}>
                          <Feather name="bar-chart-2" size={20} color="white" />
                        </View>
                        <Text className={`${selectedThemeOption.colors.text} text-lg font-semibold`}>Dashboard</Text>
                      </View>
                      <View className={`w-8 h-8 rounded-full ${selectedThemeOption.colors.card}`} />
                    </View>

                    {/* Balance Card */}
                    <View className={`${selectedThemeOption.colors.card} rounded-xl p-4 mb-4`}>
                      <Text className={`${selectedThemeOption.colors.textSecondary} text-sm mb-2`}>Total Balance</Text>
                      <Text className={`${selectedThemeOption.colors.text} text-2xl font-bold mb-2`}>$2,450.75</Text>
                      <View className="flex-row items-center gap-2">
                        <Feather name="trending-up" size={16} color={selectedThemeOption.colors.accent.includes('CBFD03') ? '#615eff' : '#22c55e'} />
                        <Text className={`${selectedThemeOption.colors.text} text-sm font-semibold`}>+$125.50</Text>
                      </View>
                    </View>

                    {/* Quick Actions */}
                    <View className="flex-row gap-3">
                      <View className={`${selectedThemeOption.colors.accent} rounded-xl p-3 flex-1 items-center`}>
                        <Feather name="plus" size={20} color="white" />
                        <Text className="text-white text-sm font-semibold mt-1">Add</Text>
                      </View>
                      <View className={`${selectedThemeOption.colors.accent} rounded-xl p-3 flex-1 items-center`}>
                        <Feather name="dollar-sign" size={20} color="white" />
                        <Text className="text-white text-sm font-semibold mt-1">Income</Text>
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
          <Text className={`${colors.text} text-2xl font-bold mb-4`}>Additional Settings</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-blue-500 rounded-full p-2">
                  <Feather name="eye" size={20} color="white" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Reduce Motion</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Minimize animations for accessibility</Text>
                </View>
              </View>
              <TouchableOpacity className={`${colors.border} rounded-full p-1`}>
                <View className={`w-5 h-5 rounded-full ${colors.textSecondary.replace('text-', 'bg-')}`} />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-green-500 rounded-full p-2">
                  <Feather name="eye-off" size={20} color="white" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>High Contrast</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Increase contrast for better visibility</Text>
                </View>
              </View>
              <TouchableOpacity className={`${colors.border} rounded-full p-1`}>
                <View className={`w-5 h-5 rounded-full ${colors.textSecondary.replace('text-', 'bg-')}`} />
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="bg-purple-500 rounded-full p-2">
                  <Feather name="type" size={20} color="white" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Large Text</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Increase font size for better readability</Text>
                </View>
              </View>
              <TouchableOpacity className={`${colors.border} rounded-full p-1`}>
                <View className={`w-5 h-5 rounded-full ${colors.textSecondary.replace('text-', 'bg-')}`} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <TouchableOpacity 
          className="w-full bg-[#615eff] rounded-xl p-4 items-center mb-20"
          onPress={handleApplyTheme}
        >
          <Text className="text-white text-lg font-bold">Apply Theme</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
