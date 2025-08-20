import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import me from '../../assets/images/me.png';
import { useAmountAnimation } from '../../helpers/amount-animation';

export default function HomeScreen() {
  const { displayValue, restartAnimation, formatCurrency } = useAmountAnimation({
    targetValue: 24375.75,
    duration: 1500
  });

  return (
    <View className='flex-1 bg-stone-950 pt-20'>
      {/* Header */}
      <View className='flex-row items-end justify-start w-full gap-2 p-4'>
        <View className='flex-row items-center justify-between w-full'>
          <View className='flex-row items-end justify-center gap-4'>
            <View className='bg-[#CBFD03] rounded-full p-2'>
              <Feather name="bar-chart-2" size={30} color="black" />
            </View>
            <Text className='text-white text-4xl font-bold'>Dashboard</Text>
          </View>
          <View className='flex-row items-center justify-center'>
            <Image source={me} alt='Profile' className='w-12 h-12 object-contain self-center rounded-full'/>
          </View>
        </View>
      </View>

      <ScrollView 
        className='flex-1 bg-stone-950 px-4'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Balance Summary Card */}
        <TouchableOpacity 
          className='w-full rounded-2xl p-6 overflow-hidden'
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
          <View className='flex-row items-center justify-between mb-6'>
            <View className='flex-row items-center gap-2'>
              <View className='bg-[#CBFD03] rounded-full p-1'>
                <Feather name="credit-card" size={16} color="black" />
              </View>
              <Text className='text-white text-sm font-medium'>DEBIT CARD</Text>
            </View>
            <View className='flex-row items-center gap-1'>
              <View className='w-8 h-6 bg-[#CBFD03] rounded-sm'></View>
              <View className='w-8 h-6 bg-white rounded-sm'></View>
            </View>
          </View>

          {/* Card Number */}
          <View className='mb-6'>
            <Text className='text-white text-lg font-mono tracking-wider mb-1'>**** **** **** 1234</Text>
            <Text className='text-gray-400 text-xs'>Card Number</Text>
          </View>

          {/* Balance Amount */}
          <View className='mb-6'>
            <Text className='text-gray-400 text-sm mb-1'>Available Balance</Text>
            <Text className='text-[#CBFD03] text-3xl font-bold'>
              {formatCurrency(displayValue)}
            </Text>
          </View>

          {/* Card Footer */}
          <View className='flex-row items-center justify-between'>
            <View className='flex-1'>
              <Text className='text-gray-400 text-xs mb-1'>CARD HOLDER</Text>
              <Text className='text-white text-sm font-semibold'>JOHN DOE</Text>
            </View>
            <View className='flex-1'>
              <Text className='text-gray-400 text-xs mb-1'>EXPIRES</Text>
              <Text className='text-white text-sm font-semibold'>12/28</Text>
            </View>
            <View className='flex-row items-center gap-2'>
              <Feather name="trending-up" size={16} color="#CBFD03" />
              <Text className='text-[#CBFD03] text-xs font-semibold'>+$125.50</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View className='w-full'>
          <Text className='text-white text-2xl font-bold mb-4'>Quick Actions</Text>
          <View className='flex-row items-center justify-between gap-4'>
            <TouchableOpacity className='flex-1 bg-[#CBFD03] rounded-xl p-4 items-center justify-center'>
              <Feather name="plus" size={24} color="black" />
              <Text className='text-black text-sm font-semibold mt-2'>Add Expense</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-[#CBFD03] rounded-xl p-4 items-center justify-center'>
              <Feather name="dollar-sign" size={24} color="black" />
              <Text className='text-black text-sm font-semibold mt-2'>Add Income</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-[#CBFD03] rounded-xl p-4 items-center justify-center'>
              <MaterialCommunityIcons name="piggy-bank" size={24} color="black" />
              <Text className='text-black text-sm font-semibold mt-2'>Save Money</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Transactions */}
        <View className='w-full'>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-white text-2xl font-bold'>Recent Transactions</Text>
            <TouchableOpacity>
              <Text className='text-[#CBFD03] text-sm font-semibold'>View All</Text>
            </TouchableOpacity>
          </View>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-red-500 rounded-full p-2'>
                  <Feather name="shopping-bag" size={16} color="white" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Grocery Shopping</Text>
                  <Text className='text-gray-400 text-sm'>Today, 2:30 PM</Text>
                </View>
              </View>
              <Text className='text-red-400 text-lg font-bold'>-$45.20</Text>
            </View>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-green-500 rounded-full p-2'>
                  <Feather name="briefcase" size={16} color="white" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Salary</Text>
                  <Text className='text-gray-400 text-sm'>Yesterday, 9:00 AM</Text>
                </View>
              </View>
              <Text className='text-green-400 text-lg font-bold'>+$3,200.00</Text>
            </View>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3'>
                <View className='bg-blue-500 rounded-full p-2'>
                  <Feather name="coffee" size={16} color="white" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Coffee Shop</Text>
                  <Text className='text-gray-400 text-sm'>Yesterday, 8:15 AM</Text>
                </View>
              </View>
              <Text className='text-red-400 text-lg font-bold'>-$4.50</Text>
            </View>
          </View>
        </View>

        {/* Savings Goals */}
        <View className='w-full'>
          <Text className='text-white text-2xl font-bold mb-4'>Savings Goals</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <View className='gap-2'>
              <View className='flex-row items-center justify-between'>
                <Text className='text-white text-base font-semibold'>Vacation Fund</Text>
                <Text className='text-[#CBFD03] text-sm font-semibold'>$1,200 / $2,000</Text>
              </View>
              <View className='w-full bg-stone-700 rounded-full h-2'>
                <View className='bg-[#CBFD03] h-2 rounded-full' style={{ width: '60%' }} />
              </View>
            </View>
            <View className='gap-2'>
              <View className='flex-row items-center justify-between'>
                <Text className='text-white text-base font-semibold'>Emergency Fund</Text>
                <Text className='text-[#CBFD03] text-sm font-semibold'>$3,500 / $5,000</Text>
              </View>
              <View className='w-full bg-stone-700 rounded-full h-2'>
                <View className='bg-[#CBFD03] h-2 rounded-full' style={{ width: '70%' }} />
              </View>
            </View>
          </View>
        </View>

        {/* Tip of the Day */}
        <View className='w-full bg-stone-800 rounded-xl p-4 mb-2'>
          <View className='flex-row items-start gap-3'>
            <Ionicons name="bulb-outline" size={24} color="#CBFD03" />
            <View className='flex-1'>
              <Text className='text-white text-base font-semibold mb-1'>Tip of the Day</Text>
              <Text className='text-gray-400 text-sm'>Try cooking at home more often. You could save up to $300 per month on dining out!</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
