import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useContatosRepository } from "@/data/ContatosRepository";
import { useCallback, useState } from "react";
import { Contato } from "@/data/types";

export default function Index() {
  const [contatos, setContatos] = useState<Contato[]>([]);
  const repository = useContatosRepository(); // create a single instance of the repository

  async function fetchContatos() {
    const fetchedContatos = await repository.findMany();
    setContatos(fetchedContatos);
    console.log(fetchedContatos);
  }

  useFocusEffect(
    useCallback(() => {
      fetchContatos().catch((error) => console.error(error));
    }, []),
  );


  function renderItem({ item }: { item: Contato }) {
    return (
      <View style={styles.contactItem}>
        <TouchableOpacity
          onPress={function () {
            router.push({
              pathname: "/contatos/[id]",
              params: item,
            });
          }}>
          <Text style={styles.nome}>{item.nome}</Text>
          <Text style={styles.telefone}>{item.telefone}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </TouchableOpacity>
      </View>
    );
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <FlatList data={contatos} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#000",
  },
  contactItem: {
    padding: 15,
    borderBottomWidth: 10,
    borderBottomColor: "#ccc",
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
  },
  telefone: {
    fontSize: 16,
    color: "#555",
  },
  email: {
    fontSize: 14,
    color: "#888",
  },
});
