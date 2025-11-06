import { listarMedicamentos } from "@/src/api/medicamentoApi";
import { useSession } from "@/src/contexts/authContext";
import { MedicamentoResponse } from "@/src/types/medicamentoTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { styles } from "./styles";

export default function MedicamentoScreen() {
  const { session } = useSession();
  const [medicamentos, setMedicamentos] = useState<MedicamentoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (session) {
      const carregarMedicamentosCadastrados = async () => {
        setLoading(true);
        setError(null);

        try {
          const data = await listarMedicamentos(session);
          setMedicamentos(data);
        } catch (error) {
          setError("Falha ao carregar medicamentos.");
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      carregarMedicamentosCadastrados();
    } else {
      setMedicamentos([]);
      setError(null);
    }
  }, [session]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Tela dos Medicamentos</Text>

      <FlatList
        style={styles.flatList}
        data={medicamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardsContainer}>
            <View style={styles.cardContent}>
              <View style={styles.cardTopRow}>
                <View>
                  <MaterialCommunityIcons name="pill" size={36} color="white" />
                </View>

                <View>
                  <Text style={[styles.textContent, { fontSize: 16 }]}>
                    Medicamento: {item.nome}
                  </Text>

                  <Text style={[styles.textContent, { fontSize: 16 }]}>
                    Laboratório: {item.laboratorio}
                  </Text>

                  <Text style={[styles.textContent, { fontSize: 16 }]}>
                    Tipo: {item.tipoUnidadeDeMedida}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBottomRow}>
                <Pressable style={styles.pressableButton}>
                  <MaterialCommunityIcons name="pencil" size={24} color="black" />
                </Pressable>

                <Pressable style={styles.pressableButton}>
                  <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                </Pressable>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.container}>
            <Text>Nenhum medicamento cadastrado.</Text>
          </View>
        }
      />
    </View>
  );
}
