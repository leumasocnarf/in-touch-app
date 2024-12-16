import { useSQLiteContext } from "expo-sqlite";
import { Contato } from "@/data/types";

export function useContatosRepository() {
  const db = useSQLiteContext();

  async function create(contato: Omit<Contato, "id">): Promise<void> {
    await db.runAsync(
      "INSERT OR REPLACE INTO contatos (nome, telefone, email) VALUES (?, ?, ?)",
      [contato.nome, contato.telefone, contato.email],
    );
  }

  async function findMany(): Promise<Contato[]> {
    const contatos = await db.getAllAsync<Contato>("SELECT * FROM contatos");

    return contatos.map((contato) => ({
      ...contato,
    }));
  }

  async function findSingleById(id: number): Promise<Contato | null> {
    const contato = await db.getFirstAsync<Contato>(
      "SELECT id, nome, telefone, email FROM contatos WHERE id = ?",
      [id],
    );

    if (!contato) {
      return null;
    }

    return { ...contato };
  }

  async function updateSingle(id: number, contato: Contato) {
    await db.runAsync(
      "UPDATE contatos SET nome = ?, telefone = ?, email = ? WHERE id = ?",
      [contato.nome, contato.telefone, contato.email, id],
    );
  }

  async function deleteSingle(id: number): Promise<void> {
    await db.runAsync("DELETE FROM contatos WHERE id = ?", [id]);
  }

  return { create, findMany, findSingleById, updateSingle, deleteSingle };
}
