import { AntDesign, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import me from '../../assets/images/me.png';
import TransactionModal from '../../components/modals/transaction-modal';

export default function TransactionsScreen() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddTransaction = (transaction: any) => {
    // Here you would typically save the transaction to your state/database
    console.log('New transaction:', transaction);
    Alert.alert('Success', 'Transaction added successfully!');
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  return (
    <View className='flex-1 bg-stone-950'>
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

            
            <View className='bg-[#CBFD03] rounded-full p-2'>
              <AntDesign name="swap" size={30} color="black" />
            </View>
            <Text className='text-white text-4xl font-bold'>Transactions</Text>
            </View>
            <View className='flex-row items-center justify-center'>
            <Image source={me} alt='Profile' className='w-12 h-12 object-contain self-center rounded-full'/>
            </View>
          </View>
        </View>

          {/* Summary Cards */}
          <View className='w-full flex-row gap-4'>
            <View className='flex-1 bg-stone-800 rounded-xl p-4'>
              <Text className='text-gray-400 text-sm mb-1'>Total Income</Text>
              <Text className='text-green-400 text-xl font-bold'>$4,250.00</Text>
            </View>
            <View className='flex-1 bg-stone-800 rounded-xl p-4'>
              <Text className='text-gray-400 text-sm mb-1'>Total Expenses</Text>
              <Text className='text-red-400 text-xl font-bold'>$1,799.25</Text>
            </View>
          </View>

          {/* Filters */}
          <View className='w-full'>
            <Text className='text-white text-2xl font-bold mb-4'>Filters</Text>
            <View className='flex-row items-center gap-3'>
              <TouchableOpacity className='bg-[#CBFD03] rounded-xl px-4 py-2'>
                <Text className='text-black text-sm font-semibold'>All</Text>
              </TouchableOpacity>
              <TouchableOpacity className='bg-stone-800 rounded-xl px-4 py-2'>
                <Text className='text-white text-sm font-semibold'>Income</Text>
              </TouchableOpacity>
              <TouchableOpacity className='bg-stone-800 rounded-xl px-4 py-2'>
                <Text className='text-white text-sm font-semibold'>Expenses</Text>
              </TouchableOpacity>
              <TouchableOpacity className='bg-stone-800 rounded-xl px-4 py-2'>
                <Text className='text-white text-sm font-semibold'>This Month</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Transactions List */}
          <View className='w-full'>
            <View className='flex-row items-center justify-between mb-4'>
              <Text className='text-white text-2xl font-bold'>All Transactions</Text>
              <TouchableOpacity className='bg-stone-800 rounded-xl p-2'>
                <Feather name="filter" size={20} color="#CBFD03" />
              </TouchableOpacity>
            </View>
            
            <View className='bg-stone-800 rounded-xl p-4 gap-4'>
              {/* Transaction Item 1 */}
              <View className='flex-row items-center justify-between'>
                <View className='flex-row items-center gap-3 flex-1'>
                  <View className='bg-red-500 rounded-full p-3'>
                    <Feather name="shopping-bag" size={20} color="white" />
                  </View>
                  <View className='flex-1'>
                    <Text className='text-white text-base font-semibold'>Grocery Shopping</Text>
                    <Text className='text-gray-400 text-sm'>Food & Dining</Text>
                    <Text className='text-gray-500 text-xs'>Today, 2:30 PM</Text>
                  </View>
                </View>
                <View className='items-end'>
                  <Text className='text-red-400 text-lg font-bold'>-$45.20</Text>
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
                    <Text className='text-white text-base font-semibold'>Salary Payment</Text>
                    <Text className='text-gray-400 text-sm'>Income</Text>
                    <Text className='text-gray-500 text-xs'>Yesterday, 9:00 AM</Text>
                  </View>
                </View>
                <View className='items-end'>
                  <Text className='text-green-400 text-lg font-bold'>+$3,200.00</Text>
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
                    <Text className='text-white text-base font-semibold'>Coffee Shop</Text>
                    <Text className='text-gray-400 text-sm'>Food & Dining</Text>
                    <Text className='text-gray-500 text-xs'>Yesterday, 8:15 AM</Text>
                  </View>
                </View>
                <View className='items-end'>
                  <Text className='text-red-400 text-lg font-bold'>-$4.50</Text>
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
                    <Text className='text-white text-base font-semibold'>Internet Bill</Text>
                    <Text className='text-gray-400 text-sm'>Utilities</Text>
                    <Text className='text-gray-500 text-xs'>Dec 15, 2024</Text>
                  </View>
                </View>
                <View className='items-end'>
                  <Text className='text-red-400 text-lg font-bold'>-$89.99</Text>
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
                    <Text className='text-white text-base font-semibold'>Gas Station</Text>
                    <Text className='text-gray-400 text-sm'>Transportation</Text>
                    <Text className='text-gray-500 text-xs'>Dec 14, 2024</Text>
                  </View>
                </View>
                <View className='items-end'>
                  <Text className='text-red-400 text-lg font-bold'>-$35.00</Text>
                  <TouchableOpacity className='mt-1'>
                    <Feather name="more-vertical" size={16} color="#6b7280" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Load More */}
          <TouchableOpacity className='w-full bg-stone-800 rounded-xl p-4 items-center mb-20'>
            <Text className='text-[#CBFD03] text-base font-semibold'>Load More Transactions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating Add Button - Now properly positioned */}
      <TouchableOpacity 
        className='absolute bottom-36 right-6 bg-[#CBFD03] rounded-full p-4 shadow-lg z-50'
        onPress={openModal}
      >
        <Feather name="plus" size={28} color="black" />
      </TouchableOpacity>

      {/* Transaction Modal */}
      <TransactionModal
        visible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleAddTransaction}
      />
    </View>
  );
}