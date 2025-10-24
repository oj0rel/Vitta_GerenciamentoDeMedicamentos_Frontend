import { router, Stack, useSegments } from "expo-router";
import React from "react";
import { ActivityIndicator } from "react-native";
import { SessionProvider, useSession } from "../contexts/ctx";

function RootLayoutNav() {
  const { session, isLoading } = useSession();
  const segments = useSegments();

  React.useEffect(() => {
    if (isLoading) {
      return;
    }

    const inAuthGroup = segments[0] === "(auth)";

    const isPublicIndex = (segments.length as number) === 0 || (segments[0] as string) === "index";

    const isProtectedRoute = !inAuthGroup && !isPublicIndex;

    if (!session && isProtectedRoute) {
      router.replace("/");
    } else if (session && (inAuthGroup || isPublicIndex)) {
      router.replace("/(tabs)/home");
    }
  }, [session, isLoading, segments]);

  if (isLoading) {
    return <ActivityIndicator style={{ flex: 1 }} size={"large"} />;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Tela Inicial" }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SessionProvider>
      <RootLayoutNav />
    </SessionProvider>
  );
}
