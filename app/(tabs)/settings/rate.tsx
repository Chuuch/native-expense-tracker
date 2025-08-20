import { Entypo, Feather, FontAwesome6, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ratingOptions = [
  { value: 1, label: 'Poor', icon: <Entypo name="emoji-sad" size={24} color="#CBFD03" /> },
  { value: 2, label: 'Fair', icon: <Entypo name="emoji-neutral" size={24} color="#CBFD03" /> },
  { value: 3, label: 'Good', icon: <Entypo name="emoji-happy" size={24} color="#CBFD03" /> },
  { value: 4, label: 'Very Good', icon: <FontAwesome6 name="smile-beam" size={24} color="#CBFD03" /> },
  { value: 5, label: 'Excellent', icon: <Fontisto name="smiley" size={24} color="#CBFD03" /> }
];

const appStores = [
  {
    id: 'ios',
    name: 'App Store',
    icon: MaterialCommunityIcons,
    iconName: 'apple' as const,
    color: '#000000',
    bgColor: '#ffffff'
  },
  {
    id: 'android',
    name: 'Google Play',
    icon: MaterialCommunityIcons,
    iconName: 'google-play' as const,
    color: '#ffffff',
    bgColor: '#01875f'
  }
];

const reasons = [
  'Great user experience',
  'Helps me save money',
  'Easy to use',
  'Beautiful design',
  'Reliable and fast',
  'Excellent features',
  'Good customer support',
  'Regular updates'
];

export default function RateAppScreen() {
  const router = useRouter();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);

  const handleReasonToggle = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter(r => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleRateOnStore = (storeId: string) => {
    console.log('Rate on store:', storeId);
    // Here you would typically open the app store link
    // For iOS: Linking.openURL('https://apps.apple.com/app/your-app-id')
    // For Android: Linking.openURL('https://play.google.com/store/apps/details?id=your.package.name')
  };

  const handleSubmitFeedback = () => {
    console.log('Feedback submitted:', {
      rating,
      feedback: feedback.trim(),
      selectedReasons
    });
    // Here you would typically send the feedback to your backend
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
        <View className='flex-row items-center gap-2'>
          <Text className='text-white text-4xl font-bold'>Rate App</Text>
        </View>
        <TouchableOpacity className='bg-stone-800 rounded-xl p-2'>
          <Feather name="info" size={24} color="#CBFD03" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className='flex-1 bg-stone-950 px-4'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Welcome Message */}
        <View className='w-full bg-stone-800 rounded-xl p-6'>
          <Text className='text-white text-xl font-bold mb-4'>How are we doing?</Text>
          <Text className='text-gray-400 text-base'>
            Your rating helps other users discover our app and motivates us to keep improving. We'd love to hear your thoughts!
          </Text>
        </View>

        {/* Rating Section */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Rate your experience</Text>
          <View className='bg-stone-800 rounded-xl p-6'>
            <View className='flex-row justify-evenly mb-6'>
              {ratingOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`flex-col items-center p-3 rounded-xl ${
                    rating === option.value ? 'bg-stone-700' : ''
                  }`}
                  onPress={() => setRating(option.value)}
                >
                  <View className='mb-2'>
                    {option.icon}
                  </View>
                  <Text className={`text-sm font-semibold ${
                    rating === option.value ? 'text-[#CBFD03]' : 'text-gray-400'
                  }`}>
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {rating > 0 && (
              <Text className='text-gray-400 text-sm text-center'>
                Thank you for your {ratingOptions[rating - 1].label.toLowerCase()} rating!
              </Text>
            )}
          </View>
        </View>

        {/* App Store Rating (for 4-5 stars) */}
        {rating >= 4 && (
          <View className='w-full'>
            <Text className='text-white text-xl font-bold mb-4'>Rate us on the App Store</Text>
            <View className='bg-stone-800 rounded-xl p-6'>
              <Text className='text-gray-400 text-base mb-6 text-center'>
                Help other users discover our app by rating it on the app store. It only takes a moment!
              </Text>
              <View className='gap-3'>
                {appStores.map((store) => {
                  const IconComponent = store.icon;
                  return (
                    <TouchableOpacity
                      key={store.id}
                      className='flex-row items-center justify-between w-full p-4 rounded-xl'
                      style={{ backgroundColor: store.bgColor }}
                      onPress={() => handleRateOnStore(store.id)}
                    >
                      <View className='flex-row items-center gap-3'>
                        <IconComponent name={store.iconName as any} size={24} color={store.color} />
                        <Text className='text-base font-semibold' style={{ color: store.color }}>
                          Rate on {store.name}
                        </Text>
                      </View>
                      <Feather name="external-link" size={20} color={store.color} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* What do you like? (for 4-5 stars) */}
        {rating >= 4 && (
          <View className='w-full'>
            <Text className='text-white text-xl font-bold mb-4'>What do you like most?</Text>
            <View className='bg-stone-800 rounded-xl p-4'>
              <View className='flex-row flex-wrap gap-2'>
                {reasons.map((reason) => (
                  <TouchableOpacity
                    key={reason}
                    className={`px-3 py-2 rounded-full border ${
                      selectedReasons.includes(reason)
                        ? 'bg-[#CBFD03] border-[#CBFD03]'
                        : 'bg-stone-700 border-stone-600'
                    }`}
                    onPress={() => handleReasonToggle(reason)}
                  >
                    <Text className={`text-sm font-semibold ${
                      selectedReasons.includes(reason) ? 'text-black' : 'text-white'
                    }`}>
                      {reason}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Additional Feedback (for 4-5 stars) */}
        {rating >= 4 && (
          <View className='w-full'>
            <Text className='text-white text-xl font-bold mb-4'>Tell us more (Optional)</Text>
            <View className='bg-stone-800 rounded-xl p-4'>
              <TextInput
                className='text-white text-base min-h-[100px]'
                placeholder='Share what you love about the app...'
                placeholderTextColor='#6b7280'
                multiline
                textAlignVertical='top'
                value={feedback}
                onChangeText={setFeedback}
              />
            </View>
          </View>
        )}

        {/* Improvement Feedback (for 1-3 stars) */}
        {rating > 0 && rating <= 3 && (
          <View className='w-full'>
            <Text className='text-white text-xl font-bold mb-4'>How can we improve?</Text>
            <View className='bg-stone-800 rounded-xl p-4'>
              <TextInput
                className='text-white text-base min-h-[100px]'
                placeholder='Tell us what we can do better...'
                placeholderTextColor='#6b7280'
                multiline
                textAlignVertical='top'
                value={feedback}
                onChangeText={setFeedback}
              />
            </View>
            <Text className='text-gray-400 text-sm mt-2'>
              Your feedback helps us make the app better for everyone.
            </Text>
          </View>
        )}

        {/* Submit Button */}
        <View className='w-full'>
          <TouchableOpacity 
            className={`rounded-xl p-4 items-center ${
              rating > 0 ? 'bg-[#CBFD03]' : 'bg-stone-700'
            }`}
            onPress={handleSubmitFeedback}
            disabled={rating === 0}
          >
            <Text className={`text-lg font-semibold ${
              rating > 0 ? 'text-black' : 'text-gray-400'
            }`}>
              {rating >= 4 ? 'Submit Feedback' : 'Send Improvement Suggestions'}
            </Text>
          </TouchableOpacity>
          <Text className='text-gray-400 text-sm text-center mt-2'>
            Thank you for helping us improve!
          </Text>
        </View>

        {/* Share App */}
        <View className='w-full mb-20'>
          <Text className='text-white text-xl font-bold mb-4'>Share with Friends</Text>
          <View className='bg-stone-800 rounded-xl p-6'>
            <Text className='text-gray-400 text-base mb-4 text-center'>
              Love the app? Share it with friends and family who might find it useful!
            </Text>
            <TouchableOpacity className='bg-[#CBFD03] rounded-xl p-4 items-center'>
              <Text className='text-black text-lg font-semibold'>Share App</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
