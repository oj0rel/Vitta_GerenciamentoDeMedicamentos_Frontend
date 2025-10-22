import { CadastrarButton } from "@/src/components/hubComponents/cadastrarButton/cadastrarButton";
import { LoginButton } from "@/src/components/hubComponents/loginButton/loginButton";
import { View } from "react-native";
import LogoComponent from "../components/logoComponent";
import { styles } from "./styles";

export default function Index() {
  return (
    <View style={styles.container}>
      <LogoComponent />

      <View style={styles.pressablesContainer}>
        <CadastrarButton />
        <LoginButton />
      </View>
    </View>
  );
}
