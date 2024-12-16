import { View, StyleSheet, Alert } from "react-native";
import ContatoForm from "@/components/ContatoForm";
import { useContatosRepository } from "@/data/ContatosRepository";
import { router } from "expo-router";
import { Contato } from "@/data/types";

export default function NovoContatoScreen() {
  const repository = useContatosRepository(); // create a single instance of the repository

  async function submitNovoContato(novoContato: Contato) {
    await repository
      .create(novoContato)
      .then(() => {
        Alert.alert("Salvo", "Contato foi criado com sucesso!");
        router.push("/");
        console.log("Contato criado:", novoContato);
      })
      .catch((error) => {
        Alert.alert("Error", "Não foi possível salvar o contato.");
        console.error(error);
      });
  }

  return (
    <View style={styles.container}>
      <ContatoForm mode="adicionar" onSubmit={submitNovoContato} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});