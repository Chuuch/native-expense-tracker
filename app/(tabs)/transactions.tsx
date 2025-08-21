import { AntDesign } from "@expo/vector-icons";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
// @ts-ignore
import me from "@/assets/images/me.png";
import AddTransactionButton from "@/components/AddTransactionButton";
import LoadMoreButton from "@/components/LoadMoreButton";
import TransactionModal from "@/components/modals/transaction-modal";
import SummaryCards from "@/components/SummaryCards";
import TransactionFilters from "@/components/TransactionFilters";
import TransactionList from "@/components/TransactionList";
import { useTheme } from "@/contexts/ThemeContext";

export default function TransactionsScreen() {
  const { colors } = useTheme();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleAddTransaction = (transaction: any) => {
    // Here you would typically save the transaction to your state/database
    console.log("New transaction:", transaction);
    Alert.alert("Success", "Transaction added successfully!");
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  return (
    <View className={`flex-1 ${colors.background} pt-20`}>
      {/* Header */}
      <View className="flex-row items-end justify-start w-full gap-2 p-4">
        <View className="flex-row items-center justify-between w-full">
          <View className="flex-row items-end justify-center gap-4">
            <View className="bg-[#CBFD03] rounded-full p-2">
              <AntDesign name="swap" size={30} color="black" />
            </View>
            <Text className={`${colors.text} text-4xl font-bold`}>Transactions</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <Image
              source={me}
              alt="Profile"
              className="w-12 h-12 object-contain self-center rounded-full"
            />
          </View>
        </View>
      </View>

      <ScrollView
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >
        {/* Summary Cards */}
        <SummaryCards />

        {/* Filters */}
        <TransactionFilters />

        {/* Transactions List */}
        <TransactionList />

        {/* Load More */}
        <LoadMoreButton />
      </ScrollView>

      {/* Floating Add Button - Now properly positioned */}
      <AddTransactionButton openModal={openModal} />
      {/* Transaction Modal */}
      <TransactionModal
        visible={isModalVisible}
        onClose={closeModal}
        onSubmit={handleAddTransaction}
      />
    </View>
  );
}
