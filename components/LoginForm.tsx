import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setLoading(true);
    setLoading(false);
  }

  return (
    <>
      {/* Login Form */}
      <View className="mb-8">
        {/* Email Input */}
        <View className="mb-6">
          <Text className="text-white text-base font-semibold mb-3">
            Email Address
          </Text>
          <View className="bg-stone-800 rounded-xl p-4 flex-row items-center">
            <Feather name="mail" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Enter your email"
              placeholderTextColor="#6b7280"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className="text-white text-base font-semibold mb-3">
            Password
          </Text>
          <View className="bg-stone-800 rounded-xl p-4 flex-row items-center">
            <Feather name="lock" size={20} color="#6b7280" />
            <TextInput
              className="flex-1 text-white text-base ml-3"
              placeholder="Enter your password"
              placeholderTextColor="#6b7280"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity>
              <Feather name="eye" size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Remember Me & Forgot Password */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity className="flex-row items-center">
            <View className="w-5 h-5 bg-stone-700 rounded mr-2">
              <View className="w-5 h-5 bg-[#CBFD03] rounded" />
            </View>
            <Text className="text-gray-400 text-sm">Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/forgotten-password")}
          >
            <Text className="text-[#CBFD03] text-sm font-semibold">
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-[#CBFD03] rounded-xl p-4 items-center mb-6"
          disabled={loading}
          onPress={signInWithEmail}
        >
          <Text className="text-black text-lg font-semibold">
            {loading ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className="flex-1 h-px bg-stone-700" />
          <Text className="text-gray-400 text-sm mx-4">or continue with</Text>
          <View className="flex-1 h-px bg-stone-700" />
        </View>

        {/* Social Login Buttons */}
        <View className="flex-row gap-4 mb-8">
          <TouchableOpacity className="flex-1 bg-stone-800 rounded-xl p-4 items-center">
            <AntDesign name="google" size={24} color="#CBFD03" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-stone-800 rounded-xl p-4 items-center">
            <AntDesign name="apple1" size={24} color="#CBFD03" />
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 bg-stone-800 rounded-xl p-4 items-center">
            <Feather name="smartphone" size={24} color="#CBFD03" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
