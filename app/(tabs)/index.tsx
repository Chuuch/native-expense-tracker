import { Feather } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
// @ts-ignore
import me from "@/assets/images/me.png";
import BankCard from "@/components/BankCard";
import DailyTip from "@/components/DailyTip";
import QuickActions from "@/components/QuickActions";
import RecentTransactions from "@/components/RecentTransactions";
import SavingsGoal from "@/components/SavingsGoal";

export default function DashboardScreen() {
  return (
    <View className="flex-1 bg-stone-950 pt-20">
      {/* Header */}
      <View className="flex-row items-end justify-start w-full gap-2 p-4">
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-end justify-center gap-4">
            <View className="bg-[#CBFD03] rounded-full p-2">
              <Feather name="bar-chart-2" size={30} color="black" />
            </View>
            <Text className="text-white text-4xl font-bold">Dashboard</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <Image
              source={me}
              alt="Profile"
              className="w-12 h-12 object-contain self-center rounded-full"
            />
          </View>
        </View>
      </View>

      <ScrollView
        className="flex-1 bg-stone-950 px-4"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >
        {/* Balance Summary Card */}
        <BankCard />
        {/* Quick Actions */}
        <QuickActions />
        {/* Recent Transactions */}
        <RecentTransactions />

        {/* Savings Goals */}
        <SavingsGoal />

        {/* Tip of the Day */}
        <DailyTip />
      </ScrollView>
    </View>
  );
}
