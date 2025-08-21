import { Ionicons } from "@expo/vector-icons";
import { Image, ScrollView, Text, View } from "react-native";
// @ts-ignore
import me from "@/assets/images/me.png";
import AnalyticsInsights from "@/components/AnalyticsInsights";
import AnalyticsPeriodPicker from "@/components/AnalyticsPeriodPicker";
import AnalyticsSummaryCards from "@/components/AnalyticsSummaryCards";
import CategoryBreakdown from "@/components/CategoryBreakdown";
import ExportAnalytics from "@/components/ExportAnalytics";
import MonthlyTrendGraph from "@/components/MonthlyTrendGraph";
import { useTheme } from "@/contexts/ThemeContext";

export default function AnalyticsScreen() {
  const { colors } = useTheme();
  
  return (
    <View className={`flex-1 ${colors.background} pt-20`}>
      {/* Header */}
      <View className="flex-row items-end justify-start w-full gap-2 p-4">
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-end justify-center gap-4">
            <View className="bg-[#CBFD03] rounded-full p-2">
              <Ionicons name="pie-chart-outline" size={30} color="black" />
            </View>
            <Text className={`${colors.text} text-4xl font-bold`}>Analytics</Text>
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
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >
        {/* Time Period Selector */}
        <AnalyticsPeriodPicker />

        {/* Summary Cards */}
        <AnalyticsSummaryCards />

        {/* Category Breakdown */}
        <CategoryBreakdown />
        {/* Monthly Trend */}
        <MonthlyTrendGraph />

        {/* Insights */}
        <AnalyticsInsights />

        {/* Export Options */}
        <ExportAnalytics />
      </ScrollView>
    </View>
  );
}
