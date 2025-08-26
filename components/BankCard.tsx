


import { useTheme } from '@/contexts/ThemeContext';
import { useAmountAnimation } from '@/helpers/amount-animation';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function BankCard() {
    const { colors } = useTheme();
    const { displayValue, restartAnimation, formatCurrency } = useAmountAnimation({
        targetValue: 24375.75,
        duration: 1500
      });
    
  return (
    <View>
              {/* Balance Summary Card */}
              <TouchableOpacity 
          className='w-full rounded-2xl p-6 overflow-hidden mt-8'
          style={{
            backgroundColor: '#1E1A4D',
            shadowColor: '#CBFD03',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.15,
            shadowRadius: 8,
            elevation: 8,
            borderWidth: 1,
            borderColor: '#e2e8f0',
          }}
          onPress={restartAnimation}
          activeOpacity={0.8}
        >
          {/* Geometric Pattern Background */}
          <View className='absolute top-0 right-0 w-full h-full opacity-20'>
            {/* Diagonal Lines - Upper Right */}
            <View className='absolute -top-8 -right-8 w-40 h-40 transform rotate-45'>
              <View className='w-full h-0.5 bg-[#CBFD03] opacity-60'></View>
              <View className='w-full h-0.5 bg-[#CBFD03] opacity-40 mt-8'></View>
              <View className='w-full h-0.5 bg-[#CBFD03] opacity-30 mt-16'></View>
            </View>
            
            {/* Diagonal Lines - Lower Left */}
            <View className='absolute -bottom-20 -left-24 w-40 h-40 transform rotate-45'>
              <View className='w-full h-0.5 bg-[#CBFD03] opacity-60'></View>
              <View className='w-full h-0.5 bg-[#CBFD03] opacity-40 mt-8'></View>
              <View className='w-full h-0.5 bg-[#CBFD03] opacity-30 mt-16'></View>
            </View>
            
            {/* Faceted Pattern */}
            <View className='absolute top-4 right-4 w-24 h-24 opacity-30'>
              <View className='w-0 h-0 border-l-8 border-t-8 border-r-8 border-transparent border-t-[#CBFD03]'></View>
              <View className='w-0 h-0 border-l-8 border-b-8 border-r-8 border-transparent border-b-[#CBFD03] mt-4'></View>
              <View className='w-0 h-0 border-l-8 border-t-8 border-r-8 border-transparent border-t-[#CBFD03] mt-4'></View>
            </View>
            
            {/* Modern Circular Accents */}
            <View className='absolute top-0 right-0 w-28 h-28 opacity-15'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.4,
                shadowRadius: 12,
                elevation: 6,
              }}></View>
            </View>
            <View className='absolute top-8 right-8 w-16 h-16 opacity-20'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
                elevation: 4,
              }}></View>
            </View>
            
            {/* Floating Elements */}
            <View className='absolute top-4 right-4 w-3 h-3 opacity-40'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 4,
                elevation: 2,
              }}></View>
            </View>
            <View className='absolute top-16 right-16 w-2 h-2 opacity-60'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 1,
                shadowRadius: 3,
                elevation: 1,
              }}></View>
            </View>
            <View className='absolute bottom-6 right-6 w-4 h-4 opacity-35'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 5,
                elevation: 3,
              }}></View>
            </View>
            <View className='absolute top-8 right-2 w-2 h-2 opacity-50'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 1,
              }}></View>
            </View>
            <View className='absolute top-20 right-8 w-3 h-3 opacity-30'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 4,
                elevation: 2,
              }}></View>
            </View>
            <View className='absolute bottom-2 right-12 w-2 h-2 opacity-45'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
                elevation: 1,
              }}></View>
            </View>
            <View className='absolute top-12 right-20 w-2 h-2 opacity-55'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 1,
              }}></View>
            </View>
            <View className='absolute top-6 right-14 w-2 h-2 opacity-40'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
                elevation: 1,
              }}></View>
            </View>
            <View className='absolute top-14 right-4 w-3 h-3 opacity-35'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.7,
                shadowRadius: 4,
                elevation: 2,
              }}></View>
            </View>
            <View className='absolute bottom-8 right-8 w-2 h-2 opacity-50'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.9,
                shadowRadius: 3,
                elevation: 1,
              }}></View>
            </View>
            <View className='absolute top-18 right-16 w-2 h-2 opacity-45'>
              <View className='w-full h-full rounded-full bg-[#CBFD03]' style={{
                shadowColor: '#CBFD03',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.8,
                shadowRadius: 3,
                elevation: 1,
              }}></View>
            </View>
          </View>
          {/* Card Header */}
          <View className='flex-row items-center justify-between mb-2'>
            <View className='flex-row items-center gap-2'>
              <View className='bg-[#CBFD03] rounded-full p-1'>
                <Feather name="credit-card" size={16} color="black" />
              </View>
              <Text className={`${colors.text} text-sm font-medium`}>DEBIT CARD</Text>
            </View>
            <View className='flex-row items-center gap-1'>
              <View className='w-8 h-6 bg-[#CBFD03] rounded-sm'></View>
              <View className='w-8 h-6 bg-white rounded-sm'></View>
            </View>
          </View>

          {/* Card Number */}
          <View className='mb-6'>
            <Text className={`${colors.text} text-lg font-mono tracking-wider mb-1`}>**** **** **** 1234</Text>
            <Text className={`${colors.textSecondary} text-xs`}>Card Number</Text>
          </View>

          {/* Balance Amount */}
          <View className='mb-6'>
            <Text className={`${colors.textSecondary} text-sm mb-1`}>Available Balance</Text>
            <Text className='text-[#CBFD03] text-3xl font-bold'>
              {formatCurrency(displayValue)}
            </Text>
          </View>

          {/* Card Footer */}
          <View className='flex-row items-center justify-between'>
            <View className='flex-1'>
              <Text className={`${colors.textSecondary} text-xs mb-1`}>CARD HOLDER</Text>
              <Text className={`${colors.text} text-sm font-semibold`}>JOHN DOE</Text>
            </View>
            <View className='flex-1'>
              <Text className={`${colors.textSecondary} text-xs mb-1`}>EXPIRES</Text>
              <Text className={`${colors.text} text-sm font-semibold`}>12/28</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <Feather name="trending-up" size={16} color="#CBFD03" />
              <Text className='text-[#CBFD03] text-xs font-semibold'>+$125.50</Text>
            </View>
          </View>
        </TouchableOpacity>
    </View>
  )
}