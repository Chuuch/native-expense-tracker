import { useTheme } from '@/contexts/ThemeContext';
import { Entypo, Feather, FontAwesome6, Fontisto, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const feedbackCategories = [
  {
    id: 'bug',
    title: 'Bug Report',
    subtitle: 'Report an issue or problem',
    icon: MaterialCommunityIcons,
    iconName: 'bug' as const,
    color: '#ef4444'
  },
  {
    id: 'feature',
    title: 'Feature Request',
    subtitle: 'Suggest a new feature',
    icon: Feather,
    iconName: 'plus-circle' as const,
    color: '#615eff'
  },
  {
    id: 'improvement',
    title: 'Improvement',
    subtitle: 'Suggest an improvement',
    icon: MaterialIcons,
    iconName: 'trending-up' as const,
    color: '#3b82f6'
  },
  {
    id: 'general',
    title: 'General Feedback',
    subtitle: 'Share your thoughts',
    icon: Feather,
    iconName: 'message-circle' as const,
    color: '#8b5cf6'
  }
];

const ratingOptions = [
  { value: 1, label: 'Poor', icon: <Entypo name="emoji-sad" size={24} color="#615eff" /> },
  { value: 2, label: 'Fair', icon: <Entypo name="emoji-neutral" size={24} color="#615eff" /> },
  { value: 3, label: 'Good', icon: <Entypo name="emoji-happy" size={24} color="#615eff" /> },
  { value: 4, label: 'Very Good', icon: <FontAwesome6 name="smile-beam" size={24} color="#615eff" /> },
  { value: 5, label: 'Excellent', icon: <Fontisto name="smiley" size={24} color="#615eff" /> }
];

export default function FeedbackScreen() {
  const { colors, tint } = useTheme();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [includeScreenshot, setIncludeScreenshot] = useState(false);
  const [includeSystemInfo, setIncludeSystemInfo] = useState(true);

  const handleSubmit = () => {
    if (!selectedCategory || !feedback.trim()) {
      console.log('Please fill in all required fields');
      return;
    }
    
    console.log('Feedback submitted:', {
      category: selectedCategory,
      rating,
      feedback: feedback.trim(),
      email: email.trim(),
      includeScreenshot,
      includeSystemInfo
    });
    
    // Here you would typically send the feedback to your backend
    router.back();
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
        <Text className={`${colors.text} text-4xl font-bold`}>Feedback</Text>
        <TouchableOpacity className={`${colors.card} rounded-xl p-2`}>
          <Feather name="info" size={24} color={tint.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className={`flex-1 ${colors.background} px-4`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Welcome Message */}
        <View className={`w-full ${colors.card} rounded-xl p-6`}>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Share Your Thoughts</Text>
          <Text className={`${colors.textSecondary} text-base`}>
            Your feedback helps us improve the app for everyone. We read every submission and use it to make our product better.
          </Text>
        </View>

        {/* Feedback Category */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>What type of feedback do you have? *</Text>
          <View className='gap-3'>
            {feedbackCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  className={`flex-row items-center justify-between w-full p-4 rounded-xl border-2 ${
                    selectedCategory === category.id 
                      ? `${colors.accent} border-[${colors.accent}]` 
                      : `${colors.cardSecondary} border-[${colors.border}]`
                  }`}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <View className='flex-row items-center gap-3 flex-1'>
                    <View className={`${colors.cardSecondary} rounded-full p-2`}>
                      <IconComponent name={category.iconName as any} size={24} color={category.color} />
                    </View>
                    <View className='flex-1'>
                      <Text className={`${colors.text} text-base font-semibold`}>{category.title}</Text>
                      <Text className={`${colors.textSecondary} text-sm`}>{category.subtitle}</Text>
                    </View>
                  </View>
                  {selectedCategory === category.id && (
                    <View className={`${colors.accent} rounded-full p-1`}>
                      <Feather name="check" size={16} color="white" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Overall Rating */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>How would you rate your experience?</Text>
          <View className={`${colors.card} rounded-xl p-6`}>
            <View className='flex-row justify-between mb-4'>
              {ratingOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`flex-col items-center p-3 rounded-xl ${
                    rating === option.value ? `${colors.cardSecondary}` : ''
                  }`}
                  onPress={() => setRating(option.value)}
                >
                  <Text className='text-3xl mb-2'>{option.icon}</Text>
                  <Text className={`text-sm font-semibold ${
                    rating === option.value ? `text-[${colors.text}]` : `text-[${colors.textSecondary}]`
                  }`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {rating > 0 && (
              <Text className={`${colors.textSecondary} text-sm text-center`}>
                Thank you for your {ratingOptions[rating - 1].label.toLowerCase()} rating!
              </Text>
            )}
          </View>
        </View>

        {/* Feedback Text */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Tell us more *</Text>
          <View className={`${colors.card} rounded-xl p-4`}>
            <TextInput
              className={`${colors.text} text-base min-h-[120px]`}
              placeholder='Describe your feedback in detail...'
              placeholderTextColor='#6b7280'
              multiline
              textAlignVertical='top'
              value={feedback}
              onChangeText={setFeedback}
            />
          </View>
          <Text className={`${colors.textSecondary} text-sm mt-2`}>
            Be as specific as possible. Include steps to reproduce if reporting a bug.
          </Text>
        </View>

        {/* Contact Email */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Contact Email (Optional)</Text>
          <View className={`${colors.card} rounded-xl p-4`}>
            <TextInput
              className={`${colors.text} text-base`}
              placeholder='your.email@example.com'
              placeholderTextColor='#6b7280'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>
          <Text className={`${colors.textSecondary} text-sm mt-2`}>
            We'll use this to follow up on your feedback if needed.
          </Text>
        </View>

        {/* Additional Options */}
        <View className='w-full'>
          <Text className={`${colors.text} text-xl font-bold mb-4`}>Additional Information</Text>
          <View className={`${colors.card} rounded-xl p-4 gap-4`}>
            <TouchableOpacity
              className='flex-row items-center justify-between w-full'
              onPress={() => setIncludeScreenshot(!includeScreenshot)}
            >
              <View className='flex-row items-center gap-3'>
                <Feather name="image" size={20} color="#615eff" />
                <View>
                  <Text className={`${colors.text} text-base font-semibold`}>Include Screenshot</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Add a screenshot to help us understand</Text>
                </View>
              </View>
              <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                includeScreenshot ? `bg-[${colors.accent}] border-[${colors.accent}]` : `border-[${colors.border}]`
              }`}>
                {includeScreenshot && <Feather name="check" size={14} color="white" />}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              className='flex-row items-center justify-between w-full'
              onPress={() => setIncludeSystemInfo(!includeSystemInfo)}
            >
              <View className='flex-row items-center gap-3'>
                <Feather name="smartphone" size={20} color="#615eff" />
                <View>
                    <Text className={`${colors.text} text-base font-semibold`}>Include System Info</Text>
                  <Text className={`${colors.textSecondary} text-sm`}>Device info, app version, etc.</Text>
                </View>
              </View>
              <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                includeSystemInfo ? `bg-[${colors.accent}] border-[${colors.accent}]` : `border-[${colors.border}]`
              }`}>
                {includeSystemInfo && <Feather name="check" size={14} color="white" />}
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Screenshot Upload (if enabled) */}
        {includeScreenshot && (
          <View className='w-full'>
              <Text className={`${colors.text} text-xl font-bold mb-4`}>Screenshot</Text>
            <TouchableOpacity className={`${colors.card} rounded-xl p-6 border-2 border-dashed border-[${colors.border}] items-center`}>
              <Feather name="upload" size={32} color="#615eff" />
              <Text className={`${colors.text} text-base font-semibold mt-2`}>Tap to add screenshot</Text>
              <Text className={`${colors.textSecondary} text-sm mt-1`}>PNG, JPG up to 5MB</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Submit Button */}
        <View className='w-full mb-20'>
          <TouchableOpacity 
            className={`rounded-xl p-4 items-center ${
              selectedCategory && feedback.trim() 
                ? `bg-[${colors.accent}]` 
                : `${colors.cardSecondary}`
            }`}
            onPress={handleSubmit}
            disabled={!selectedCategory || !feedback.trim()}
          >
            <Text className={`text-lg font-semibold ${
              selectedCategory && feedback.trim() 
                ? `text-[${colors.text}]` 
                : `text-white`
            }`}>
              Submit Feedback
            </Text>
          </TouchableOpacity>
          <Text className={`${colors.textSecondary} text-sm text-center mt-2`}>
            We typically respond within 24-48 hours
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
