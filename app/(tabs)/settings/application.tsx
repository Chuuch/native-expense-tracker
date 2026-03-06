import vault from '@/assets/lottie/vault.json';
import { useTheme } from '@/contexts/ThemeContext';
import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const appFeatures = [
  {
    id: 'expense-tracking',
    title: 'Expense Tracking',
    description: 'Track your daily expenses and income with detailed categorization',
    icon: MaterialIcons,
    iconName: 'account-balance-wallet' as const,
    color: '#615eff'
  },
  {
    id: 'savings-goals',
    title: 'Savings Goals',
    description: 'Set and monitor your financial goals with progress tracking',
    icon: MaterialCommunityIcons,
    iconName: 'piggy-bank' as const,
    color: '#615eff'
  },
  {
    id: 'analytics',
    title: 'Analytics & Insights',
    description: 'Get detailed insights into your spending patterns and trends',
    icon: MaterialIcons,
    iconName: 'analytics' as const,
    color: '#615eff'
  },
  {
    id: 'crypto-tracking',
    title: 'Crypto & Stocks',
    description: 'Monitor cryptocurrency and stock prices with real-time updates',
    icon: MaterialCommunityIcons,
    iconName: 'bitcoin' as const,
    color: '#615eff'
  },
  {
    id: 'bank-sync',
    title: 'Bank Sync',
    description: 'Automatically sync with your bank accounts (Premium feature)',
    icon: MaterialIcons,
    iconName: 'account-balance' as const,
    color: '#615eff'
  },
  {
    id: 'export',
    title: 'Data Export',
    description: 'Export your financial data in CSV and PDF formats',
    icon: MaterialIcons,
    iconName: 'file-download' as const,
    color: '#615eff'
  }
];

const teamMembers = [
  {
    name: 'Alex Johnson',
    role: 'Founder & CEO',
    description: '10+ years in fintech, passionate about financial literacy'
  },
  {
    name: 'Sarah Chen',
    role: 'Lead Developer',
    description: 'Full-stack developer with expertise in React Native'
  },
  {
    name: 'Mike Rodriguez',
    role: 'Product Designer',
    description: 'UX/UI specialist focused on intuitive financial tools'
  },
  {
    name: 'Emily Davis',
    role: 'Data Analyst',
    description: 'Financial data expert and analytics specialist'
  }
];

const appStats = [
  { label: 'Active Users', value: '50K+' },
  { label: 'Countries', value: '25+' },
  { label: 'App Store Rating', value: '4.8★' },
  { label: 'Total Transactions', value: '2M+' }
];

export default function ApplicationScreen() {
  const { colors, tint } = useTheme();
  const router = useRouter();
  
  // Load Oswald fonts
  const [fontsLoaded] = Font.useFonts({
    'Oswald-Bold': require('../../../assets/fonts/Oswald-Bold.ttf'),
    'Oswald-Regular': require('../../../assets/fonts/Oswald-Regular.ttf'),
  });

  return (
    <View className={`flex-1 ${colors.background} pt-20`}>
      {/* Header */}
      <View className='flex-row items-center justify-between w-full p-4'>
        <TouchableOpacity 
          className={`${colors.card} rounded-xl p-2`}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color={tint.text} />
        </TouchableOpacity>
        <Text className={`${colors.text} text-4xl font-bold`}>About App</Text>
        <TouchableOpacity className={`${colors.card} rounded-xl p-2`}>
          <Feather name="info" size={24} color={tint.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* App Logo and Basic Info */}
        <View className={`flex flex-col items-center justify-center w-full ${colors.card} rounded-xl py-6`}>
            <LottieView source={vault} autoPlay loop style={{ width: 200, height: 200 }} />
          <Text 
            className={`${colors.text} text-2xl font-bold mb-2`}
            style={{ 
              fontFamily: fontsLoaded ? 'Oswald-Bold' : 'System',
              letterSpacing: 1
            }}
          >
            MoneyMate
          </Text>
          <Text className={`${colors.textSecondary} text-base mb-4`}>Your Personal Finance Companion</Text>
          <View className='flex-row items-center gap-4'>
            <Text className={`${colors.text} text-sm font-semibold`}>Version 1.0.0</Text>
            <Text className={`${colors.textSecondary} text-sm`}>Build 153</Text>
          </View>
        </View>

        {/* App Stats */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>App Statistics</Text>
          <View className={`${colors.card} rounded-xl p-4`}>
            <View className='grid grid-cols-2 gap-4'>
              {appStats.map((stat, index) => (
                <View key={index} className={`${colors.cardSecondary} rounded-xl p-4 items-center`}>
                  <Text className={`${colors.text} text-2xl font-bold`}>{stat.value}</Text>
                  <Text className={`${colors.textSecondary} text-sm text-center mt-1`}>{stat.label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* App Description */}
          <View className={`w-full ${colors.card} rounded-xl p-6`}>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>About Expense Tracker</Text>
          <Text className={`${colors.textSecondary} text-base leading-6 mb-4`}>
            Expense Tracker is a comprehensive personal finance management app designed to help you take control of your financial life. Whether you're tracking daily expenses, setting savings goals, or monitoring your investments, we provide the tools you need to make informed financial decisions.
          </Text>
          <Text className={`${colors.textSecondary} text-base leading-6`}>
            Our mission is to make financial management accessible, intuitive, and secure for everyone. We believe that understanding your finances is the first step toward financial freedom.
          </Text>
        </View>

        {/* Key Features */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Key Features</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-3`}>
            {appFeatures.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <View key={feature.id} className={`flex-row items-start gap-3 p-3 rounded-lg ${colors.cardSecondary}`}>
                  <View className={`${colors.cardSecondary} rounded-full p-2 mt-1`}>
                    <IconComponent name={feature.iconName as any} size={20} color={feature.color} />
                  </View>
                  <View className='flex-1'>
                    <Text className={`${colors.text} text-base font-semibold`}>{feature.title}</Text>
                    <Text className={`${colors.textSecondary} text-sm mt-1`}>{feature.description}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Development Team */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Our Team</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            {teamMembers.map((member, index) => (
              <View key={index} className={`flex-row items-start gap-3 p-3 rounded-lg ${colors.cardSecondary}`}>
                <View className={`${colors.accent} rounded-full w-12 h-12 items-center justify-center`}>
                  <Text className='text-white text-lg font-bold'>
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View className='flex-1'>
                  <Text className={`${colors.text} text-base font-semibold`}>{member.name}</Text>
                  <Text className={`${colors.text} text-sm font-semibold`}>{member.role}</Text>
                  <Text className={`${colors.textSecondary} text-sm mt-1`}>{member.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Technical Information */}
        <View className='w-full'>
            <Text className={`${colors.text} text-xl font-bold mb-4`}>Technical Information</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-3`}>
            <View className={`flex-row items-center justify-between p-3 rounded-lg ${colors.cardSecondary}`}>
              <Text className={`${colors.text} text-base`}>Platform</Text>
              <Text className={`${colors.textSecondary} text-sm`}>React Native / Expo</Text>
            </View>
              <View className={`flex-row items-center justify-between p-3 rounded-lg ${colors.cardSecondary}`}>
              <Text className={`${colors.text} text-base`}>Minimum OS Version</Text>
              <Text className={`${colors.textSecondary} text-sm`}>iOS 13.0 / Android 8.0</Text>
            </View>
            <View className={`flex-row items-center justify-between p-3 rounded-lg ${colors.cardSecondary}`}>
                <Text className={`${colors.text} text-base`}>App Size</Text>
              <Text className={`${colors.textSecondary} text-sm`}>45.2 MB</Text>
            </View>
            <View className={`flex-row items-center justify-between p-3 rounded-lg ${colors.cardSecondary}`}>
              <Text className={`${colors.text} text-base`}>Last Updated</Text>
              <Text className={`${colors.textSecondary} text-sm`}>{new Date().toLocaleDateString()}</Text>
            </View>
          </View>
        </View>

        {/* Links and Actions */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>More Information</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-3`}>
            <TouchableOpacity className={`flex-row items-center justify-between p-3 rounded-lg ${colors.cardSecondary}`}>
              <View className='flex-row items-center gap-3'>
                <Feather name="file-text" size={20} color="#615eff" />
                <Text className={`${colors.text} text-base`}>Terms of Service</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#615eff" />
            </TouchableOpacity>
            
            <TouchableOpacity className={`flex-row items-center justify-between p-3 rounded-lg ${colors.cardSecondary}`}>
              <View className='flex-row items-center gap-3'>
                <Feather name="shield" size={20} color="#615eff" />
                <Text className={`${colors.text} text-base`}>Privacy Policy</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#615eff" />
            </TouchableOpacity>
            
            <TouchableOpacity className={`flex-row items-center justify-between p-3 rounded-lg ${colors.cardSecondary}`}>
              <View className='flex-row items-center gap-3'>
                <Feather name="github" size={20} color="#615eff" />
                <Text className={`${colors.text} text-base`}>Open Source Licenses</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#615eff" />
            </TouchableOpacity>
            
            <TouchableOpacity className={`flex-row items-center justify-between p-3 rounded-lg ${colors.cardSecondary}`}>
              <View className='flex-row items-center gap-3'>
                <Feather name="mail" size={20} color="#615eff" />
                <Text className={`${colors.text} text-base`}>Contact Support</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#615eff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Copyright */}
        <View className={`w-full ${colors.card} rounded-xl p-4 mb-20`}>
          <Text className={`${colors.textSecondary} text-sm text-center`}>
            © 2025 Expense Tracker. All rights reserved.  
          </Text>
          <Text className={`${colors.textSecondary} text-xs text-center mt-2`}>
            Made with ❤️ for better financial management
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
