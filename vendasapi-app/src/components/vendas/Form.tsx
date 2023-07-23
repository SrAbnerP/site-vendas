import React, { useState } from "react";

import { useFormik } from "formik";
import { Venda } from "@/models/venda";

import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";
import { Page } from "@/models/pagina";
import { Cliente } from "@/models/cliente";
import { useClienteService } from "@/services/clienteService";
import { Button } from "primereact/button";

interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
}

const formScheme: Venda = {
  cliente: null,
  produtos: [],
  total: 0,
  formaPagamento: "",
};

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
  const clienteService = useClienteService();

  const [listaClientes, setListaClientes] = useState<Page<Cliente>>({
    content: [],
    first: 0,
    number: 0,
    size: 0,
    totalElements: 0,
  });

  // Configurando o formik
  const formik = useFormik<Venda>({
    onSubmit,
    initialValues: formScheme,
  });

  const handleClienteAutoComplete = (e: AutoCompleteCompleteEvent) => {
    const nome = e.query;
    clienteService
      .find(nome, "", 0, 20)
      .then((clientes) => setListaClientes(clientes));
  };

  const handleClienteChange = (e: AutoCompleteChangeEvent) => {
    const cliente: Cliente = e.value;
    formik.setFieldValue("cliente", cliente);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-fluid">
        <div className="p-field">
          <label htmlFor="cliente">Cliente: *</label>
          <AutoComplete
            id="cliente"
            name="cliente"
            field="nome"
            completeMethod={handleClienteAutoComplete}
            value={formik.values.cliente}
            suggestions={listaClientes.content}
            onChange={handleClienteChange}
          />
        </div>
        <br />
        <Button type="submit" label="Finalizar" />
      </div>
    </form>
  );
};
