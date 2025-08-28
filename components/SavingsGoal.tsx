import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import SavingsGoalModal from './modals/savings-goal-modal';

interface ISavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: string;
  category: string;
  icon: string;
  color: string;
  progress: number;
}

export default function SavingsGoal() {
  const { colors } = useTheme();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    name: '',
    targetAmount: '',
    category: '',
    targetDate: '',
  });

  // Mock data - replace with real data from your database
  const savingsGoals: ISavingsGoal[] = [
    {
      id: "1",
      name: "Vacation Fund",
      targetAmount: 2000,
      currentAmount: 1200,
      targetDate: "2024-12-31",
      category: "Travel",
      icon: "plane",
      color: "#CBFD03",
      progress: 60,
    },
    {
      id: "2",
      name: "Emergency Fund",
      targetAmount: 5000,
      currentAmount: 3500,
      targetDate: "2024-06-30",
      category: "Emergency",
      icon: "shield",
      color: "#FF6B6B",
      progress: 70,
    },
    {
      id: "3",
      name: "New Car",
      targetAmount: 15000,
      currentAmount: 8000,
      targetDate: "2025-03-31",
      category: "Vehicle",
      icon: "car",
      color: "#4ECDC4",
      progress: 53,
    },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View className="w-full">
      <View className="flex-row items-center justify-between mb-4">
        <Text className={`${colors.text} text-2xl font-bold`}>Savings Goals</Text>
        <TouchableOpacity
          onPress={() => setShowAddModal(true)}
          className="bg-[#CBFD03] rounded-full p-2"
        >
          <Feather name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>

      <View className={`${colors.card} rounded-xl p-4 gap-4`}>
        {savingsGoals.map((goal) => (
          <View key={goal.id} className="gap-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View 
                  className="rounded-full p-2" 
                  style={{ backgroundColor: goal.color + '20' }}
                >
                  <Feather name={goal.icon as any} size={16} color={goal.color} />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>
                    {goal.name}
                  </Text>
                  <Text className={`${colors.textSecondary} text-sm`}>
                    {goal.category} • {goal.targetDate && formatDate(goal.targetDate)}
                  </Text>
                </View>
              </View>
              <Text className={`text-[#CBFD03] text-sm font-semibold`}>
                {formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)}
              </Text>
            </View>
            
            <View className="w-full bg-stone-700 rounded-full h-2">
              <View 
                className="h-2 rounded-full" 
                style={{ 
                  width: `${goal.progress}%`,
                  backgroundColor: goal.color 
                }} 
              />
            </View>
            
            <View className="flex-row items-center justify-between">
              <Text className={`${colors.textSecondary} text-xs`}>
                {goal.progress}% complete
              </Text>
              <Text className={`${colors.textSecondary} text-xs`}>
                {goal.targetAmount - goal.currentAmount > 0 
                  ? `${formatCurrency(goal.targetAmount - goal.currentAmount)} to go`
                  : 'Goal reached! 🎉'
                }
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Add Goal Modal */}
     <SavingsGoalModal showAddModal={showAddModal} setShowAddModal={setShowAddModal} newGoal={newGoal} setNewGoal={setNewGoal} />
    </View>
  );
}