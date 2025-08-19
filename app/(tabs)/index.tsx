import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import me from '../../assets/images/me.png';
import { useAmountAnimation } from '../../helpers/amount-animation';

export default function HomeScreen() {
  const { displayValue, restartAnimation, formatCurrency } = useAmountAnimation({
    targetValue: 2450.75,
    duration: 2000
  });

  return (
    <ScrollView
      className='flex-1 bg-stone-950'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 140 }}
    >
      <View className='flex items-center justify-start bg-stone-950 p-4 top-20 gap-8'>
        {/* Header */}
        <View className='flex-row items-end justify-start w-full gap-2'>
          <View className='flex-row items-center justify-between w-full'>
            <View className='flex-row items-end justify-center gap-4'>

            
            <View className='bg-[#CBFD03] rounded-xl p-2'>
              <Feather name="bar-chart-2" size={30} color="black" />
            </View>
            <Text className='text-white text-4xl font-bold'>Dashboard</Text>
            </View>
            <View className='flex-row items-center justify-center'>
            <Image source={me} alt='Profile' className='w-12 h-12 object-contain self-center rounded-full'/>
            </View>
          </View>
        </View>

        {/* Balance Summary Card */}
        <TouchableOpacity 
          className='w-full bg-stone-800 rounded-xl p-6'
          onPress={restartAnimation}
          activeOpacity={0.8}
        >
          <Text className='text-white text-lg font-semibold mb-2'>Total Balance</Text>
          <Text className='text-[#CBFD03] text-4xl font-bold mb-4'>
            {formatCurrency(displayValue)}
          </Text>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap-2'>
              <Feather name="trending-up" size={20} color="#CBFD03" />
              <Text className='text-[#CBFD03] text-sm font-semibold'>+$125.50</Text>
            </View>
            <Text className='text-gray-400 text-sm'>This month</Text>
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
        <View className='w-full bg-stone-800 rounded-xl p-4 mb-20'>
          <View className='flex-row items-start gap-3'>
            <Ionicons name="bulb-outline" size={24} color="#CBFD03" />
            <View className='flex-1'>
              <Text className='text-white text-base font-semibold mb-1'>Tip of the Day</Text>
              <Text className='text-gray-400 text-sm'>Try cooking at home more often. You could save up to $300 per month on dining out!</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
