import { ActionButton } from "@/src/components/actionButton/actionButton";
import { useSession } from "@/src/contexts/ctx";
import { Text, View } from "react-native";

export default function HomeScreen() {
  
  const { signOut, session } = useSession();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>
        Você está logado!
      </Text>
      
      <ActionButton
        titulo="SAIR (LOGOUT)"
        onPress={() => {
          signOut();
        }}
      />

      <Text style={{ marginTop: 40, color: 'gray' }}>
        Token: {session}
      </Text>
    </View>
  );
}