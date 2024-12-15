import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: "Contatos" }} />
      <Tabs.Screen name="novo-contato" options={{ title: "Novo contato" }} />
    </Tabs>
  );
}