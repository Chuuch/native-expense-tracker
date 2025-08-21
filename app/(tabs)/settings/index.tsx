import AccountSettings from "@/components/AccountSettings";
import LegalSettings from "@/components/LegalSettings";
import LogoutButton from "@/components/LogoutButton";
import PreferenceSettings from "@/components/PreferenceSettings";
import SupportSettings from "@/components/SupportSettings";
import {
  legalItems,
  preferencesItems,
  settingsItems,
  settingsRouter,
  supportItems,
} from "@/constants/settings";
import { useTheme } from "@/contexts/ThemeContext";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, View } from "react-native";

export default function SettingsScreen() {
  const { colors } = useTheme();
  
  return (
    <View className={`flex-1 ${colors.background} pt-20`}>
      {/* Header */}
      <View className="flex-row items-end justify-start w-full gap-2 p-4">
        <View className="bg-[#CBFD03] rounded-full p-2">
          <SimpleLineIcons name="settings" size={30} color="black" />
        </View>
        <Text className={`${colors.text} text-4xl font-bold`}>Settings</Text>
      </View>

      <ScrollView
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >
        {/* Account Section */}
        <AccountSettings
          settingsItems={settingsItems}
          handleSettingPress={settingsRouter}
        />

        {/* Preferences Section */}
        <PreferenceSettings
          preferencesItems={preferencesItems}
          handleSettingPress={settingsRouter}
        />

        {/* Support Section */}
        <SupportSettings
          supportItems={supportItems}
          handleSettingPress={settingsRouter}
        />

        {/* Legal Section */}
        <LegalSettings
          legalItems={legalItems}
          handleSettingPress={settingsRouter}
        />

        {/* Logout Button */}
        <LogoutButton />
      </ScrollView>
    </View>
  );
}
