import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contato } from "@/data/types";

const contatoSchema = z.object({
  nome: z.string().min(2, "Insira um nome válido."),
  telefone: z.string().regex(/^\d{10}$/, "O telefone deve ter 10 dígitos."),
  email: z.string().email("Insira um e-mail válido.")
});

type ContatoFormProps = {
  mode?: "adicionar" | "editar";
  initialValues?: Contato;
  onSubmit: (data: Contato) => void;
  onDelete?: (id: number) => void;
};

export default function ContatoForm({
                                      mode = "adicionar",
                                      initialValues = { id: 0, nome: "", telefone: "", email: "" },
                                      onSubmit,
                                      onDelete
                                    }: ContatoFormProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Contato>({
    resolver: zodResolver(contatoSchema),
    defaultValues: initialValues
  });

  function submitAction(submittedData: Contato) {
    if (!submittedData) {
      console.error(
        "Error",
        "Não foi possível submeter os dados do formulário."
      );
      return;
    }

    if (!onSubmit) {
      console.error("Error", "onSubmit handler não foi encontrado.");
      return;
    }

    onSubmit(submittedData);
    reset((initialValues = { id: 0, nome: "", telefone: "", email: "" }));
  }

  function deleteAction() {
    if (!initialValues?.id) {
      console.error("Error", "Contato Id não foi encontrado.");
      return;
    }

    if (!onDelete) {
      console.error("Error", "onDelete handler foi não encontrado.");
      return;
    }

    onDelete(initialValues.id!);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {mode === "editar" ? "Editar Contato" : "Adicionar Contato"}
      </Text>

      <Text style={styles.label}>Name</Text>
      <Controller
        control={control}
        name="nome"
        rules={{
          required: "Nome é obrigatório"
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[errors.nome && styles.errorInput]}
            placeholder="Adicionar nome"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.nome && (
        <Text style={styles.errorText}>{errors.nome.message}</Text>
      )}

      <Text style={styles.label}>Phone</Text>
      <Controller
        control={control}
        name="telefone"
        rules={{
          required: "Telefone é obrigatório"
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[errors.telefone && styles.errorInput]}
            placeholder="Número de telefone"
            keyboardType="phone-pad"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.telefone && (
        <Text style={styles.errorText}>{errors.telefone.message}</Text>
      )}

      <Text style={styles.label}>Email</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email é obrigatório"
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[errors.email && styles.errorInput]}
            placeholder="Adicionar email"
            keyboardType="email-address"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Button
        title={mode === "editar" ? "Atualizar Contato" : "Criar Contato"}
        onPress={handleSubmit(submitAction)}
      />
      {mode === "editar" && (
        <Button title="Deletar Contato" onPress={deleteAction}></Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 12,
    borderRadius: 4
  },
  errorInput: {
    borderColor: "red"
  },
  errorText: {
    color: "red",
    marginBottom: 12
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold"
  }
});
