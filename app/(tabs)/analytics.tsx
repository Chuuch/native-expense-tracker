import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function AnalyticsScreen() {
  return (
    <ScrollView className='flex-1 bg-stone-950'>
    <View className='flex items-center justify-start bg-stone-950 p-4 top-32'>
      <View className='flex-row items-end justify-start w-full gap-2'>
        <View className='bg-[#CBFD03] rounded-xl p-2'>
          <Ionicons name="pie-chart-outline" size={40} color="black" />
        </View>
        <Text className='text-white text-5xl font-bold'>Analytics</Text>
      </View>
      <View className='flex-row items-start justify-start w-full'>
        <TouchableOpacity className='bg-[#CBFD03] w-24 rounded-md p-2 items-center justify-center'>
          <Text className="text-black">Hello</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}