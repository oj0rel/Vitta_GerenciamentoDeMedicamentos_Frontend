import { listarMedicamentos, medicamentoDeletar } from "@/src/api/medicamentoApi";
import { ActionButton } from "@/src/components/actionButton/actionButton";
import FormularioCadastroMedicamento from "@/src/components/formMedicamento";
import { useSession } from "@/src/contexts/authContext";
import { MedicamentoResponse } from "@/src/types/medicamentoTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Modal,
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

  const [modalVisivel, setModalVisivel] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const carregarMedicamentosCadastrados = useCallback(async () => {
    if (!session) return;

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
  }, [session]);
    
  useEffect(() => {
    carregarMedicamentosCadastrados();
  }, [carregarMedicamentosCadastrados]);

  const executarDelete = async (medicamentoId: number) => {
    if (!session) {
      setError("Sessão expirada. Faça login novamente.");
      return;
    }

    setIsDeleting(true);
    setError(null);

    try {
      await medicamentoDeletar(session, medicamentoId);

      setMedicamentos((medicamentosAnteriores) =>
        medicamentosAnteriores.filter((med) => med.id !== medicamentoId)
      );

    } catch (error) {
      console.error("Erro ao deletar medicamento: ", error);
      setError("Falha ao deletar o medicamento. Tente novamente.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeletarMedicamento = (medicamentoId: number) => {
    if (isDeleting) {
      return;
    }

    Alert.alert(
      "CONFIRMAR EXCLUSÃO",
      "Tem certeza que deseja excluir este medicamento ?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: () => executarDelete(medicamentoId),
          style: "destructive",
        },
      ]
    )
  }

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

      <ActionButton
        titulo="ADICIONAR MEDICAMENTO"
        onPress={() => setModalVisivel(true)}
        icon={<MaterialCommunityIcons name="plus-circle" size={36} color="white" />}
      />

      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          <FormularioCadastroMedicamento
            onClose={() => setModalVisivel(false)}
            onSaveSuccess={carregarMedicamentosCadastrados}
          />
        </View>

      </Modal>

      <FlatList
        style={styles.flatList}
        contentContainerStyle={{ alignItems: "center" }}
        data={medicamentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // <View style={styles.cardsContainer}>
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
                <Pressable
                  style={styles.pressableButton}
                  disabled={isDeleting}
                >
                  <MaterialCommunityIcons name="pencil" size={24} color="black" />
                </Pressable>

                <Pressable
                  style={styles.pressableButton}
                  // onPress={() => handleDeletarMedicamento(item.id)}
                  onPress={() => Alert.alert("TESTE LIXEIRA")}
                  disabled={isDeleting}
                >
                  <MaterialCommunityIcons name="trash-can" size={24} color="black" />
                </Pressable>
              </View>
            </View>
          // </View>
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
