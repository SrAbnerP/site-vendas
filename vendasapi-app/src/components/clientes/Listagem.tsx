"use client";
import React, { useState } from "react";

import { Column } from "primereact/column";
import { DataTable, DataTablePageEvent } from "primereact/datatable";

import { useFormik } from "formik";
import { Input, InputCpf } from "../common/Input";
import Layout from "../layout/Layout";
import { Cliente } from "@/models/cliente";
import { Page } from "@/models/Pagina";
import { useClienteService } from "@/services/clienteService";

interface ListagemClientesProps {
  nome?: string;
  cpf?: string;
}

export default function ListagemClientes(props: ListagemClientesProps) {
  const clienteService = useClienteService();

  const [loading, setLoading] = useState<boolean>(false);

  const [clientes, setClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 10,
    totalElements: 0,
  });

  const handleSubmit = (filtro: ListagemClientesProps) => {
    handlePage(null);
  };

  const formik = useFormik<ListagemClientesProps>({
    onSubmit: handleSubmit,
    initialValues: { nome: "", cpf: "" },
  });

  const handlePage = (event: DataTablePageEvent) => {
    setLoading(true);
    clienteService
      .find(formik.values.nome, formik.values.cpf, event?.page, event?.rows)
      .then((result) => {
        setClientes({ ...result, first: event?.first });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Layout titulo="Clientes">
      <form onSubmit={formik.handleSubmit}>
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
      <div className="columns">
        <div className="is-full">
          <DataTable
            value={clientes.content}
            totalRecords={clientes.totalElements}
            lazy
            paginator
            first={clientes.first}
            rows={clientes.size}
            onPage={handlePage}
            loading={loading}
            emptyMessage="Nenhum registro."
          >
            <Column field="id" header="Código" />
            <Column field="nome" header="Nome" />
            <Column field="cpf" header="CPF" />
            <Column field="email" header="E-mail" />
          </DataTable>
        </div>
      </div>
    </Layout>
  );
}
