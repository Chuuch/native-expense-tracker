import React from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SavingsGoalModal({
  showAddModal,
  setShowAddModal,
  newGoal,
  setNewGoal,
}: {
  showAddModal: boolean;
  setShowAddModal: (show: boolean) => void;
  newGoal: any;
  setNewGoal: (goal: any) => void;
}) {

  const handleAddGoal = () => {
    console.log('add goal');
  };

  return (
    <View>
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className={`bg-stone-800 rounded-xl p-6 w-80`}>
            <Text className={`text-white text-xl font-bold mb-4`}>
              Add Savings Goal
            </Text>

            <TextInput
              className={`bg-stone-800 rounded-lg p-3 mb-3 text-white`}
              placeholder="Goal name"
              placeholderTextColor="#6b7280"
              value={newGoal.name}
              onChangeText={(text) => setNewGoal({ ...newGoal, name: text })}
            />

            <TextInput
              className={`bg-stone-800 rounded-lg p-3 mb-3 text-white`}
              placeholder="Target amount"
              placeholderTextColor="#6b7280"
              value={newGoal.targetAmount}
              onChangeText={(text) =>
                setNewGoal({ ...newGoal, targetAmount: text })
              }
              keyboardType="numeric"
            />

            <TextInput
              className={`bg-stone-800 rounded-lg p-3 mb-3 text-white`}
              placeholder="Category"
              placeholderTextColor="#6b7280"
              value={newGoal.category}
              onChangeText={(text) =>
                setNewGoal({ ...newGoal, category: text })
              }
            />

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-stone-600 rounded-lg p-3"
                onPress={() => setShowAddModal(false)}
              >
                <Text className="text-white text-center font-semibold">
                  Cancel
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-[#CBFD03] rounded-lg p-3"
                onPress={handleAddGoal}
              >
                <Text className="text-black text-center font-semibold">
                  Add Goal
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}