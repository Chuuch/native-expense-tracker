import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

export default function CategoryBreakdown() {
  return (
    <View className="w-full">
      <Text className="text-white text-2xl font-bold mb-4">
        Category Breakdown
      </Text>
      <View className="bg-stone-800 rounded-xl p-4 gap-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 mr-3">
            <View className="bg-red-500 rounded-full p-2">
              <Feather name="shopping-bag" size={16} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold">
                Food & Dining
              </Text>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="w-20 bg-stone-700 rounded-full h-2">
                  <View
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "35%" }}
                  />
                </View>
                <Text className="text-gray-400 text-sm">35%</Text>
              </View>
            </View>
          </View>
          <Text className="text-white text-lg font-bold">$629.74</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 mr-3">
            <View className="bg-blue-500 rounded-full p-2">
              <Feather name="home" size={16} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold">
                Housing
              </Text>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="w-20 bg-stone-700 rounded-full h-2">
                  <View
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: "28%" }}
                  />
                </View>
                <Text className="text-gray-400 text-sm">28%</Text>
              </View>
            </View>
          </View>
          <Text className="text-white text-lg font-bold">$503.79</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 mr-3">
            <View className="bg-green-500 rounded-full p-2">
              <Feather name="truck" size={16} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold">
                Transportation
              </Text>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="w-20 bg-stone-700 rounded-full h-2">
                  <View
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "20%" }}
                  />
                </View>
                <Text className="text-gray-400 text-sm">20%</Text>
              </View>
            </View>
          </View>
          <Text className="text-white text-lg font-bold">$359.85</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 mr-3">
            <View className="bg-purple-500 rounded-full p-2">
              <Feather name="wifi" size={16} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold">
                Utilities
              </Text>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="w-20 bg-stone-700 rounded-full h-2">
                  <View
                    className="bg-purple-500 h-2 rounded-full"
                    style={{ width: "12%" }}
                  />
                </View>
                <Text className="text-gray-400 text-sm">12%</Text>
              </View>
            </View>
          </View>
          <Text className="text-white text-lg font-bold">$215.91</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-3 flex-1 mr-3">
            <View className="bg-orange-500 rounded-full p-2">
              <Feather name="gift" size={16} color="white" />
            </View>
            <View className="flex-1">
              <Text className="text-white text-base font-semibold">
                Entertainment
              </Text>
              <View className="flex-row items-center gap-2 mt-1">
                <View className="w-20 bg-stone-700 rounded-full h-2">
                  <View
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: "5%" }}
                  />
                </View>
                <Text className="text-gray-400 text-sm">5%</Text>
              </View>
            </View>
          </View>
          <Text className="text-white text-lg font-bold">$89.96</Text>
        </View>
      </View>
    </View>
  );
}
