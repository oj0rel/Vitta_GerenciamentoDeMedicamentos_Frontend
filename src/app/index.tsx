import { ActionButton } from "@/src/components/actionButton/actionButton";
import { router } from "expo-router";
import { View } from "react-native";
import LogoComponent from "../components/logoComponent";
import { styles } from "./styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <LogoComponent />

      <View style={styles.pressablesContainer}>
        
        <ActionButton
          titulo="CADASTRAR"
          onPress={ () => router.push('/cadastro') }
        />

        <ActionButton
          titulo="LOGIN"
          onPress={ () => router.push('/') }
        />

      </View>
    </View>
  );
}
