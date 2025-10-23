import { Stack } from "expo-router";

export default function AuthRootLayout() {
  return (
    <Stack>
      <Stack.Screen name="cadastro" options={{ title: "Cadastro de Usuário" }} />
      <Stack.Screen name="login" options={{ title: "Login de Usuário" }} />
    </Stack>
  )
}