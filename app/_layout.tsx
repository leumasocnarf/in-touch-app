import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Platform } from "react-native";
import { createSQLiteDB } from "@/data/createSQLiteDB";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName={"some.db"} onInit={createSQLiteDB}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            title: "Lista",
            headerShown: false,
            headerTransparent: Platform.OS === "ios",
            headerBlurEffect: "light"
          }}
        />
      </Stack>
    </SQLiteProvider>
  );
}