import { useTheme } from '@/contexts/ThemeContext';
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
    color: '#615eff',
    enabled: true
  },
  {
    id: 'budget-alerts',
    title: 'Budget Alerts',
    subtitle: 'Get notified when approaching budget limits',
    icon: MaterialCommunityIcons,
    iconName: 'target' as const,
    color: '#615eff',
    enabled: true
  },
  {
    id: 'savings-goals',
    title: 'Savings Goals',
    subtitle: 'Updates on your savings progress',
    icon: MaterialCommunityIcons,
    iconName: 'piggy-bank' as const,
    color: '#615eff',
    enabled: false
  },
  {
    id: 'price-alerts',
    title: 'Price Alerts',
    subtitle: 'Cryptocurrency and stock price notifications',
    icon: MaterialCommunityIcons,
    iconName: 'bitcoin' as const,
    color: '#615eff',
    enabled: true
  },
  {
    id: 'bill-reminders',
    title: 'Bill Reminders',
    subtitle: 'Upcoming bill payment notifications',
    icon: MaterialIcons,
    iconName: 'receipt' as const,
    color: '#615eff',
    enabled: false
  },
  {
    id: 'app-updates',
    title: 'App Updates',
    subtitle: 'New features and app improvements',
    icon: MaterialIcons,
    iconName: 'system-update' as const,
    color: '#615eff',
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
  const { colors } = useTheme();
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
    <View className={`flex-1 ${colors.background} pt-20`}>
      {/* Header */}
      <View className='flex-row items-center justify-between w-full p-4'>
        <TouchableOpacity 
          className={`${colors.card} rounded-xl p-2`}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="#615eff" />
        </TouchableOpacity>
        <Text className={`${colors.text} text-4xl font-bold`}>Notifications</Text>
        <TouchableOpacity className={`${colors.card} rounded-xl p-2`}>
          <Feather name="info" size={24} color="#615eff" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >
        {/* Description */}
        <View className={`w-full ${colors.card} rounded-xl p-4`}>
          <View className='flex-row items-start gap-3'>
            <Feather name="bell" size={24} color="#615eff" />
            <View className='flex-1'>
              <Text className={`${colors.text} text-base font-semibold mb-1`}>Notification Settings</Text>
              <Text className={`${colors.textSecondary} text-sm`}>
                Customize which notifications you want to receive and when. You can change these settings anytime.
              </Text>
            </View>
          </View>
        </View>

        {/* Notification Categories */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Notification Types</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-2`}>
            {notifications.map((notification) => {
              const IconComponent = notification.icon;
              return (
                <TouchableOpacity
                  key={notification.id}
                  className='flex-row items-center justify-between w-full p-3 rounded-lg'
                  onPress={() => toggleNotification(notification.id)}
                >
                  <View className='flex-row items-center justify-start gap-3 flex-1'>
                      <View className={`${colors.cardSecondary} rounded-full p-2`}>
                      <IconComponent
                        name={notification.iconName as any}
                        size={20}
                        color={notification.color}
                      />
                    </View>
                    <View className='flex-1'>
                      <Text className={`${colors.text} text-base font-semibold`}>{notification.title}</Text>
                      <Text className={`${colors.textSecondary} text-sm`}>{notification.subtitle}</Text>
                    </View>
                  </View>
                  <TouchableOpacity 
                    className={`w-12 h-6 rounded-full p-1 ${
                      notification.enabled ? `${colors.accent}` : `${colors.cardSecondary}`
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
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Reminder Schedule</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-2`}>
            {reminders.map((reminder) => (
              <TouchableOpacity
                key={reminder.id}
                className='flex-row items-center justify-between w-full p-3 rounded-lg'
                onPress={() => toggleReminder(reminder.id)}
              >
                <View className='flex-row items-center justify-start gap-3 flex-1'>
                  <View className={`${colors.cardSecondary} rounded-full p-2`}>
                    <Feather name="clock" size={20} color="#615eff" />
                  </View>
                  <View className='flex-1'>
                    <Text className={`${colors.text} text-base font-semibold`}>{reminder.title}</Text>
                    <Text className={`${colors.textSecondary} text-sm`}>{reminder.subtitle}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  className={`w-12 h-6 rounded-full p-1 ${
                    reminder.enabled ? `${colors.accent}` : `${colors.cardSecondary}`
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
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Quiet Hours</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-2`}>
            <TouchableOpacity
              className='flex-row items-center justify-between w-full p-3 rounded-lg'
              onPress={toggleQuietHours}
            >
              <View className='flex-row items-center justify-start gap-3 flex-1'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="moon" size={20} color="#615eff" />
                </View>
                <View className='flex-1'>
                  <Text className={`${colors.text} text-base font-semibold`}>Quiet Hours</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>10:00 PM - 8:00 AM</Text>
                </View>
              </View>
              <TouchableOpacity 
                className={`w-12 h-6 rounded-full p-1 ${
                  quietHoursEnabled ? `${colors.accent}` : `${colors.cardSecondary}`
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
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Sound & Vibration</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            <TouchableOpacity 
              className='flex-row items-center justify-between w-full'
              onPress={toggleSound}
            >
              <View className='flex-row items-center gap-3'>
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="volume-2" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Sound</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Play notification sounds</Text>
                </View>
              </View>
              <TouchableOpacity 
                className={`w-12 h-6 rounded-full p-1 ${
                  soundEnabled ? `${colors.accent}` : `${colors.cardSecondary}`
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
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="smartphone" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Vibration</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Vibrate on notifications</Text>
                </View>
              </View>
              <TouchableOpacity 
                className={`w-12 h-6 rounded-full p-1 ${
                  vibrationEnabled ? `${colors.accent}` : `${colors.cardSecondary}`
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
                <View className={`${colors.cardSecondary} rounded-full p-2`}>
                  <Feather name="eye" size={20} color="#615eff" />
                </View>
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Show on Lock Screen</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Display notifications when locked</Text>
                </View>
              </View>
              <TouchableOpacity 
                className={`w-12 h-6 rounded-full p-1 ${
                  lockScreenEnabled ? `${colors.accent}` : `${colors.cardSecondary}`
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
            <Text className={`${colors.text} text-xl font-bold mb-4`}>Preview</Text>
          <View className={`${colors.card} rounded-xl p-4`}>
            <Text className={`${colors.textSecondary} text-sm mb-4`}>How your notifications will look:</Text>
            <View className={`${colors.card} rounded-xl p-4`}>
              <View className='flex-row items-center gap-3 mb-2'>
                <View className={`${colors.accent} rounded-full p-2`}>
                  <Feather name="bar-chart-2" size={16} color="white" />
                </View>
                <View className='flex-1'>
                  <Text className={`${colors.text} text-sm font-semibold`}>Expense Tracker</Text>
                  <Text className={`${colors.textSecondary} text-xs`}>Just now</Text>
                </View>
              </View>
              <Text className={`${colors.text} text-sm`}>
                Don't forget to log today's expenses! You've spent $45.20 so far.
              </Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View className='w-full'>
          <TouchableOpacity 
            className={`${colors.accent} rounded-xl p-4 items-center`}
            onPress={() => {
              console.log('Notification settings saved');
              router.back();
            }}
          >
            <Text className='text-white text-lg font-semibold'>Save Settings</Text>
          </TouchableOpacity>
          <Text className={`${colors.textSecondary} text-sm text-center mt-2`}>
            Changes will take effect immediately
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}