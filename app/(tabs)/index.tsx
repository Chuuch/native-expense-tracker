import { Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View className='flex-1 items-center justify-center bg-stone-950'>
      <TouchableOpacity className='bg-[#CBFD03] w-24 rounded-md p-2 items-center justify-center'>
        <Text className="text-black">Hello</Text>
      </TouchableOpacity>
    </View>
  );
}
