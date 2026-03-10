import { useTheme } from '@/contexts/ThemeContext';
import { AntDesign, Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useAuth } from "../hooks";

export default function LoginForm() {
  const { colors } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [enableBiometrics, setEnableBiometrics] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const { login, isLoadingLogin, loginWithGoogle, isLoadingGoogle } = useAuth();
  const isLoading = isLoadingLogin || isLoadingGoogle;

  async function signInWithEmail() {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleBiometricLogin = async () => {
    try {
      setLoading(true);
      await login(email, password, enableBiometrics);
    } catch (error) {
      
    }
  }

  return (
    <>
      {/* Login Form */}
      <View className="mb-8">
        {/* Email Input */}
        <View className="mb-6">
          <Text className={`${colors.text} text-base font-semibold mb-3`}>
            Email Address
          </Text>
          <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
            <Feather name="mail" size={20} color="#615eff" />
            <TextInput
              className={`flex-1 ${colors.text} text-base ml-3`}
              placeholder="Enter your email"
              placeholderTextColor="#615eff"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* Password Input */}
        <View className="mb-6">
          <Text className={`${colors.text} text-base font-semibold mb-3`}>
            Password
          </Text>
          <View className={`${colors.cardSecondary} rounded-xl p-4 flex-row items-center`}>
            <Feather name="lock" size={20} color="#615eff" />
            <TextInput
              className={`flex-1 ${colors.text} text-base ml-3`}
              placeholder="Enter your password"
              placeholderTextColor="#615eff"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
              <TouchableOpacity>
                <Feather name="eye" size={20} color="#615eff" />
              </TouchableOpacity>
          </View>
        </View>

        {/* Remember Me & Forgot Password */}
        <View className="flex-row items-center justify-between mb-8">
          <TouchableOpacity className="flex-row items-center">
            <View className={`w-5 h-5 ${colors.cardSecondary} rounded mr-2`}>
              <View className={`w-5 h-5 ${colors.accent} rounded`} />
            </View>
            <Text className={`${colors.textSecondary} text-sm`}>Remember me</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/forgotten-password")}
          >
            <Text className={`${colors.text} text-sm font-semibold`}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className={`${colors.accent} rounded-xl p-4 items-center mb-6`}
          disabled={isLoading}
          onPress={signInWithEmail}
        >
          <Text className={`${colors.textButton} text-lg font-semibold`}>
            {isLoadingLogin ? "Signing In..." : "Sign In"}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View className="flex-row items-center mb-6">
          <View className={`flex-1 h-px ${colors.cardSecondary}`} />
          <Text className={`${colors.textSecondary} text-sm mx-4`}>or continue with</Text>
          <View className={`flex-1 h-px ${colors.cardSecondary}`} />
        </View>

        {/* Social Login Buttons */}
        <View className="flex-row gap-4">
            <TouchableOpacity className={`flex-1 ${colors.cardSecondary} rounded-xl p-4 items-center`}
            disabled={isLoading}
            onPress={loginWithGoogle}>
            <AntDesign name="google" size={24} color="#615eff" />
            {isLoadingGoogle ? (
              <ActivityIndicator size='small' color='#615eff' style={{ marginTop: 4 }}/>
            ): null}
          </TouchableOpacity>
          <TouchableOpacity className={`flex-1 ${colors.cardSecondary} rounded-xl p-4 items-center`}>
            <AntDesign name="apple" size={24} color="#615eff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleBiometricLogin} disabled={loading} className={`flex-1 ${colors.cardSecondary} rounded-xl p-4 items-center`}>
            <Feather name="smartphone" size={24} color="#615eff" />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
