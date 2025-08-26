import { Redirect } from "expo-router";

export default async function Index() {
    // If no user, redirect to onboarding
    return <Redirect href="/(onboarding)/welcome" />;
}