import { listarTratamentos } from "@/src/api/tratamentoApi";
import { ActionButton } from "@/src/components/actionButton/actionButton";
import FormularioTratamento from "@/src/components/formTratamento";
import { useSession } from "@/src/contexts/authContext";
import { TratamentoResponse } from "@/src/types/tratamentoTypes";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useCallback, useEffect, useState } from "react";
import { Modal, Text, View } from "react-native";
import { styles } from "./styles";

export default function TratamentoScreen() {
  const { session } = useSession();
  const [medicamentos, setMedicamentos] = useState<TratamentoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  const [itemEmEdicao, setItemEmEdicao] = useState<TratamentoResponse | null>(
    null
  );

  const carregarTratamentosCadastrados = useCallback(async () => {
    if (!session) return;

    setLoading(true);
    setError(null);

    try {
      const data = await listarTratamentos(session);
      setMedicamentos(data);
    } catch (error) {
      setError("Falha ao carregar tratamentos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    carregarTratamentosCadastrados();
  }, [carregarTratamentosCadastrados]);

  const abrirModalCadastro = () => {
    setItemEmEdicao(null);
    setModalVisivel(true);
  };

  const abrirModalEdicao = (medicamento: TratamentoResponse) => {
    setItemEmEdicao(medicamento);
    setModalVisivel(true);
  };

  return (
    <View>
      <Text>TELA DE TRATAMENTOS</Text>

      <ActionButton
        style={{ width: 320 }}
        titulo="ADICIONAR TRATAMENTO"
        onPress={abrirModalCadastro}
        icon={
          <MaterialCommunityIcons name="plus-circle" size={36} color="white" />
        }
      />

      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalContainer}>
          {modalVisivel && (
            <FormularioTratamento
              onClose={() => setModalVisivel(false)}
              onSaveSuccess={carregarTratamentosCadastrados}
              tratamentoParaEditar={itemEmEdicao}
            />
          )}
        </View>
      </Modal>
    </View>
  );
}
