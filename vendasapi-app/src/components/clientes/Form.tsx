import { Cliente } from "@/models/cliente";
import { useFormik } from "formik";
import React from "react";
import Input from "../common/Input";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  id: "",
  nome: "",
  cpf: "",
  dataNascimento: "",
  endereco: "",
  email: "",
  telefone: "",
  cadastro: "",
};

export const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
}) => {
  const formik = useFormik<Cliente>({
    initialValues: { ...formScheme, ...cliente },
    onSubmit,
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            id="id"
            label="Código: "
            disabled={true}
            columnClasses="is-half"
            value={formik.values.id}
          />
          <Input
            id="cadastro"
            label="Data de Cadastro: *"
            columnClasses="is-half"
            disabled={true}
            value={formik.values.cadastro}
          />
        </div>
      )}

      <div className="columns">
        <Input
          id="nome"
          label="Nome: *"
          columnClasses="is-full"
          onChange={formik.handleChange}
          value={formik.values.nome}
        />
      </div>
      <div className="columns">
        <Input
          id="cpf"
          label="CPF: *"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.cpf}
        />
        <Input
          id="dataNascimento"
          label="Data de Nascimento: *"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.dataNascimento}
        />
      </div>
      <div className="columns">
        <Input
          id="endereco"
          label="Endereço: *"
          columnClasses="is-full"
          onChange={formik.handleChange}
          value={formik.values.endereco}
        />
      </div>
      <div className="columns">
        <Input
          id="email"
          label="Email: *"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <Input
          id="telefone"
          label="Telefone: *"
          columnClasses="is-half"
          onChange={formik.handleChange}
          value={formik.values.telefone}
        />
      </div>
      <div className="field is-grouped">
        <div className="control is-link">
          <button type="submit" className="button is-success">
            {formik.values.id ? "Atualizar" : "Salvar"}
          </button>
        </div>
      </div>
    </form>
  );
};
