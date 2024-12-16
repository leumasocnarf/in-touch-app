import { SQLiteDatabase } from "expo-sqlite";

export async function createSQLiteDB(database: SQLiteDatabase) {
  try {
    await database.execAsync(
      `CREATE TABLE IF NOT EXISTS contatos
       (
           id INTEGER PRIMARY KEY AUTOINCREMENT,
           nome TEXT NOT NULL,
           telefone TEXT NOT NULL,
           email TEXT NOT NULL
       );`,
    );
  } catch (error) {
    console.log(error);
  }
}