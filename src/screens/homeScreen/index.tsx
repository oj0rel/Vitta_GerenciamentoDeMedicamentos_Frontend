import { listarAgendamentos } from "@/src/api/agendamentoApi";
import { ActionButton } from "@/src/components/actionButton/actionButton";
import { AuthContext, useSession } from "@/src/contexts/authContext";
import { AgendamentoResponse } from "@/src/types/agendamentoTypes";
import { useContext, useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function HomeScreen() {
  
  const { signOut, session } = useSession();
  const [agendamentos, setAgendamentos] = useState<AgendamentoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { usuario } = useContext(AuthContext);
  const usuarioId = usuario?.id;

  useEffect(() => {
    const carregarAgendamentos = async () => {
      
      if (session) {
        try {
          setError(null);

          const data = await listarAgendamentos(session);
          
          setAgendamentos(data);
        } catch (error) {
          setError("Falha ao carregar agendamentos.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else if (!session) {
        setLoading(false);
        setError("Usuário não autenticado.");
      }
    };

    carregarAgendamentos();
    
  }, [session]);


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      
      <Text style={{ marginTop: 40, color: 'gray' }}>
        Token: {session}
      </Text>

      <FlatList
        data={agendamentos}
        keyExtractor={ (item) => item.id.toString() }
        renderItem={({ item }) => (
          <View>
            <Text>Medicamento do agendamento: {item.tratamento.medicamento.nome}</Text>
          </View>
        )}
      />
      
      <ActionButton
        titulo="SAIR (LOGOUT)"
        onPress={() => {
          signOut();
        }}
      />

    </View>
  );
}