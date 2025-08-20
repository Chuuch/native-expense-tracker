import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
// @ts-ignore
import me from '../../assets/images/me.png';

export default function AnalyticsScreen() {
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

            
            <View className='bg-[#CBFD03] rounded-full p-2'>
              <Ionicons name="pie-chart-outline" size={30} color="black" />
            </View>
            <Text className='text-white text-4xl font-bold'>Analytics</Text>
            </View>
            <View className='flex-row items-center justify-center'>
            <Image source={me} alt='Profile' className='w-12 h-12 object-contain self-center rounded-full'/>
            </View>
          </View>
        </View>

        {/* Time Period Selector */}
        <View className='w-full'>
          <View className='flex-row items-center justify-between mb-4'>
            <Text className='text-white text-2xl font-bold'>Spending Overview</Text>
            <TouchableOpacity className='bg-stone-800 rounded-xl px-4 py-2'>
              <Text className='text-[#CBFD03] text-sm font-semibold'>This Month</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Summary Cards */}
        <View className='w-full flex-row gap-4'>
          <View className='flex-1 bg-stone-800 rounded-xl p-4'>
            <View className='flex-row items-center justify-between mb-2'>
              <Text className='text-gray-400 text-sm'>Total Spent</Text>
              <Feather name="trending-up" size={16} color="#CBFD03" />
            </View>
            <Text className='text-white text-xl font-bold'>$1,799.25</Text>
            <Text className='text-[#CBFD03] text-xs'>+12% vs last month</Text>
          </View>
          <View className='flex-1 bg-stone-800 rounded-xl p-4'>
            <View className='flex-row items-center justify-between mb-2'>
              <Text className='text-gray-400 text-sm'>Daily Average</Text>
              <Feather name="calendar" size={16} color="#CBFD03" />
            </View>
            <Text className='text-white text-xl font-bold'>$59.98</Text>
            <Text className='text-[#CBFD03] text-xs'>$2,450 budget</Text>
          </View>
        </View>

        {/* Category Breakdown */}
        <View className='w-full'>
          <Text className='text-white text-2xl font-bold mb-4'>Category Breakdown</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3 flex-1 mr-3'>
                <View className='bg-red-500 rounded-full p-2'>
                  <Feather name="shopping-bag" size={16} color="white" />
                </View>
                <View className='flex-1'>
                  <Text className='text-white text-base font-semibold'>Food & Dining</Text>
                  <View className='flex-row items-center gap-2 mt-1'>
                    <View className='w-20 bg-stone-700 rounded-full h-2'>
                      <View className='bg-red-500 h-2 rounded-full' style={{ width: '35%' }} />
                    </View>
                    <Text className='text-gray-400 text-sm'>35%</Text>
                  </View>
                </View>
              </View>
              <Text className='text-white text-lg font-bold'>$629.74</Text>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3 flex-1 mr-3'>
                <View className='bg-blue-500 rounded-full p-2'>
                  <Feather name="home" size={16} color="white" />
                </View>
                <View className='flex-1'>
                  <Text className='text-white text-base font-semibold'>Housing</Text>
                  <View className='flex-row items-center gap-2 mt-1'>
                    <View className='w-20 bg-stone-700 rounded-full h-2'>
                      <View className='bg-blue-500 h-2 rounded-full' style={{ width: '28%' }} />
                    </View>
                    <Text className='text-gray-400 text-sm'>28%</Text>
                  </View>
                </View>
              </View>
              <Text className='text-white text-lg font-bold'>$503.79</Text>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3 flex-1 mr-3'>
                <View className='bg-green-500 rounded-full p-2'>
                  <Feather name="truck" size={16} color="white" />
                </View>
                <View className='flex-1'>
                  <Text className='text-white text-base font-semibold'>Transportation</Text>
                  <View className='flex-row items-center gap-2 mt-1'>
                    <View className='w-20 bg-stone-700 rounded-full h-2'>
                      <View className='bg-green-500 h-2 rounded-full' style={{ width: '20%' }} />
                    </View>
                    <Text className='text-gray-400 text-sm'>20%</Text>
                  </View>
                </View>
              </View>
              <Text className='text-white text-lg font-bold'>$359.85</Text>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3 flex-1 mr-3'>
                <View className='bg-purple-500 rounded-full p-2'>
                  <Feather name="wifi" size={16} color="white" />
                </View>
                <View className='flex-1'>
                  <Text className='text-white text-base font-semibold'>Utilities</Text>
                  <View className='flex-row items-center gap-2 mt-1'>
                    <View className='w-20 bg-stone-700 rounded-full h-2'>
                      <View className='bg-purple-500 h-2 rounded-full' style={{ width: '12%' }} />
                    </View>
                    <Text className='text-gray-400 text-sm'>12%</Text>
                  </View>
                </View>
              </View>
              <Text className='text-white text-lg font-bold'>$215.91</Text>
            </View>

            <View className='flex-row items-center justify-between'>
              <View className='flex-row items-center gap-3 flex-1 mr-3'>
                <View className='bg-orange-500 rounded-full p-2'>
                  <Feather name="gift" size={16} color="white" />
                </View>
                <View className='flex-1'>
                  <Text className='text-white text-base font-semibold'>Entertainment</Text>
                  <View className='flex-row items-center gap-2 mt-1'>
                    <View className='w-20 bg-stone-700 rounded-full h-2'>
                      <View className='bg-orange-500 h-2 rounded-full' style={{ width: '5%' }} />
                    </View>
                    <Text className='text-gray-400 text-sm'>5%</Text>
                  </View>
                </View>
              </View>
              <Text className='text-white text-lg font-bold'>$89.96</Text>
            </View>
          </View>
        </View>

        {/* Monthly Trend */}
        <View className='w-full'>
          <Text className='text-white text-2xl font-bold mb-4'>Monthly Trend</Text>
          <View className='bg-stone-800 rounded-xl p-4'>
            <View className='flex-row items-center justify-between mb-4'>
              <Text className='text-white text-base font-semibold'>Spending Pattern</Text>
              <View className='flex-row items-center gap-2'>
                <View className='w-3 h-3 bg-[#CBFD03] rounded-full'></View>
                <Text className='text-[#CBFD03] text-sm'>This Month</Text>
              </View>
            </View>
            
            {/* Simple Bar Chart */}
            <View className='flex-row items-end justify-between h-32 gap-2'>
              <View className='flex-1 items-center'>
                <View className='w-full bg-[#CBFD03] rounded-t' style={{ height: '60%' }}></View>
                <Text className='text-gray-400 text-xs mt-2'>Week 1</Text>
              </View>
              <View className='flex-1 items-center'>
                <View className='w-full bg-[#CBFD03] rounded-t' style={{ height: '80%' }}></View>
                <Text className='text-gray-400 text-xs mt-2'>Week 2</Text>
              </View>
              <View className='flex-1 items-center'>
                <View className='w-full bg-[#CBFD03] rounded-t' style={{ height: '45%' }}></View>
                <Text className='text-gray-400 text-xs mt-2'>Week 3</Text>
              </View>
              <View className='flex-1 items-center'>
                <View className='w-full bg-[#CBFD03] rounded-t' style={{ height: '70%' }}></View>
                <Text className='text-gray-400 text-xs mt-2'>Week 4</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Insights */}
        <View className='w-full'>
          <Text className='text-white text-2xl font-bold mb-4'>Insights</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <View className='flex-row items-start gap-3'>
              <Ionicons name="trending-up" size={24} color="#CBFD03" />
              <View className='flex-1'>
                <Text className='text-white text-base font-semibold mb-1'>Spending Increased</Text>
                <Text className='text-gray-400 text-sm'>Your food spending is 15% higher than last month. Consider meal planning to reduce costs.</Text>
              </View>
            </View>
            
            <View className='flex-row items-start gap-3'>
              <MaterialCommunityIcons name="target" size={24} color="#CBFD03" />
              <View className='flex-1'>
                <Text className='text-white text-base font-semibold mb-1'>Budget Alert</Text>
                <Text className='text-gray-400 text-sm'>You&apos;re on track to exceed your monthly budget by $150. Consider reducing non-essential expenses.</Text>
              </View>
            </View>
            
            <View className='flex-row items-start gap-3'>
              <Feather name="award" size={24} color="#CBFD03" />
              <View className='flex-1'>
                <Text className='text-white text-base font-semibold mb-1'>Great Job!</Text>
                <Text className='text-gray-400 text-sm'>You&apos;ve saved 23% more this month compared to last month. Keep up the good work!</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Export Options */}
        <View className='w-full mb-20'>
          <Text className='text-white text-2xl font-bold mb-4'>Export Report</Text>
          <View className='flex-row gap-4'>
            <TouchableOpacity className='flex-1 bg-[#CBFD03] rounded-xl p-4 items-center'>
              <Feather name="download" size={24} color="black" />
              <Text className='text-black text-sm font-semibold mt-2'>PDF Report</Text>
            </TouchableOpacity>
            <TouchableOpacity className='flex-1 bg-[#CBFD03] rounded-xl p-4 items-center'>
              <Feather name="file-text" size={24} color="black" />
              <Text className='text-black text-sm font-semibold mt-2'>CSV Data</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}