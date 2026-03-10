import { useTheme } from '@/contexts/ThemeContext';
import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, FlatList, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface TransactionModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (transaction: any) => void;
}

interface Category {
  id: string;
  name: string;
  icon: keyof typeof Feather.glyphMap | keyof typeof MaterialCommunityIcons.glyphMap | keyof typeof Ionicons.glyphMap | keyof typeof FontAwesome5.glyphMap;
  iconType: 'Feather' | 'MaterialCommunityIcons' | 'Ionicons' | 'FontAwesome5';
  color: string;
}

const expenseCategories: Category[] = [
  { id: '1', name: 'Food & Dining', icon: 'coffee', iconType: 'Feather', color: 'bg-orange-500' },
  { id: '2', name: 'Shopping', icon: 'shopping-bag', iconType: 'Feather', color: 'bg-red-500' },
  { id: '3', name: 'Transportation', icon: 'truck', iconType: 'Feather', color: 'bg-blue-500' },
  { id: '4', name: 'Utilities', icon: 'wifi', iconType: 'Feather', color: 'bg-purple-500' },
  { id: '5', name: 'Entertainment', icon: 'film', iconType: 'Feather', color: 'bg-pink-500' },
  { id: '6', name: 'Healthcare', icon: 'heart', iconType: 'Feather', color: 'bg-red-400' },
  { id: '7', name: 'Education', icon: 'book', iconType: 'Feather', color: 'bg-indigo-500' },
  { id: '8', name: 'Housing', icon: 'home', iconType: 'Feather', color: 'bg-green-600' },
  { id: '9', name: 'Insurance', icon: 'shield', iconType: 'Feather', color: 'bg-yellow-500' },
  { id: '10', name: 'Taxes', icon: 'file-text', iconType: 'Feather', color: 'bg-gray-500' },
  { id: '11', name: 'Gifts', icon: 'gift', iconType: 'Feather', color: 'bg-pink-400' },
  { id: '12', name: 'Other', icon: 'more-horizontal', iconType: 'Feather', color: 'bg-gray-400' },
];

const incomeCategories: Category[] = [
  { id: '1', name: 'Salary', icon: 'briefcase', iconType: 'Feather', color: 'bg-green-500' },
  { id: '2', name: 'Freelance', icon: 'laptop', iconType: 'Feather', color: 'bg-blue-500' },
  { id: '3', name: 'Investment', icon: 'trending-up', iconType: 'Feather', color: 'bg-emerald-500' },
  { id: '4', name: 'Business', icon: 'briefcase', iconType: 'MaterialCommunityIcons', color: 'bg-purple-500' },
  { id: '5', name: 'Gifts', icon: 'gift', iconType: 'Feather', color: 'bg-pink-500' },
  { id: '6', name: 'Refunds', icon: 'refresh-cw', iconType: 'Feather', color: 'bg-cyan-500' },
  { id: '7', name: 'Other', icon: 'more-horizontal', iconType: 'Feather', color: 'bg-gray-400' },
];

export default function TransactionModal({ visible, onClose, onSubmit }: TransactionModalProps) {
  const { colors } = useTheme();
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [date, setDate] = useState(new Date().toLocaleDateString());

  const categories = transactionType === 'expense' ? expenseCategories : incomeCategories;

  const handleSubmit = () => {
    if (!amount || !title || !selectedCategory) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      type: transactionType,
      amount: parseFloat(amount),
      title,
      note,
      category: selectedCategory,
      date,
      timestamp: new Date().toISOString(),
    };

    onSubmit?.(transaction);
    handleClose();
  };

  const handleClose = () => {
    setTransactionType('expense');
    setAmount('');
    setTitle('');
    setNote('');
    setSelectedCategory(null);
    setDate(new Date().toLocaleDateString());
    onClose();
  };

  const renderIcon = (category: Category) => {
    const iconProps = { size: 20, color: 'white' };
    
    switch (category.iconType) {
      case 'Feather':
        return <Feather name={category.icon as keyof typeof Feather.glyphMap} {...iconProps} />;
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons name={category.icon as keyof typeof MaterialCommunityIcons.glyphMap} {...iconProps} />;
      case 'Ionicons':
        return <Ionicons name={category.icon as keyof typeof Ionicons.glyphMap} {...iconProps} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={category.icon as keyof typeof FontAwesome5.glyphMap} {...iconProps} />;
      default:
        return <Feather name="help-circle" {...iconProps} />;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <View className={`flex-1 ${colors.background}`}>
        {/* Header */}
        <View className={`flex-row items-center justify-between p-4 pt-16 border-b ${colors.border}`}>
          <TouchableOpacity onPress={handleClose}>
            <Feather name="x" size={24} color='#615eff' />
          </TouchableOpacity>
          <Text className="text-indigo-500 text-lg font-semibold">Add Transaction</Text>
          <TouchableOpacity onPress={handleSubmit}>
            <Text className="text-indigo-500 text-lg font-semibold">Save</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="flex-1 p-4" showsVerticalScrollIndicator={false}>
          {/* Transaction Type Selector */}
          <View className="mb-6">
            <Text className="text-indigo-500 text-lg font-semibold mb-4">Transaction Type</Text>
            <View className="flex-row gap-3">
              <TouchableOpacity
                className={`flex-1 rounded-xl p-4 border-2 ${
                  transactionType === 'expense' 
                    ? 'border-red-500 bg-red-500/20' 
                    : `${colors.border} ${colors.card}`
                }`}
                onPress={() => setTransactionType('expense')}
              >
                <View className="items-center">
                  <Feather name="minus-circle" size={24} color={transactionType === 'expense' ? '#ef4444' : '#615eff'} />
                  <Text className={`text-sm font-semibold mt-2 ${
                    transactionType === 'expense' ? 'text-red-400' : 'text-indigo-500'
                  }`}>
                    Expense
                  </Text>
                </View>
              </TouchableOpacity>
              
              <TouchableOpacity
                className={`flex-1 rounded-xl p-4 border-2 ${
                  transactionType === 'income' 
                    ? 'border-green-500 bg-green-500/20' 
                    : `${colors.border} ${colors.card}`
                }`}
                onPress={() => setTransactionType('income')}
              >
                <View className="items-center">
                  <Feather name="plus-circle" size={24} color={transactionType === 'income' ? '#22c55e' : '#615eff'} />
                  <Text className={`text-sm font-semibold mt-2 ${
                    transactionType === 'income' ? 'text-green-400' : 'text-indigo-500'
                  }`}>
                    Income
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Amount Input */}
          <View className="mb-6">
            <Text className={`${colors.text} text-lg font-semibold mb-4`}>Amount</Text>
            <View className={`${colors.card} rounded-xl p-4`}>
              <Text className="text-indigo-500 text-sm mb-2">$</Text>
              <TextInput
                className="text-indigo-500 text-3xl font-bold"
                placeholder="0.00"
                placeholderTextColor="#615eff"
                value={amount || ''}
                onChangeText={setAmount}
                keyboardType="numeric"
                style={{ padding: 0 }}
              />
            </View>
          </View>

          {/* Title Input */}
          <View className="mb-6">
            <Text className={`${colors.text} text-lg font-semibold mb-4`}>Title</Text>
            <TextInput
              className={`${colors.card} rounded-xl p-4 ${colors.text} text-base`}
              placeholder="Enter transaction title"
              placeholderTextColor="bg-gray-900"
              value={title || ''}
              onChangeText={setTitle}
            />
          </View>

          {/* Category Selection */}
          <View className="mb-6">
            <Text className={`${colors.text} text-lg font-semibold mb-4`}>Category</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between', gap: 12, marginBottom: 12 }}
              scrollEnabled={false}
              renderItem={({ item: category }) => (
                <TouchableOpacity
                  className={`flex-1 flex-row items-center gap-2 rounded-xl p-3 border-2 ${
                    selectedCategory?.id === category.id
                      ? 'border-indigo-500 bg-indigo-500/20'
                      : `${colors.border} ${colors.card}`
                  }`}
                  onPress={() => setSelectedCategory(category)}
                >
                  <View className={`${category.color} rounded-full p-2`}>
                    {renderIcon(category)}
                  </View>
                  <Text
                    className={`text-sm font-semibold ${
                      selectedCategory?.id === category.id ? colors.text : colors.textSecondary
                    }`}
                    numberOfLines={1}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          {/* Note Input */}
          <View className="mb-6">
            <Text className={`${colors.text} text-lg font-semibold mb-4`}>Note (Optional)</Text>
            <TextInput
              className={`${colors.card} rounded-xl p-4 ${colors.text} text-base`}
              placeholder="Add a note..."
              placeholderTextColor="#6b7280"
              value={note || ''}
              onChangeText={setNote}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Date Input */}
          <View className="mb-20">
            <Text className={`${colors.text} text-lg font-semibold mb-4`}>Date</Text>
            <TextInput
              className={`${colors.card} rounded-xl p-4 ${colors.text} text-base`}
              placeholder="Select date"
              placeholderTextColor="bg-gray-900"
              value={date}
              onChangeText={setDate}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}
