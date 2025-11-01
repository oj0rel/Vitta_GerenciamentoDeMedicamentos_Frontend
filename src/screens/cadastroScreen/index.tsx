import { ActionButton } from "@/src/components/actionButton/actionButton";
import { FormInput } from "@/src/components/formInput";
import LogoComponent from "@/src/components/logoComponent";
import { useSession } from "@/src/contexts/authContext";
import { router } from "expo-router";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Wave from "react-native-waves";
import { styles } from "./styles";

export default function CadastroScreen() {
  const { signUp, signIn } = useSession();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validateForm = () => {
    if (!nome.trim()) {
      return "O campo Nome é obrigatório.";
    }
    if (telefone.trim().length < 10) {
      return "O número de telefone parece inválido.";
    }
    if (!email.trim()) {
      return "O campo Email é obrigatório.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Por favor, insira um email válido.';
    }
    if (!senha) {
      return "O campo Senha é obrigatório.";
    }
    if (senha.length < 6) {
      return "A senha deve ter pelo menos 6 caracteres.";
    }

    return null;
  }
  
  const handleCadastro = async () => {

    setErrorMessage(null);

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      await signUp({
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha,
      });

      await signIn({
        email: email,
        senha: senha,
      });

      router.replace('/home');
    } catch (error) {
      console.error(error);
      setErrorMessage("Não foi possível realizar o cadastro. Verifique os dados e tente novamente.");
    }
  };

  const handleNomeChange = (text: string) => {
    setNome(text);
    if (errorMessage) setErrorMessage(null);
  };

  const handleTelefoneChange = (text: string) => {
    setTelefone(text);
    if (errorMessage) setErrorMessage(null);
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errorMessage) setErrorMessage(null);
  };

  const handleSenhaChange = (text: string) => {
    setSenha(text);
    if (errorMessage) setErrorMessage(null);
  };

  return (
    <ScrollView
      style={{ flex: 1, marginTop: 30, }}
      contentContainerStyle={styles.container}
      >

      <View style={styles.screenContent}>
        <LogoComponent />

        <View style={styles.formBox}>
          <View style={styles.formBody}>

            {errorMessage && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {errorMessage}
                </Text>
              </View>
            )}

            <FormInput
              titulo="Nome"
              value={nome}
              onChangeText={handleNomeChange}
              placeHolder="Digite seu nome"
              autoCapitalize="words"
            />

            <FormInput
              titulo="Telefone"
              value={telefone}
              onChangeText={handleTelefoneChange}
              placeHolder="Digite seu número de telefone"
              keyboardType="phone-pad"
            />

            <FormInput
              titulo="Email"
              value={email}
              onChangeText={handleEmailChange}
              placeHolder="Digite seu email: ..@gmail.com"
              keyboardType="email-address"
              autoCapitalize="none"
            />
                
            <FormInput
              titulo="Senha"
              value={senha}
              onChangeText={handleSenhaChange}
              placeHolder="Digite uma senha"
              secureTextEntry
            />

          </View>
        </View>

        <ActionButton
            titulo="CADASTRAR"
            onPress={ handleCadastro }
        />

      </View>

      <Wave
        placement="bottom"
        gap={90}
        speed={4}
        maxPoints={5}
        delta={36}
        color="#1CBDCF" />
    </ScrollView>
  );
}
