  import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTheme } from '@/contexts/ThemeContext';
import React from 'react'
import { Text, View } from 'react-native'

export default function AnalyticsInsights() {
  const { colors } = useTheme();
  return (
    <View className='w-full'>
          <Text className={`${colors.text} text-2xl font-bold mb-4`}>Insights</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            <View className='flex-row items-start gap-3'>
              <Ionicons name="trending-up" size={24} color="#615eff" />
              <View className='flex-1'>
                <Text className={`${colors.text} text-base font-semibold mb-1`}>Spending Increased</Text>
                <Text className={`${colors.textSecondary} text-sm`}>Your food spending is 15% higher than last month. Consider meal planning to reduce costs.</Text>
              </View>
            </View>
            
            <View className='flex-row items-start gap-3'>
              <MaterialCommunityIcons name="target" size={24} color="#615eff" />
              <View className='flex-1'>
                <Text className={`${colors.text} text-base font-semibold mb-1`}>Budget Alert</Text>
                <Text className={`${colors.textSecondary} text-sm`}>You&apos;re on track to exceed your monthly budget by $150. Consider reducing non-essential expenses.</Text>
              </View>
            </View>
            
            <View className='flex-row items-start gap-3'>
              <Feather name="award" size={24} color="#615eff" />
              <View className='flex-1'>
                <Text className={`${colors.text} text-base font-semibold mb-1`}>Great Job!</Text>
                <Text className={`${colors.textSecondary} text-sm`}>You&apos;ve saved 23% more this month compared to last month. Keep up the good work!</Text>
              </View>
            </View>
          </View>
        </View> 
  )
}