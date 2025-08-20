import { Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const notificationCategories = [
  {
    id: 'expense-reminders',
    title: 'Expense Reminders',
    subtitle: 'Daily and weekly expense tracking reminders',
    icon: MaterialIcons,
    iconName: 'account-balance-wallet' as const,
    color: '#CBFD03',
    enabled: true
  },
  {
    id: 'budget-alerts',
    title: 'Budget Alerts',
    subtitle: 'Get notified when approaching budget limits',
    icon: MaterialCommunityIcons,
    iconName: 'target' as const,
    color: '#CBFD03',
    enabled: true
  },
  {
    id: 'savings-goals',
    title: 'Savings Goals',
    subtitle: 'Updates on your savings progress',
    icon: MaterialCommunityIcons,
    iconName: 'piggy-bank' as const,
    color: '#CBFD03',
    enabled: false
  },
  {
    id: 'price-alerts',
    title: 'Price Alerts',
    subtitle: 'Cryptocurrency and stock price notifications',
    icon: MaterialCommunityIcons,
    iconName: 'bitcoin' as const,
    color: '#CBFD03',
    enabled: true
  },
  {
    id: 'bill-reminders',
    title: 'Bill Reminders',
    subtitle: 'Upcoming bill payment notifications',
    icon: MaterialIcons,
    iconName: 'receipt' as const,
    color: '#CBFD03',
    enabled: false
  },
  {
    id: 'app-updates',
    title: 'App Updates',
    subtitle: 'New features and app improvements',
    icon: MaterialIcons,
    iconName: 'system-update' as const,
    color: '#CBFD03',
    enabled: true
  }
];

const reminderOptions = [
  {
    id: 'daily',
    title: 'Daily',
    subtitle: 'Every day at 9:00 PM',
    enabled: true
  },
  {
    id: 'weekly',
    title: 'Weekly',
    subtitle: 'Every Sunday at 6:00 PM',
    enabled: true
  },
  {
    id: 'monthly',
    title: 'Monthly',
    subtitle: 'First day of each month',
    enabled: false
  }
];

const quietHours = [
  {
    id: 'enabled',
    title: 'Quiet Hours',
    subtitle: '10:00 PM - 8:00 AM',
    enabled: true
  }
];

export default function NotificationSettings() {
  const router = useRouter();
  const [notifications, setNotifications] = useState(notificationCategories);
  const [reminders, setReminders] = useState(reminderOptions);
  const [quietHoursEnabled, setQuietHoursEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [lockScreenEnabled, setLockScreenEnabled] = useState(false);

  const toggleNotification = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, enabled: !notification.enabled }
          : notification
      )
    );
  };

  const toggleReminder = (id: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === id 
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const toggleQuietHours = () => {
    setQuietHoursEnabled(!quietHoursEnabled);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const toggleVibration = () => {
    setVibrationEnabled(!vibrationEnabled);
  };

  const toggleLockScreen = () => {
    setLockScreenEnabled(!lockScreenEnabled);
  };

  return (
    <View className='flex-1 bg-stone-950 pt-20'>
      {/* Header */}
      <View className='flex-row items-center justify-between w-full p-4'>
        <TouchableOpacity 
          className='bg-stone-800 rounded-xl p-2'
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#CBFD03" />
        </TouchableOpacity>
        <Text className='text-white text-4xl font-bold'>Notifications</Text>
        <TouchableOpacity className='bg-stone-800 rounded-xl p-2'>
          <Feather name="info" size={24} color="#CBFD03" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className='flex-1 bg-stone-950 px-4'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >
        {/* Description */}
        <View className='w-full bg-stone-800 rounded-xl p-4'>
          <View className='flex-row items-start gap-3'>
            <Feather name="bell" size={24} color="#CBFD03" />
            <View className='flex-1'>
              <Text className='text-white text-base font-semibold mb-1'>Notification Settings</Text>
              <Text className='text-gray-400 text-sm'>
                Customize which notifications you want to receive and when. You can change these settings anytime.
              </Text>
            </View>
          </View>
        </View>

        {/* Notification Categories */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Notification Types</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <TouchableOpacity
                  key={notification.id}
                  className='flex-row items-center justify-between w-full p-3 rounded-lg'
                  onPress={() => toggleNotification(notification.id)}
                >
                  <View className='flex-row items-center justify-start gap-3 flex-1'>
                    <View className='bg-stone-700 rounded-full p-2'>
                      <IconComponent
                        name={notification.iconName as any}
                        size={20}
                        color={notification.color}
                      />
                    </View>
                    <View className='flex-1'>
                      <Text className='text-white text-base font-semibold'>{notification.title}</Text>
                      <Text className='text-gray-400 text-sm'>{notification.subtitle}</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    className={`w-12 h-6 rounded-full p-1 ${
                      notification.enabled ? 'bg-[#CBFD03]' : 'bg-stone-600'
                    }`}
                    onPress={() => toggleNotification(notification.id)}
                  >
                    <View className={`w-4 h-4 rounded-full bg-white ${
                      notification.enabled ? 'ml-6' : 'ml-0'
                    }`} />
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Reminder Schedule */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Reminder Schedule</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {reminders.map((reminder) => (
              <TouchableOpacity
                key={reminder.id}
                className='flex-row items-center justify-between w-full p-3 rounded-lg'
                onPress={() => toggleReminder(reminder.id)}
              >
                <View className='flex-row items-center justify-start gap-3 flex-1'>
                  <View className='bg-stone-700 rounded-full p-2'>
                    <Feather name="clock" size={20} color="#CBFD03" />
                  </View>
                  <View className='flex-1'>
                    <Text className='text-white text-base font-semibold'>{reminder.title}</Text>
                    <Text className='text-gray-400 text-sm'>{reminder.subtitle}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  className={`w-12 h-6 rounded-full p-1 ${
                    reminder.enabled ? 'bg-[#CBFD03]' : 'bg-stone-600'
                  }`}
                  onPress={() => toggleReminder(reminder.id)}
                >
                  <View className={`w-4 h-4 rounded-full bg-white ${
                    reminder.enabled ? 'ml-6' : 'ml-0'
                  }`} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quiet Hours */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Quiet Hours</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            <TouchableOpacity
              className='flex-row items-center justify-between w-full p-3 rounded-lg'
              onPress={toggleQuietHours}
            >
              <View className='flex-row items-center justify-start gap-3 flex-1'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="moon" size={20} color="#CBFD03" />
                </View>
                <View className='flex-1'>
                  <Text className='text-white text-base font-semibold'>Quiet Hours</Text>
                  <Text className='text-gray-400 text-sm'>10:00 PM - 8:00 AM</Text>
                </View>
              </View>
              <TouchableOpacity 
                className={`w-12 h-6 rounded-full p-1 ${
                  quietHoursEnabled ? 'bg-[#CBFD03]' : 'bg-stone-600'
                }`}
                onPress={toggleQuietHours}
              >
                <View className={`w-4 h-4 rounded-full bg-white ${
                  quietHoursEnabled ? 'ml-6' : 'ml-0'
                }`} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sound & Vibration */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Sound & Vibration</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-4'>
            <TouchableOpacity 
              className='flex-row items-center justify-between w-full'
              onPress={toggleSound}
            >
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="volume-2" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Sound</Text>
                  <Text className='text-gray-400 text-sm'>Play notification sounds</Text>
                </View>
              </View>
              <TouchableOpacity 
                className={`w-12 h-6 rounded-full p-1 ${
                  soundEnabled ? 'bg-[#CBFD03]' : 'bg-stone-600'
                }`}
                onPress={toggleSound}
              >
                <View className={`w-4 h-4 rounded-full bg-white ${
                  soundEnabled ? 'ml-6' : 'ml-0'
                }`} />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity 
              className='flex-row items-center justify-between w-full'
              onPress={toggleVibration}
            >
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="smartphone" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Vibration</Text>
                  <Text className='text-gray-400 text-sm'>Vibrate on notifications</Text>
                </View>
              </View>
              <TouchableOpacity 
                className={`w-12 h-6 rounded-full p-1 ${
                  vibrationEnabled ? 'bg-[#CBFD03]' : 'bg-stone-600'
                }`}
                onPress={toggleVibration}
              >
                <View className={`w-4 h-4 rounded-full bg-white ${
                  vibrationEnabled ? 'ml-6' : 'ml-0'
                }`} />
              </TouchableOpacity>
            </TouchableOpacity>

            <TouchableOpacity 
              className='flex-row items-center justify-between w-full'
              onPress={toggleLockScreen}
            >
              <View className='flex-row items-center gap-3'>
                <View className='bg-stone-700 rounded-full p-2'>
                  <Feather name="eye" size={20} color="#CBFD03" />
                </View>
                <View>
                  <Text className='text-white text-base font-semibold'>Show on Lock Screen</Text>
                  <Text className='text-gray-400 text-sm'>Display notifications when locked</Text>
                </View>
              </View>
              <TouchableOpacity 
                className={`w-12 h-6 rounded-full p-1 ${
                  lockScreenEnabled ? 'bg-[#CBFD03]' : 'bg-stone-600'
                }`}
                onPress={toggleLockScreen}
              >
                <View className={`w-4 h-4 rounded-full bg-white ${
                  lockScreenEnabled ? 'ml-6' : 'ml-0'
                }`} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </View>

        {/* Notification Preview */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Preview</Text>
          <View className='bg-stone-800 rounded-xl p-4'>
            <Text className='text-gray-400 text-sm mb-4'>How your notifications will look:</Text>
            <View className='bg-stone-700 rounded-xl p-4'>
              <View className='flex-row items-center gap-3 mb-2'>
                <View className='bg-[#CBFD03] rounded-full p-2'>
                  <Feather name="bar-chart-2" size={16} color="black" />
                </View>
                <View className='flex-1'>
                  <Text className='text-white text-sm font-semibold'>Expense Tracker</Text>
                  <Text className='text-gray-400 text-xs'>Just now</Text>
                </View>
              </View>
              <Text className='text-white text-sm'>
                Don't forget to log today's expenses! You've spent $45.20 so far.
              </Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View className='w-full mb-20'>
          <TouchableOpacity 
            className='bg-[#CBFD03] rounded-xl p-4 items-center'
            onPress={() => {
              console.log('Notification settings saved');
              router.back();
            }}
          >
            <Text className='text-black text-lg font-semibold'>Save Settings</Text>
          </TouchableOpacity>
          <Text className='text-gray-400 text-sm text-center mt-2'>
            Changes will take effect immediately
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}