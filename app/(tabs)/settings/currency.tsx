import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const currencies = [
  {
    code: 'USD',
    name: 'US Dollar',
    symbol: '$',
    flag: '🇺🇸',
    isCurrent: true
  },
  {
    code: 'EUR',
    name: 'Euro',
    symbol: '€',
    flag: '🇪🇺',
    isCurrent: false
  },
  {
    code: 'GBP',
    name: 'British Pound',
    symbol: '£',
    flag: '🇬🇧',
    isCurrent: false
  },
  {
    code: 'JPY',
    name: 'Japanese Yen',
    symbol: '¥',
    flag: '🇯🇵',
    isCurrent: false
  },
  {
    code: 'CAD',
    name: 'Canadian Dollar',
    symbol: 'C$',
    flag: '🇨🇦',
    isCurrent: false
  },
  {
    code: 'AUD',
    name: 'Australian Dollar',
    symbol: 'A$',
    flag: '🇦🇺',
    isCurrent: false
  },
  {
    code: 'CHF',
    name: 'Swiss Franc',
    symbol: 'CHF',
    flag: '🇨🇭',
    isCurrent: false
  },
  {
    code: 'CNY',
    name: 'Chinese Yuan',
    symbol: '¥',
    flag: '🇨🇳',
    isCurrent: false
  },
  {
    code: 'INR',
    name: 'Indian Rupee',
    symbol: '₹',
    flag: '🇮🇳',
    isCurrent: false
  },
  {
    code: 'BRL',
    name: 'Brazilian Real',
    symbol: 'R$',
    flag: '🇧🇷',
    isCurrent: false
  },
  {
    code: 'MXN',
    name: 'Mexican Peso',
    symbol: '$',
    flag: '🇲🇽',
    isCurrent: false
  },
  {
    code: 'SGD',
    name: 'Singapore Dollar',
    symbol: 'S$',
    flag: '🇸🇬',
    isCurrent: false
  },
  {
    code: 'HKD',
    name: 'Hong Kong Dollar',
    symbol: 'HK$',
    flag: '🇭🇰',
    isCurrent: false
  },
  {
    code: 'NZD',
    name: 'New Zealand Dollar',
    symbol: 'NZ$',
    flag: '🇳🇿',
    isCurrent: false
  },
  {
    code: 'SEK',
    name: 'Swedish Krona',
    symbol: 'kr',
    flag: '🇸🇪',
    isCurrent: false
  },
  {
    code: 'NOK',
    name: 'Norwegian Krone',
    symbol: 'kr',
    flag: '🇳🇴',
    isCurrent: false
  },
  {
    code: 'DKK',
    name: 'Danish Krone',
    symbol: 'kr',
    flag: '🇩🇰',
    isCurrent: false
  },
  {
    code: 'PLN',
    name: 'Polish Złoty',
    symbol: 'zł',
    flag: '🇵🇱',
    isCurrent: false
  },
  {
    code: 'CZK',
    name: 'Czech Koruna',
    symbol: 'Kč',
    flag: '🇨🇿',
    isCurrent: false
  },
  {
    code: 'HUF',
    name: 'Hungarian Forint',
    symbol: 'Ft',
    flag: '🇭🇺',
    isCurrent: false
  }
];

export default function CurrencyScreen() {
  const router = useRouter();
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const { colors } = useTheme();
  const handleCurrencySelect = (currencyCode: string) => {
    setSelectedCurrency(currencyCode);
    // Here you would typically save the selection to your app's state/storage
    console.log('Selected currency:', currencyCode);
  };

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
        <View className='flex-row items-center gap-2'>
          <Text className={`${colors.text} text-4xl font-bold`}>Currency</Text>
        </View>
        <TouchableOpacity className={`${colors.card} rounded-xl p-2`}>
          <Feather name="info" size={24} color="#615eff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Current Currency Status */}
        <View className={`w-full ${colors.card} rounded-xl p-6`}>
            <Text className={`${colors.text} text-xl font-bold mb-4`}>Current Currency</Text>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap-3'>
              <Text className='text-4xl'>🇺🇸</Text>
              <View>
                <Text className={`${colors.text} text-lg font-semibold`}>US Dollar</Text>
                <Text className={`${colors.textSecondary} text-sm`}>USD</Text>
              </View>
            </View>
            <View className={`${colors.accent} rounded-xl px-3 py-1`}>
              <Text className='text-white text-sm font-semibold'>Active</Text>
            </View>
          </View>
          <Text className={`${colors.textSecondary} text-sm mt-4`}>
            All amounts in the app will be displayed in this currency. Exchange rates are updated automatically.
          </Text>
        </View>

        {/* Popular Currencies */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Popular Currencies</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-2`}>
            {currencies.slice(0, 6).map((currency) => (
              <TouchableOpacity
                key={currency.code}
                className={`flex-row items-center justify-between w-full p-4 rounded-lg ${
                  selectedCurrency === currency.code ? `${colors.cardSecondary}` : ''
                }`}
                onPress={() => handleCurrencySelect(currency.code)}
              >
                <View className='flex-row items-center gap-3 flex-1'>
                  <Text className={`${colors.text} text-2xl`}>{currency.flag}</Text>
                  <View className='flex-1'>
                    <Text className={`${colors.text} text-base font-semibold`}>{currency.name}</Text>
                    <Text className={`${colors.textSecondary} text-sm`}>{currency.code}</Text>
                  </View>
                </View>
                <View className='flex-row items-center gap-3'>
                  <Text className={`${colors.text} text-lg font-semibold`}>{currency.symbol}</Text>
                  {selectedCurrency === currency.code && (
                    <View className={`${colors.accent} rounded-full p-1`}>
                      <Feather name="check" size={16} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* All Currencies */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>All Currencies</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-2`}>
            {currencies.map((currency) => (
              <TouchableOpacity
                key={currency.code}
                className={`flex-row items-center justify-between w-full p-4 rounded-lg ${
                  selectedCurrency === currency.code ? `${colors.cardSecondary}` : ''
                }`}
                onPress={() => handleCurrencySelect(currency.code)}
              >
                <View className='flex-row items-center gap-3 flex-1'>
                  <Text className={`${colors.text} text-2xl`}>{currency.flag}</Text>
                  <View className='flex-1'>
                    <Text className={`${colors.text} text-base font-semibold`}>{currency.name}</Text>
                    <Text className={`${colors.textSecondary} text-sm`}>{currency.code}</Text>
                  </View>
                </View>
                <View className='flex-row items-center gap-3'>
                  <Text className={`${colors.text} text-lg font-semibold`}>{currency.symbol}</Text>
                  {selectedCurrency === currency.code && (
                    <View className='bg-[#615eff] rounded-full p-1'>
                      <Feather name="check" size={16} color="white" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Currency Information */}
        <View className={`w-full ${colors.card} rounded-xl p-4`}>
          <Text className={`${colors.text} text-lg font-semibold mb-3`}>About Currency Settings</Text>
          <View className='space-y-3'>
            <View className='flex-row items-start gap-3'>
              <Feather name="refresh-cw" size={16} color="#615eff" style={{ marginTop: 2 }} />
              <Text className={`${colors.textSecondary} text-sm flex-1`}>
                Exchange rates are updated automatically every hour to ensure accurate conversions.
              </Text>
            </View>
            <View className='flex-row items-start gap-3'>
              <Feather name="shield" size={16} color="#615eff" style={{ marginTop: 2 }} />
              <Text className={`${colors.textSecondary} text-sm flex-1`}>
                Your currency preference is stored locally and synced across all your devices.
              </Text>
            </View>
            <View className='flex-row items-start gap-3'>
              <Feather name="alert-circle" size={16} color="#615eff" style={{ marginTop: 2 }} />
              <Text className={`${colors.textSecondary} text-sm flex-1`}>
                Changing currency will update all amounts in the app. Historical data remains unchanged.
              </Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View className='w-full'>
          <TouchableOpacity 
            className={`${colors.accent} rounded-xl p-4 items-center`}
            onPress={() => {
              console.log('Currency saved:', selectedCurrency);
              router.back();
            }}
          >
            <Text className='text-white text-lg font-semibold'>Save Currency</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
