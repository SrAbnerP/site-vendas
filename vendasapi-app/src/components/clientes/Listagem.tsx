"use client";
import React from "react";

import { useFormik } from "formik";
import { Input, InputCpf } from "../common/Input";
import Layout from "../layout/Layout";

interface ListagemClientesProps {
  nome?: string;
  cpf?: string;
}

export default function ListagemClientes(props: ListagemClientesProps) {
  const handleSubmit = (filtro: ListagemClientesProps) => {
    console.log(filtro);
  };

  const formik = useFormik<ListagemClientesProps>({
    onSubmit: handleSubmit,
    initialValues: { nome: "", cpf: "" },
  });

  return (
    <Layout titulo="Clientes">
      <form>
        <div className="columns">
          <Input
            label="Nome"
            id="nome"
            columnClasses="is-half"
            name="nome"
            autoComplete="off"
            value={formik.values.nome}
            onChange={formik.handleChange}
          />
          <InputCpf
            label="CPF"
            id="cpf"
            columnClasses="is-half"
            name="cpf"
            value={formik.values.cpf}
            onChange={formik.handleChange}
          />
        </div>
        <div className="field is-grouped">
          <div className="control is-link">
            <button type="submit" className="button is-success">
              Consultar
            </button>
          </div>
        </div>
      </form>
    </Layout>
  );
}
