import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const languages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    isCurrent: true
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇪🇸',
    isCurrent: false
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    flag: '🇫🇷',
    isCurrent: false
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    flag: '🇩🇪',
    isCurrent: false
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    flag: '🇮🇹',
    isCurrent: false
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    flag: '🇵🇹',
    isCurrent: false
  },
  {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    isCurrent: false
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    isCurrent: false
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    isCurrent: false
  },
  {
    code: 'zh',
    name: 'Chinese (Simplified)',
    nativeName: '简体中文',
    flag: '🇨🇳',
    isCurrent: false
  },
  {
    code: 'zh-TW',
    name: 'Chinese (Traditional)',
    nativeName: '繁體中文',
    flag: '🇹🇼',
    isCurrent: false
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    flag: '🇸🇦',
    isCurrent: false
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    flag: '🇮🇳',
    isCurrent: false
  },
  {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    flag: '🇹🇷',
    isCurrent: false
  },
  {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    flag: '🇳🇱',
    isCurrent: false
  },
  {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    isCurrent: false
  },
  {
    code: 'sv',
    name: 'Swedish',
    nativeName: 'Svenska',
    flag: '🇸🇪',
    isCurrent: false
  },
  {
    code: 'no',
    name: 'Norwegian',
    nativeName: 'Norsk',
    flag: '🇳🇴',
    isCurrent: false
  },
  {
    code: 'da',
    name: 'Danish',
    nativeName: 'Dansk',
    flag: '🇩🇰',
    isCurrent: false
  },
  {
    code: 'fi',
    name: 'Finnish',
    nativeName: 'Suomi',
    flag: '🇫🇮',
    isCurrent: false
  },
  {
    code: 'cs',
    name: 'Czech',
    nativeName: 'Čeština',
    flag: '🇨🇿',
    isCurrent: false
  },
  {
    code: 'hu',
    name: 'Hungarian',
    nativeName: 'Magyar',
    flag: '🇭🇺',
    isCurrent: false
  },
  {
    code: 'ro',
    name: 'Romanian',
    nativeName: 'Română',
    flag: '🇷🇴',
    isCurrent: false
  },
  {
    code: 'bg',
    name: 'Bulgarian',
    nativeName: 'Български',
    flag: '🇧🇬',
    isCurrent: false
  },
  {
    code: 'hr',
    name: 'Croatian',
    nativeName: 'Hrvatski',
    flag: '🇭🇷',
    isCurrent: false
  },
  {
    code: 'sk',
    name: 'Slovak',
    nativeName: 'Slovenčina',
    flag: '🇸🇰',
    isCurrent: false
  },
  {
    code: 'sl',
    name: 'Slovenian',
    nativeName: 'Slovenščina',
    flag: '🇸🇮',
    isCurrent: false
  },
  {
    code: 'et',
    name: 'Estonian',
    nativeName: 'Eesti',
    flag: '🇪🇪',
    isCurrent: false
  },
  {
    code: 'lv',
    name: 'Latvian',
    nativeName: 'Latviešu',
    flag: '🇱🇻',
    isCurrent: false
  },
  {
    code: 'lt',
    name: 'Lithuanian',
    nativeName: 'Lietuvių',
    flag: '🇱🇹',
    isCurrent: false
  }
];

export default function LanguageScreen() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // Here you would typically save the selection to your app's state/storage
    console.log('Selected language:', languageCode);
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
        <Text className='text-white text-4xl font-bold'>Language</Text>
        <TouchableOpacity className='bg-stone-800 rounded-xl p-2'>
          <Feather name="info" size={24} color="#CBFD03" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        className='flex-1 bg-stone-950 px-4'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 140, gap: 32 }}
      >

        {/* Current Language Status */}
        <View className='w-full bg-stone-800 rounded-xl p-6'>
          <Text className='text-white text-xl font-bold mb-4'>Current Language</Text>
          <View className='flex-row items-center justify-between'>
            <View className='flex-row items-center gap-3'>
              <Text className='text-4xl'>🇺🇸</Text>
              <View>
                <Text className='text-white text-lg font-semibold'>English</Text>
                <Text className='text-gray-400 text-sm'>English</Text>
              </View>
            </View>
            <View className='bg-[#CBFD03] rounded-xl px-3 py-1'>
              <Text className='text-black text-sm font-semibold'>Active</Text>
            </View>
          </View>
          <Text className='text-gray-400 text-sm mt-4'>
            The app interface and all text will be displayed in this language. Some content may remain in the original language.
          </Text>
        </View>

        {/* Popular Languages */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>Popular Languages</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {languages.slice(0, 8).map((language) => (
              <TouchableOpacity
                key={language.code}
                className={`flex-row items-center justify-between w-full p-4 rounded-lg ${
                  selectedLanguage === language.code ? 'bg-stone-700' : ''
                }`}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <View className='flex-row items-center gap-3 flex-1'>
                  <Text className='text-2xl'>{language.flag}</Text>
                  <View className='flex-1'>
                    <Text className='text-white text-base font-semibold'>{language.name}</Text>
                    <Text className='text-gray-400 text-sm'>{language.nativeName}</Text>
                  </View>
                </View>
                <View className='flex-row items-center gap-3'>
                  {selectedLanguage === language.code && (
                    <View className='bg-[#CBFD03] rounded-full p-1'>
                      <Feather name="check" size={16} color="black" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* All Languages */}
        <View className='w-full'>
          <Text className='text-white text-xl font-bold mb-4'>All Languages</Text>
          <View className='bg-stone-800 rounded-xl p-4 gap-2'>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                className={`flex-row items-center justify-between w-full p-4 rounded-lg ${
                  selectedLanguage === language.code ? 'bg-stone-700' : ''
                }`}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <View className='flex-row items-center gap-3 flex-1'>
                  <Text className='text-2xl'>{language.flag}</Text>
                  <View className='flex-1'>
                    <Text className='text-white text-base font-semibold'>{language.name}</Text>
                    <Text className='text-gray-400 text-sm'>{language.nativeName}</Text>
                  </View>
                </View>
                <View className='flex-row items-center gap-3'>
                  {selectedLanguage === language.code && (
                    <View className='bg-[#CBFD03] rounded-full p-1'>
                      <Feather name="check" size={16} color="black" />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Language Information */}
        <View className='w-full bg-stone-800 rounded-xl p-4'>
          <Text className='text-white text-lg font-semibold mb-3'>About Language Settings</Text>
          <View className='space-y-3'>
            <View className='flex-row items-start gap-3'>
              <Feather name="globe" size={16} color="#CBFD03" style={{ marginTop: 2 }} />
              <Text className='text-gray-400 text-sm flex-1'>
                Changing the language will update the app interface immediately. Some content may require a restart.
              </Text>
            </View>
            <View className='flex-row items-start gap-3'>
              <Feather name="smartphone" size={16} color="#CBFD03" style={{ marginTop: 2 }} />
              <Text className='text-gray-400 text-sm flex-1'>
                Your language preference is synced across all your devices when you're signed in.
              </Text>
            </View>
            <View className='flex-row items-start gap-3'>
              <Feather name="alert-circle" size={16} color="#CBFD03" style={{ marginTop: 2 }} />
              <Text className='text-gray-400 text-sm flex-1'>
                Some features and content may not be available in all languages. English is always available as a fallback.
              </Text>
            </View>
          </View>
        </View>

        {/* Save Button */}
        <View className='w-full mb-20'>
          <TouchableOpacity 
            className='bg-[#CBFD03] rounded-xl p-4 items-center'
            onPress={() => {
              console.log('Language saved:', selectedLanguage);
              router.back();
            }}
          >
            <Text className='text-black text-lg font-semibold'>Save Language</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
