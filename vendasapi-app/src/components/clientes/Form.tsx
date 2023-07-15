import { Cliente } from "@/models/cliente";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { Input, InputCpf, InputDate, InputTelefone } from "../common/Input";

import * as Yup from "yup";
import { mensagemErro } from "../common/Toastr";
import { validationScheme } from "./validationSchema";

interface ClienteFormProps {
  cliente: Cliente;
  onSubmit: (cliente: Cliente) => void;
}

const formScheme: Cliente = {
  id: "",
  nome: "",
  cpf: "",
  nascimento: "",
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
    enableReinitialize: true,
    validationSchema: validationScheme,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {formik.values.id && (
        <div className="columns">
          <Input
            id="id"
            name="id"
            label="Código: "
            disabled={true}
            columnClasses="is-half"
            autoComplete="off"
            value={formik.values.id}
          />
          <Input
            id="cadastro"
            name="cadastro"
            label="Data de Cadastro: *"
            columnClasses="is-half"
            autoComplete="off"
            disabled={true}
            value={formik.values.cadastro}
          />
        </div>
      )}

      <div className="columns">
        {formik.errors.nome && <div>{formik.errors.nome}</div>}
        <Input
          id="nome"
          name="nome"
          label="Nome: *"
          columnClasses="is-full"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.nome}
        />
      </div>
      <div className="columns">
        {formik.errors.cpf && <div>{formik.errors.cpf}</div>}
        <InputCpf
          id="cpf"
          name="cpf"
          label="CPF: *"
          columnClasses="is-half"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.cpf}
        />

        {formik.errors.nascimento && <div>{formik.errors.nascimento}</div>}
        <InputDate
          id="nascimento"
          name="nascimento"
          label="Data de Nascimento: *"
          columnClasses="is-half"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.nascimento}
        />
      </div>
      <div className="columns">
        {formik.errors.endereco && <div>{formik.errors.endereco}</div>}
        <Input
          id="endereco"
          name="endereco"
          label="Endereço: *"
          columnClasses="is-full"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.endereco}
        />
      </div>
      <div className="columns">
        {formik.errors.email && <div>{formik.errors.email}</div>}
        <Input
          id="email"
          name="email"
          label="Email: *"
          columnClasses="is-half"
          autoComplete="off"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {formik.errors.telefone && <div>{formik.errors.telefone}</div>}
        <InputTelefone
          id="telefone"
          name="telefone"
          label="Telefone: *"
          columnClasses="is-half"
          autoComplete="off"
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
