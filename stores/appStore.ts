import AsyncStorage from "@react-native-async-storage/async-storage";

const HAS_SEEN_ONBOARDING_KEY = 'hasSeenOnboarding';

export async function setHasSeenOnboarding(value: boolean) {
    await AsyncStorage.setItem(HAS_SEEN_ONBOARDING_KEY, value ? 'true' : 'false');
}

export async function getHasSeenOnboarding(): Promise<boolean> {
    const value = await AsyncStorage.getItem(HAS_SEEN_ONBOARDING_KEY);
    return value === 'true';
}