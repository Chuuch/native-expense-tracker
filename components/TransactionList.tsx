import { useTheme } from '@/contexts/ThemeContext';
import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TransactionList() {
  const { colors } = useTheme();
  return (
    <View className='w-full'>
    <View className='flex-row items-center justify-between mb-4'>
      <Text className={`${colors.text} text-2xl font-bold`}>All Transactions</Text>
      <TouchableOpacity className={`${colors.accent} rounded-xl p-2`}>
        <Feather name="filter" size={20} color='white' />
      </TouchableOpacity>
    </View>
    
    <View className={`${colors.card} rounded-xl p-4 gap-4`}>
      {/* Transaction Item 1 */}
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3 flex-1'>
          <View className='bg-red-500 rounded-full p-3'>
            <Feather name="shopping-bag" size={20} color="white" />
          </View>
          <View className='flex-1'>
            <Text className={`${colors.text} text-base font-semibold`}>Grocery Shopping</Text>
            <Text className={`${colors.textSecondary} text-sm`}>Food & Dining</Text>
            <Text className={`${colors.textSecondary} text-xs`}>Today, 2:30 PM</Text>
          </View>
        </View>
        <View className='items-end'>
          <Text className='text-red-500 text-lg font-bold'>-$45.20</Text>
          <TouchableOpacity className='mt-1'>
            <Feather name="more-vertical" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Item 2 */}
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3 flex-1'>
          <View className='bg-green-500 rounded-full p-3'>
            <Feather name="briefcase" size={20} color="white" />
          </View>
          <View className='flex-1'>
            <Text className={`${colors.text} text-base font-semibold`}>Salary Payment</Text>
            <Text className='text-gray-400 text-sm'>Income</Text>
            <Text className='text-gray-500 text-xs'>Yesterday, 9:00 AM</Text>
          </View>
        </View>
        <View className='items-end'>
          <Text className='text-green-500 text-lg font-bold'>+$3,200.00</Text>
          <TouchableOpacity className='mt-1'>
            <Feather name="more-vertical" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Item 3 */}
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3 flex-1'>
          <View className='bg-blue-500 rounded-full p-3'>
            <Feather name="coffee" size={20} color="white" />
          </View>
          <View className='flex-1'>
            <Text className={`${colors.text} text-base font-semibold`}>Coffee Shop</Text>
            <Text className='text-gray-400 text-sm'>Food & Dining</Text>
            <Text className='text-gray-500 text-xs'>Yesterday, 8:15 AM</Text>
          </View>
        </View>
        <View className='items-end'>
          <Text className='text-red-500 text-lg font-bold'>-$4.50</Text>
          <TouchableOpacity className='mt-1'>
            <Feather name="more-vertical" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Item 4 */}
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3 flex-1'>
          <View className='bg-purple-500 rounded-full p-3'>
            <Feather name="wifi" size={20} color="white" />
          </View>
          <View className='flex-1'>
            <Text className={`${colors.text} text-base font-semibold`}>Internet Bill</Text>
            <Text className='text-gray-400 text-sm'>Utilities</Text>
            <Text className='text-gray-500 text-xs'>Dec 15, 2024</Text>
          </View>
        </View>
        <View className='items-end'>
          <Text className='text-red-500 text-lg font-bold'>-$89.99</Text>
          <TouchableOpacity className='mt-1'>
            <Feather name="more-vertical" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Transaction Item 5 */}
      <View className='flex-row items-center justify-between'>
        <View className='flex-row items-center gap-3 flex-1'>
          <View className='bg-orange-500 rounded-full p-3'>
            <Feather name="truck" size={20} color="white" />
          </View>
          <View className='flex-1'>
            <Text className={`${colors.text} text-base font-semibold`}>Gas Station</Text>
            <Text className='text-gray-400 text-sm'>Transportation</Text>
            <Text className='text-gray-500 text-xs'>Dec 14, 2024</Text>
          </View>
        </View>
        <View className='items-end'>
          <Text className='text-red-500 text-lg font-bold'>-$35.00</Text>
          <TouchableOpacity className='mt-1'>
            <Feather name="more-vertical" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
  )
}