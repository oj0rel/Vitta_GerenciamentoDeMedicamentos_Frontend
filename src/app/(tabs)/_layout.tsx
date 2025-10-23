import { Stack } from "expo-router";

export default function TabsRootLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: "Tela Inicial" }} />
    </Stack>
  )
}