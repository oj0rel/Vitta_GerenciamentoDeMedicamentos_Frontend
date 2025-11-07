import { listarMedicamentos, medicamentoDeletar } from "@/src/api/medicamentoApi";
import { ActionButton } from "@/src/components/actionButton/actionButton";
import { AlertModal } from "@/src/components/alertModal";
import { DeletePressable } from "@/src/components/deletePressable";
import FormularioCadastroMedicamento from "@/src/components/formMedicamento";
import { useSession } from "@/src/contexts/authContext";
import { MedicamentoResponse } from "@/src/types/medicamentoTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  Pressable,
  Text,
  View
} from "react-native";
import { styles } from "./styles";

export default function MedicamentoScreen() {
  const { session } = useSession();
  const [medicamentos, setMedicamentos] = useState<MedicamentoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [modalVisivel, setModalVisivel] = useState(false);

  const [alertVisivel, setAlertVisivel] = useState(false);
  const [itemParaDeletar, setItemParaDeletar] = useState<number | null>(null);

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
    console.log("FUNÇÃO handleDeletarMedicamento FOI CHAMADA");
    if (isDeleting) {
      console.log("Retornando porque isDeleting é true");
      return;
    }

    setItemParaDeletar(medicamentoId);
    setAlertVisivel(true);
  }

  const onConfirmarDelete = () => {
    // Se não tiver um item selecionado, não faz nada
    if (itemParaDeletar === null) {
      setAlertVisivel(false);
      return;
    }

    // Chama sua função de deletar que já funciona
    executarDelete(itemParaDeletar);

    // Limpa o estado
    setAlertVisivel(false);
    setItemParaDeletar(null);
  };

  // CRIE A FUNÇÃO para o botão "Cancelar" do AlertModal
  const onCancelarDelete = () => {
    setAlertVisivel(false);
    setItemParaDeletar(null);
  };

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
        style={{ width: 320 }}
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
                <Pressable
                  style={styles.pressableButton}
                  disabled={isDeleting}
                >
                  <MaterialCommunityIcons name="pencil" size={24} color="black" />
                </Pressable>

                <DeletePressable
                  onPress={() => handleDeletarMedicamento(item.id)}
                  disabled={isDeleting}
                />
          
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

      <AlertModal
        visible={alertVisivel}
        title="CONFIRMAR EXCLUSÃO"
        message="Tem certeza que deseja excluir este medicamento ?"
        onClose={onCancelarDelete}
        onConfirm={onConfirmarDelete}
        confirmText="Excluir"
        isDestructive={true}
      />
    </View>
  );
}
