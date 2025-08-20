import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const faqCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    icon: Feather,
    iconName: 'play' as const,
    color: '#CBFD03'
  },
  {
    id: 'account',
    title: 'Account & Billing',
    icon: MaterialIcons,
    iconName: 'account-circle' as const,
    color: '#CBFD03'
  },
  {
    id: 'features',
    title: 'Features & Usage',
    icon: Feather,
    iconName: 'zap' as const,
    color: '#CBFD03'
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    icon: MaterialCommunityIcons,
    iconName: 'wrench' as const,
    color: '#CBFD03'
  }
];

const faqs = [
  {
    id: '1',
    category: 'getting-started',
    question: 'How do I add my first expense?',
    answer: 'Tap the + button on the Transactions tab, select "Expense", fill in the details, and save. You can also use the quick add feature for common expenses.'
  },
  {
    id: '2',
    category: 'getting-started',
    question: 'How do I set up a savings goal?',
    answer: 'Go to the Dashboard tab, scroll to "Savings Goals", tap "Add Goal", set your target amount and deadline, then start tracking your progress.'
  },
  {
    id: '3',
    category: 'account',
    question: 'How do I change my subscription plan?',
    answer: 'Go to Settings > Subscription Plan, choose your preferred plan, and follow the upgrade/downgrade process. Changes take effect immediately.'
  },
  {
    id: '4',
    category: 'account',
    question: 'How do I reset my password?',
    answer: 'On the login screen, tap "Forgot Password", enter your email, and follow the reset link sent to your inbox.'
  },
  {
    id: '5',
    category: 'features',
    question: 'How do I export my data?',
    answer: 'Go to Analytics tab, scroll to "Export Report", and choose your preferred format (CSV or PDF). Premium users can export unlimited reports.'
  },
  {
    id: '6',
    category: 'features',
    question: 'How do I set up price alerts?',
    answer: 'Go to the Watchlist section, select an asset, tap the bell icon, and set your target price. Premium users get up to 5 alerts, Pro users get unlimited.'
  },
  {
    id: '7',
    category: 'troubleshooting',
    question: 'The app is not syncing my bank account',
    answer: 'Check your internet connection, ensure your bank credentials are correct, and try reconnecting. Some banks may require additional verification.'
  },
  {
    id: '8',
    category: 'troubleshooting',
    question: 'I can\'t see my recent transactions',
    answer: 'Try pulling down to refresh, check your filters, and ensure you\'re looking at the correct date range. If issues persist, contact support.'
  }
];

const contactOptions = [
  {
    id: 'email',
    title: 'Email Support',
    subtitle: 'Get help via email',
    description: 'We typically respond within 24 hours',
    icon: MaterialIcons,
    iconName: 'email' as const,
    action: 'Send Email'
  },
  {
    id: 'chat',
    title: 'Live Chat',
    subtitle: 'Chat with our support team',
    description: 'Available 24/7 for urgent issues',
    icon: MaterialCommunityIcons,
    iconName: 'chat' as const,
    action: 'Start Chat'
  },
  {
    id: 'phone',
    title: 'Phone Support',
    subtitle: 'Call us directly',
    description: 'Available Mon-Fri, 9AM-6PM EST',
    icon: MaterialIcons,
    iconName: 'phone' as const,
    action: 'Call Now'
  }
];

export default function SupportScreen() {
  const router = useRouter();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleFaqToggle = (faqId: string) => {
    setExpandedFaq(expandedFaq === faqId ? null : faqId);
  };

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory);

  return (
    <View className='flex-1 bg-stone-950 pt-20'>
      {/* Header */}
      <View className='flex-row items-center justify-between w-full p-4'>
        <TouchableOpacity 
          className='bg-stone-800 rounded-xl p-2'
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#CBFD03" />
        </TouchableOpacity>
        <View className='flex-row items-center gap-2'>
          <Text className='text-white text-4xl font-bold'>Support</Text>
        </View>
        <TouchableOpacity className='bg-stone-800 rounded-xl p-2'>
          <Feather name="search" size={24} color="#CBFD03" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className='flex-1 bg-stone-950 px-4'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Quick Help */}
        <View className='w-full bg-stone-800 rounded-xl p-6'>
          <Text className='text-white text-xl font-bold mb-4'>How can we help?</Text>
          <Text className='text-gray-400 text-base mb-4'>
            Find answers to common questions or get in touch with our support team. We're here to help you make the most of your expense tracking experience.
          </Text>
          <TouchableOpacity className='bg-[#CBFD03] rounded-xl p-3 items-center'>
            <Text className='text-black text-base font-semibold'>Search Help Articles</Text>
          </TouchableOpacity>
        </View>

        {/* FAQ Categories */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Help Categories</Text>
          <View className='flex-row flex-wrap gap-3'>
            <TouchableOpacity
              className={`px-4 py-3 rounded-xl flex-row items-center gap-2 ${
                selectedCategory === 'all' ? 'bg-[#CBFD03]' : 'bg-stone-700'
              }`}
              onPress={() => setSelectedCategory('all')}
            >
              <Feather 
                name="list" 
                size={16} 
                color={selectedCategory === 'all' ? 'black' : '#CBFD03'} 
              />
              <Text className={`text-sm font-semibold ${
                selectedCategory === 'all' ? 'text-black' : 'text-white'
              }`}>
                All
              </Text>
            </TouchableOpacity>
            {faqCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  className={`px-4 py-3 rounded-xl flex-row items-center gap-2 ${
                    selectedCategory === category.id ? 'bg-[#CBFD03]' : 'bg-stone-700'
                  }`}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <IconComponent 
                    name={category.iconName as any} 
                    size={16} 
                    color={selectedCategory === category.id ? 'black' : category.color} 
                  />
                  <Text className={`text-sm font-semibold ${
                    selectedCategory === category.id ? 'text-black' : 'text-white'
                  }`}>
                    {category.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* FAQs */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Frequently Asked Questions</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {filteredFaqs.map((faq) => (
              <View key={faq.id} className='border-b border-stone-700 last:border-b-0'>
                <TouchableOpacity
                  className='flex-row items-center justify-between w-full p-4'
                  onPress={() => handleFaqToggle(faq.id)}
                >
                  <Text className='text-white text-base font-semibold flex-1 mr-4'>
                    {faq.question}
                  </Text>
                  <Feather 
                    name={expandedFaq === faq.id ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color="#CBFD03" 
                  />
                </TouchableOpacity>
                {expandedFaq === faq.id && (
                  <View className='px-4 pb-4'>
                    <Text className='text-gray-400 text-sm leading-5'>
                      {faq.answer}
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Contact Options */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Contact Support</Text>
          <View className='gap-4'>
            {contactOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <TouchableOpacity
                  key={option.id}
                  className='bg-stone-800 rounded-xl p-4'
                >
                  <View className='flex-row items-center justify-between mb-3'>
                    <View className='flex-row items-center gap-3'>
                      <View className='bg-stone-700 rounded-full p-2'>
                        <IconComponent name={option.iconName as any} size={24} color="#CBFD03" />
                      </View>
                      <View>
                        <Text className='text-white text-lg font-semibold'>{option.title}</Text>
                        <Text className='text-gray-400 text-sm'>{option.subtitle}</Text>
                      </View>
                    </View>
                    <TouchableOpacity className='bg-[#CBFD03] rounded-xl px-4 py-2'>
                      <Text className='text-black text-sm font-semibold'>{option.action}</Text>
                    </TouchableOpacity>
                  </View>
                  <Text className='text-gray-400 text-sm'>{option.description}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Additional Resources */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Additional Resources</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-3'>
            <TouchableOpacity className='flex-row items-center justify-between w-full p-3 rounded-lg bg-stone-700'>
              <View className='flex-row items-center gap-3'>
                <Feather name="book" size={20} color="#CBFD03" />
                <Text className='text-white text-base font-semibold'>User Guide</Text>
              </View>
              <Feather name="external-link" size={16} color="#CBFD03" />
            </TouchableOpacity>
            
            <TouchableOpacity className='flex-row items-center justify-between w-full p-3 rounded-lg bg-stone-700'>
              <View className='flex-row items-center gap-3'>
                <Feather name="video" size={20} color="#CBFD03" />
                <Text className='text-white text-base font-semibold'>Video Tutorials</Text>
              </View>
              <Feather name="external-link" size={16} color="#CBFD03" />
            </TouchableOpacity>
            
            <TouchableOpacity className='flex-row items-center justify-between w-full p-3 rounded-lg bg-stone-700'>
              <View className='flex-row items-center gap-3'>
                <Feather name="message-circle" size={20} color="#CBFD03" />
                <Text className='text-white text-base font-semibold'>Community Forum</Text>
              </View>
              <Feather name="external-link" size={16} color="#CBFD03" />
            </TouchableOpacity>
            
            <TouchableOpacity className='flex-row items-center justify-between w-full p-3 rounded-lg bg-stone-700'>
              <View className='flex-row items-center gap-3'>
                <Feather name="file-text" size={20} color="#CBFD03" />
                <Text className='text-white text-base font-semibold'>API Documentation</Text>
              </View>
              <Feather name="external-link" size={16} color="#CBFD03" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Support Status */}
        <View className='w-full bg-stone-800 rounded-xl p-4 mb-20'>
          <Text className='text-white text-lg font-semibold mb-3'>System Status</Text>
          <View className='flex-row items-center justify-between mb-3'>
            <Text className='text-gray-400 text-sm'>All systems operational</Text>
            <View className='bg-green-500 rounded-full w-3 h-3'></View>
          </View>
          <Text className='text-gray-400 text-xs'>
            Last updated: {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
