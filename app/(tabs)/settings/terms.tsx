import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const termsSections = [
  {
    id: 'acceptance',
    title: '1. Acceptance of Terms',
    content: `By downloading, installing, or using the Expense Tracker app ("the App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use the App.

These Terms constitute a legally binding agreement between you and Expense Tracker regarding your use of the App.`
  },
  {
    id: 'description',
    title: '2. Description of Service',
    content: `The App is a personal finance management tool that allows users to:
• Track income and expenses
• Set and monitor savings goals
• Analyze spending patterns
• Monitor cryptocurrency and stock prices
• Export financial data
• Sync with bank accounts (Premium features)

The App is provided "as is" and we reserve the right to modify or discontinue any features at any time.`
  },
  {
    id: 'registration',
    title: '3. User Registration and Accounts',
    content: `To use certain features of the App, you must create an account. You agree to:
• Provide accurate, current, and complete information
• Maintain and update your account information
• Keep your login credentials secure
• Notify us immediately of any unauthorized use
• Accept responsibility for all activities under your account

You must be at least 13 years old to create an account. If you are under 18, you must have parental consent.`
  },
  {
    id: 'privacy',
    title: '4. Privacy and Data Protection',
    content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using the App, you consent to our Privacy Policy.

We implement industry-standard security measures to protect your data, but no method of transmission over the internet is 100% secure.`
  },
  {
    id: 'usage',
    title: '5. Acceptable Use',
    content: `You agree to use the App only for lawful purposes and in accordance with these Terms. You agree not to:
• Use the App for any illegal or unauthorized purpose
• Attempt to gain unauthorized access to our systems
• Interfere with or disrupt the App's functionality
• Share your account credentials with others
• Use automated systems to access the App
• Reverse engineer or attempt to extract source code

Violation of these terms may result in account termination.`
  },
  {
    id: 'subscription',
    title: '6. Subscription and Billing',
    content: `The App offers both free and premium subscription plans:
• Free Plan: Basic features with limitations
• Premium Plan: $3.99/month with advanced features
• Pro Plan: $7.99/month with maximum features

Subscriptions automatically renew unless cancelled. You can cancel anytime through your device's app store settings. Refunds are subject to app store policies.`
  },
  {
    id: 'intellectual',
    title: '7. Intellectual Property Rights',
    content: `The App and its content, including but not limited to text, graphics, logos, and software, are owned by Expense Tracker and protected by copyright, trademark, and other intellectual property laws.

You may not copy, modify, distribute, or create derivative works without our express written consent.`
  },
  {
    id: 'disclaimer',
    title: '8. Disclaimers and Limitations',
    content: `THE APP IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.

We are not responsible for any financial decisions made based on the App's data or recommendations. Always consult with qualified financial advisors.`
  },
  {
    id: 'liability',
    title: '9. Limitation of Liability',
    content: `IN NO EVENT SHALL EXPENSE TRACKER BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE.

Our total liability shall not exceed the amount paid by you for the App in the 12 months preceding the claim.`
  },
  {
    id: 'termination',
    title: '10. Termination',
    content: `We may terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users or the App.

Upon termination, your right to use the App ceases immediately. We may delete your account and data, though we may retain certain information as required by law.`
  },
  {
    id: 'changes',
    title: '11. Changes to Terms',
    content: `We reserve the right to modify these Terms at any time. We will notify users of significant changes through the App or email.

Your continued use of the App after changes become effective constitutes acceptance of the new Terms.`
  },
  {
    id: 'governing',
    title: '12. Governing Law',
    content: `These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to conflict of law principles.

Any disputes shall be resolved in the courts of [Your Jurisdiction].`
  },
  {
    id: 'contact',
    title: '13. Contact Information',
    content: `If you have any questions about these Terms, please contact us at:

Email: legal@expensetracker.com
Address: [Your Company Address]
Phone: [Your Phone Number]

Last updated: ${new Date().toLocaleDateString()}`
  }
];

export default function TermsScreen() {
  const { colors, tint } = useTheme();
  const router = useRouter();
  const [expandedSection, setExpandedSection] = useState<string | null>('acceptance');

  const handleSectionToggle = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

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
        <Text className={`${colors.text} text-4xl font-bold`}>Terms of Service</Text>
        <TouchableOpacity className={`${colors.card} rounded-xl p-2`}>
          <Feather name="info" size={24} color={tint.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Introduction */}
        <View className={`w-full ${colors.card} rounded-xl p-6`}>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Terms of Service</Text>
          <Text className={`${colors.textSecondary} text-base mb-4`}>
            These Terms of Service govern your use of the Expense Tracker app. Please read them carefully before using our service.
          </Text>
          <Text className={`${colors.textSecondary} text-sm`}>
            Last updated: {new Date().toLocaleDateString()}
          </Text>
        </View>

        {/* Terms Sections */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Terms and Conditions</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-2`}>
            {termsSections.map((section) => (
              <View key={section.id} className={`border-b border-[${colors.border}] last:border-b-0`}>
                <TouchableOpacity
                  className='flex-row items-center justify-between w-full p-4'
                  onPress={() => handleSectionToggle(section.id)}
                >
                    <Text className={`${colors.text} text-base font-semibold flex-1 mr-4`}>
                    {section.title}
                  </Text>
                  <Feather 
                    name={expandedSection === section.id ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={tint.text} 
                  />
                </TouchableOpacity>
                {expandedSection === section.id && (
                  <View className='px-4 pb-4'>
                    <Text className={`${colors.textSecondary} text-sm leading-6`}>
                      {section.content}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Acceptance Section */}
        <View className={`w-full ${colors.card} rounded-xl p-6`}>
          <Text className={`${colors.text} text-lg font-semibold mb-4`}>Acceptance of Terms</Text>
          <Text className={`${colors.textSecondary} text-base mb-6`}>
            By using the Expense Tracker app, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
          </Text>
          <View className='flex-row gap-3'>
            <TouchableOpacity className={`${colors.accent} rounded-xl px-6 py-3 flex-1`}>
              <Text className={`${colors.textButton} text-base font-semibold text-center`}>I Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className={`${colors.cardSecondary} rounded-xl px-6 py-3 flex-1`}
              onPress={() => router.back()}
            >
              <Text className={`${colors.text} text-base font-semibold text-center`}>Decline</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contact Legal */}
          <View className={`w-full ${colors.card} rounded-xl p-4`}>
          <Text className={`${colors.text} text-lg font-semibold mb-3`}>Questions?</Text>
          <Text className={`${colors.textSecondary} text-sm mb-4`}>
            If you have any questions about these Terms of Service, please contact our legal team.
          </Text>
          <TouchableOpacity className={`${colors.accent} rounded-xl p-3 items-center`}>
            <Text className={`${colors.textButton} text-base font-semibold`}>Contact Legal Team</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
