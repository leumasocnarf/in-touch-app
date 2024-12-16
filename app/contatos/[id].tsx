import { Alert, StyleSheet, View } from "react-native";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import ContatoForm from "@/components/ContatoForm";
import { useContatosRepository } from "@/data/ContatosRepository";
import { useCallback, useState } from "react";
import { Contato } from "@/data/types";

export default function ContatoDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [contato, setContato] = useState<Contato | null>(null);
  const repository = useContatosRepository();

  async function fetchContato() {
    try {
      const fetchedContato = await repository.findSingleById(Number(id));
      setContato(fetchedContato);
      console.log(fetchedContato);
    } catch (error) {
      Alert.alert("Error", "Failed to load contact details.");
      console.error(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchContato().catch((error) => console.error(error));
    }, [id])
  );


  async function submitContatoEditado(contato: Contato) {
    await repository.updateSingle(Number(id), contato).then(() => {
      Alert.alert("Atualizado", "Contato foi atualizado com sucesso!");
      console.log("Contato atualizado:", contato);
      router.back();
    });
  }

  async function deleteSelectedContato(id: number) {
    Alert.alert(
      "Deletar Contato",
      "Você tem certeza que quer deletar esse contato?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: async function() {
            await repository.deleteSingle(id).then(() => {
              router.back();
              Alert.alert("Deletado", "Contato deletado com sucesso!");
            });
          }
        }
      ]
    );

  }


  if (!contato) {
    return null;
  }

  return (
    <View style={styles.container}>
      <ContatoForm
        initialValues={contato}
        mode="editar"
        onSubmit={submitContatoEditado}
        onDelete={deleteSelectedContato}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  }
});
