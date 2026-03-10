import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const subscriptionPlans = [
  {
    id: 'free',
    name: 'Free Plan',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started with basic expense tracking',
    features: [
      'Manual expense & income tracking',
      '1 savings goal',
      'Basic analytics (monthly totals)',
      'Up to 10 crypto/stock watchlist items',
      'Small banner ads'
    ],
    limitations: [
      'Limited to 100 transactions',
      'No bank sync',
      'No export features',
      'No price alerts'
    ],
    isCurrent: true,
    isPopular: false,
    color: 'bg-gray-200'
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: '$3.99',
    period: 'per month',
    description: 'For serious savers who want advanced features',
    features: [
      'Unlimited transactions & categories',
      'Unlimited savings goals',
      'Advanced analytics & insights',
      'Bank account sync',
      'Export to CSV/PDF',
      'Price alerts (up to 5 assets)',
      'Ad-free experience',
      'Priority support'
    ],
    limitations: [],
    isCurrent: false,
    isPopular: true,
    color: 'bg-white',
    textColor: 'text-black'
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '$7.99',
    period: 'per month',
    description: 'For investors who want maximum control and insights',
    features: [
      'Everything in Premium',
      'Unlimited price alerts',
      'Multi-condition alerts',
      'Portfolio tracker',
      'Exclusive market insights',
      'Weekly digest emails',
      'Early access to new features',
      'Dedicated account manager'
    ],
    limitations: [],
    isCurrent: false,
    isPopular: false,
    color: 'bg-white',
    textColor: 'text-black'
  }
];

export default function SubscriptionScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('premium');
  const { colors } = useTheme();
  return (
    <View className={`flex-1 ${colors.background} pt-20`}>
      {/* Header */}
      <View className='flex-row items-center justify-between w-full p-4'>
        <TouchableOpacity 
          className={`${colors.card} rounded-xl p-2`}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#615eff" />
        </TouchableOpacity>
        <View className='flex-row items-center'>
          <Text className={`${colors.text} text-5xl font-bold`}>Plans</Text>
        </View>
        <TouchableOpacity className={`${colors.card} rounded-xl p-2`}>
          <Feather name="help-circle" size={24} color="#615eff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Current Plan Status */}
        <View className={`w-full ${colors.card} rounded-xl p-6`}>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className={`${colors.text} text-xl font-bold`}>Current Plan</Text>
            <View className={`${colors.accent} rounded-xl px-3 py-1`}>
              <Text className='text-white text-sm font-semibold'>Free Plan</Text>
            </View>
          </View>
          <Text className={`${colors.textSecondary} text-base mb-4`}>
            You're currently on the Free plan. Upgrade to unlock premium features and take control of your finances.
          </Text>
          <View className='flex-row items-center gap-2'>
            <Feather name="calendar" size={16} color="#615eff" />
            <Text className='text-[#615eff] text-sm font-semibold'>Next billing: Never (Free plan)</Text>
          </View>
        </View>

        {/* Plans Carousel */}
        <View className='w-full'>
          <Text className='text-indigo-500 text-2xl font-bold mb-6'>Choose Your Plan</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
            className='mb-8'
            pagingEnabled={true}
            snapToInterval={304}
            snapToAlignment="start"
            decelerationRate="fast"
          >
            {subscriptionPlans.map((plan) => (
              <View 
                key={plan.id} 
                className={`${plan.color} rounded-xl p-6 mr-4 w-[300px] ${
                  plan.isPopular ? '' : ''
                }`}
              >
                {/* Plan Header */}
                <View className='mb-6'>
                  {plan.isPopular && (
                    <View className='bg-[#615eff] rounded-full px-3 py-1 self-start mb-3'>
                      <Text className='text-white text-xs font-bold'>MOST POPULAR</Text>
                    </View>
                  )}
                  <Text className={`text-2xl font-bold mb-2 ${plan.textColor || 'text-gray-900'}`}>
                    {plan.name}
                  </Text>
                  <View className='flex-row items-baseline mb-2'>
                    <Text className={`text-4xl font-bold ${plan.textColor || 'text-gray-900'}`}>
                      {plan.price}
                    </Text>
                    <Text className={`text-base ml-1 ${plan.textColor || 'text-gray-900'} opacity-70`}>
                      /{plan.period}
                    </Text>
                  </View>
                  <Text className={`text-sm ${plan.textColor || 'text-gray-900'} opacity-70`}>
                    {plan.description}
                  </Text>
                </View>

                {/* Features */}
                <View className='mb-6'>
                  <Text className={`text-lg font-semibold mb-3 ${plan.textColor || 'text-gray-900'}`}>
                    What's included:
                  </Text>
                  {plan.features.map((feature, index) => (
                    <View key={index} className='flex-row items-center mb-2'>
                      <Feather 
                        name="check" 
                        size={16} 
                        color={plan.textColor === 'text-black' ? '#615eff' : '#615eff'} 
                      />
                      <Text className={`text-sm ml-2 flex-1 ${plan.textColor || 'text-gray-900'} opacity-90`}>
                        {feature}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Limitations (for free plan) */}
                {plan.limitations.length > 0 && (
                  <View className='mb-6'>
                    <Text className={`text-lg font-semibold mb-3 ${plan.textColor || 'text-gray-900'}`}>
                      Limitations:
                    </Text>
                    {plan.limitations.map((limitation, index) => (
                      <View key={index} className='flex-row items-center mb-2'>
                        <Feather 
                          name="x" 
                          size={16} 
                          color={plan.textColor === 'text-black' ? '#000' : '#ef4444'} 
                        />
                        <Text className={`text-sm ml-2 flex-1 ${plan.textColor || 'text-gray-900'} opacity-70`}>
                          {limitation}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}

                {/* Action Button */}
                <TouchableOpacity 
                  className={`rounded-xl p-4 items-center ${
                    plan.isCurrent 
                      ? 'bg-indigo-500' 
                      : plan.color === 'bg-[#615eff]' 
                        ? 'bg-white' 
                        : 'bg-[#615eff]'
                  }`}
                  disabled={plan.isCurrent}
                >
                  <Text className={`text-lg font-semibold ${
                    plan.isCurrent 
                      ? 'text-white' 
                      : plan.color === 'bg-[#615eff]' 
                        ? 'text-white' 
                        : 'text-white'
                  }`}>
                    {plan.isCurrent ? 'Current Plan' : 'Choose Plan'}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Plan Comparison */}
        <View className='w-full'>
          <Text className={`${colors.text} text-2xl font-bold mb-4`}>Plan Comparison</Text>
          <View className={`${colors.card} rounded-xl p-4`}>
            <View className='flex-row items-center justify-between mb-4'>
              <Text className={`${colors.text} text-base font-semibold`}>Feature</Text>
              <Text className={`${colors.text} text-base font-semibold`}>Free</Text>
              <Text className={`${colors.text} text-base font-semibold`}>Premium</Text>
              <Text className={`${colors.text} text-base font-semibold`}>Pro</Text>
            </View>
            
            <View className='space-y-3'>
              <View className='flex-row items-center justify-between'>
                <Text className={`${colors.textSecondary} text-sm flex-1`}>Transactions</Text>
                <Text className={`${colors.textSecondary} text-sm text-center flex-1`}>100</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>Unlimited</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>Unlimited</Text>
              </View>
              
              <View className='flex-row items-center justify-between'>
                <Text className={`${colors.textSecondary} text-sm flex-1`}>Savings Goals</Text>
                <Text className={`${colors.textSecondary} text-sm text-center flex-1`}>1</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>Unlimited</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>Unlimited</Text>
              </View>
              
              <View className='flex-row items-center justify-between'>
                <Text className={`${colors.textSecondary} text-sm flex-1`}>Price Alerts</Text>
                <Text className={`${colors.textSecondary} text-sm text-center flex-1`}>0</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>5</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>Unlimited</Text>
              </View>
              
              <View className='flex-row items-center justify-between'>
                <Text className={`${colors.textSecondary} text-sm flex-1`}>Bank Sync</Text>
                <Text className={`${colors.textSecondary} text-sm text-center flex-1`}>✗</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>✓</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>✓</Text>
              </View>
              
              <View className='flex-row items-center justify-between'>
                <Text className={`${colors.textSecondary} text-sm flex-1`}>Export Data</Text>
                <Text className={`${colors.textSecondary} text-sm text-center flex-1`}>✗</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>✓</Text>
                <Text className='text-[#615eff] text-sm text-center flex-1'>✓</Text>
              </View>
            </View>
          </View>
        </View>

        {/* FAQ Section */}
        <View className='w-full'>
          <Text className={`${colors.text} text-2xl font-bold mb-4`}>Frequently Asked Questions</Text>
          <View className='space-y-4 gap-4'>
            <View className={`${colors.card} rounded-xl p-4`}>
              <Text className={`${colors.text} text-base font-semibold mb-2`}>Can I cancel anytime?</Text>
              <Text className={`${colors.textSecondary} text-sm`}>Yes, you can cancel your subscription at any time. You'll continue to have access until the end of your billing period.</Text>
            </View>
            
            <View className={`${colors.card} rounded-xl p-4`}>
              <Text className={`${colors.text} text-base font-semibold mb-2`}>Is there a free trial?</Text>
              <Text className={`${colors.textSecondary} text-sm`}>Yes! All paid plans come with a 7-day free trial. No credit card required to start.</Text>
            </View>
            
            <View className={`${colors.card} rounded-xl p-4`}>
              <Text className={`${colors.text} text-base font-semibold mb-2`}>Can I change plans?</Text>
              <Text className={`${colors.textSecondary} text-sm`}>Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately.</Text>
            </View>
          </View>
        </View>

        {/* Contact Support */}
        <View className={`w-full ${colors.card} rounded-xl p-4 items-center`}>
          <Text className={`${colors.text} text-base font-semibold mb-2`}>Need Help?</Text>
          <Text className={`${colors.textSecondary} text-sm text-center mb-4`}>
            Our support team is here to help you choose the right plan
          </Text>
          <TouchableOpacity className={`${colors.accent} rounded-xl px-6 py-3`}>
            <Text className={`${colors.textButton} text-base font-semibold`}>Contact Support</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
