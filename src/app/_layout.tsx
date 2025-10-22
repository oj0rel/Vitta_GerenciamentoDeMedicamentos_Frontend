import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: "Tela Inicial" }}/>
            <Stack.Screen name="cadastro" options={{ title: "Cadastro de Usuário" }}/>
        </Stack>
    )
}