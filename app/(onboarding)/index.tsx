import analytics from '@/assets/lottie/analytics.json';
import Finance from '@/assets/lottie/finance.json';
import organized from '@/assets/lottie/organized.json';
import saveMoney from '@/assets/lottie/saveMoney.json';
import { useTheme } from '@/contexts/ThemeContext';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
const { width: screenWidth } = Dimensions.get('window');

const introScreens = [
  {
    id: 1,
    title: 'Track Expenses',
    description: 'Easily log and categorize your daily expenses. Get insights into your spending patterns and identify areas where you can save more money.',
    lottie: Finance
  },
  {
    id: 2,
    title: 'Save Money',
    description: 'Set personalized savings goals and track your progress. Watch your money grow with visual progress indicators and smart reminders.',
    lottie: saveMoney
  },
  {
    id: 3,
    title: 'Smart Analytics',
    description: 'Get detailed insights into your financial habits with beautiful charts and reports. Understand your spending trends and make better financial decisions.',
    lottie: analytics
  },
  {
    id: 4,
    title: 'Stay Organized',
    description: 'Keep all your financial data in one secure place. Export reports, set budgets, and manage your finances with ease.',
    lottie: organized
  }
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();
  const { colors } = useTheme();
  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / screenWidth);
    setCurrentIndex(index);
  };

  const handleDotPress = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * screenWidth,
      animated: true,
    });
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < introScreens.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({
        x: nextIndex * screenWidth,
        animated: true,
      });
      setCurrentIndex(nextIndex);
    } else {
      // Navigate directly to auth flow
      router.replace('/login');
    }
  };

  const handleSkip = () => {
    router.replace('/login');
  };

  return (
    <View className={`flex-1 ${colors.background}`}>
      {/* Skip Button */}
      <TouchableOpacity 
        className={`absolute top-16 right-6 z-10 ${colors.cardSecondary} rounded-xl px-4 py-2`}
        onPress={handleSkip}
      >
        <Text className={`${colors.text} text-sm font-semibold`}>Skip</Text>
      </TouchableOpacity>

      {/* Swipeable Content */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className='flex-1'
      >
        {introScreens.map((screen, index) => (
          <View key={screen.id} style={{ width: screenWidth }} className='flex-1 justify-center items-center px-8'>
            {/* Icon */}
            <View className='mb-8'>
              <LottieView source={screen.lottie} autoPlay loop style={{ width: 300, height: 300 }} />
            </View>

            {/* Title */}
            <Text className={`${colors.text} text-4xl font-bold text-center mb-6`}>
              {screen.title}
            </Text>

            {/* Description */}
            <Text className={`${colors.textSecondary} text-lg text-center leading-7 px-4`}>
              {screen.description}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Section */}
      <View className='px-8 pb-16'>
        {/* Dot Indicators */}
        <View className='flex-row justify-center items-center mb-8'>
          {introScreens.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              className={`w-3 h-3 rounded-full mx-1 ${
                index === currentIndex ? `${colors.accent}` : `${colors.cardSecondary}`
              }`}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View className='flex-row items-center justify-between'>
          {/* Previous Button (hidden on first screen) */}
          <View className='flex-1'>
            {currentIndex > 0 && (
              <TouchableOpacity
                className={`${colors.cardSecondary} rounded-xl px-6 py-4 items-center w-full`}
                onPress={() => {
                  const prevIndex = currentIndex - 1;
                  scrollViewRef.current?.scrollTo({
                    x: prevIndex * screenWidth,
                    animated: true,
                  });
                  setCurrentIndex(prevIndex);
                }}
              >
                <Text className={`${colors.text} text-base font-semibold`}>Previous</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Next/Get Started Button */}
          <View className='flex-1 ml-4'>
            <TouchableOpacity
              className={`${colors.accent} rounded-xl px-6 py-4 items-center w-full`}
              onPress={handleNext}
            >
              <Text className={`${colors.text} text-base font-semibold`}>
                {currentIndex === introScreens.length - 1 ? 'Get Started' : 'Next'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
