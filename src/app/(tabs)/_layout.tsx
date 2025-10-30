import { useSession } from "@/src/contexts/authContext";
import { Stack } from "expo-router";

export default function TabsRootLayout() {
  const { isLoading } = useSession();

  if(isLoading) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="home" options={{ title: "Tela Inicial" }} />
    </Stack>
  )
}