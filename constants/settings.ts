import {
  AntDesign,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";

// Define the settings data structure
export const settingsItems = [
  {
    id: "profile",
    title: "My Profile",
    subtitle: "Manage your account details",
    icon: Feather,
    iconName: "user" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "subscription",
    title: "Subscription Plan",
    subtitle: "Premium features & billing",
    icon: FontAwesome,
    iconName: "diamond" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "notifications",
    title: "Notifications",
    subtitle: "Alert preferences & reminders",
    icon: MaterialCommunityIcons,
    iconName: "bell-outline" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "privacy",
    title: "Privacy & Security",
    subtitle: "Data protection & security",
    icon: MaterialIcons,
    iconName: "verified-user" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
];

export const preferencesItems = [
  {
    id: "theme",
    title: "Appearance",
    subtitle: "Change your theme",
    icon: Ionicons,
    iconName: "bulb-outline" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "currency",
    title: "Currency",
    subtitle: "USD - US Dollar",
    icon: Feather,
    iconName: "dollar-sign" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "language",
    title: "Language",
    subtitle: "English",
    icon: Feather,
    iconName: "globe" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
];

export const supportItems = [
  {
    id: "help",
    title: "Help & Support",
    subtitle: "Get help and contact us",
    icon: Feather,
    iconName: "help-circle" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "feedback",
    title: "Send Feedback",
    subtitle: "Share your thoughts with us",
    icon: MaterialCommunityIcons,
    iconName: "message-text-outline" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "rate",
    title: "Rate App",
    subtitle: "Rate us on App Store",
    icon: AntDesign,
    iconName: "star" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
];

export const legalItems = [
  {
    id: "terms",
    title: "Terms of Service",
    subtitle: "Read our terms and conditions",
    icon: MaterialCommunityIcons,
    iconName: "sticker-text-outline" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    subtitle: "How we handle your data",
    icon: MaterialCommunityIcons,
    iconName: "shield-account-outline" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
  {
    id: "application",
    title: "About App",
    subtitle: "Version 1.0.0",
    icon: AntDesign,
    iconName: "mobile1" as const,
    iconSize: 24,
    iconColor: "#CBFD03",
  },
];

export const settingsRouter = (settingId: string) => {
  switch (settingId) {
    case "profile":
      router.push("/settings/profile");
      break;
    case "subscription":
      router.push("/settings/subscription");
      break;
    case "notifications":
      router.push("/settings/notification-settings");
      break;
    case "privacy":
      // Handle privacy navigation
      break;
    case "currency":
      router.push("/settings/currency");
      break;
    case "language":
      router.push("/settings/language");
      break;
    case "theme":
      router.push("/settings/theme");
      break;
    case "help":
      router.push("/settings/support");
      break;
    case "feedback":
      router.push("/settings/feedback");
      break;
    case "rate":
      router.push("/settings/rate");
      break;
    case "terms":
      router.push("/settings/terms");
      break;
    case "privacy-policy":
      router.push("/settings/privacy-policy");
      break;
    case "application":
      router.push("/settings/application");
      break;
    default:
      console.log("Setting pressed:", settingId);
  }
};
