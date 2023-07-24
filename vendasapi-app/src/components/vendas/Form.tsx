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
import { InputText } from "primereact/inputtext";

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

  const [codigoProduto, setCodigoProduto] = useState<string>("");
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

  const handleCodigoProdutoChange = (e: any) => {
    console.log(codigoProduto);
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

        <div className="formgrid grid">
          <div className="field col-12 md:col-2">
            <span className="p-float-label">
              <InputText
                id="codigoProduto"
                onChange={(e) => setCodigoProduto(e.target.value)}
                value={codigoProduto}
                onBlur={handleCodigoProdutoChange}
              />
              <label htmlFor="codigoProduto">Código</label>
            </span>
          </div>

          <div className="field col-12 md:col-6">
            <AutoComplete />
          </div>

          <div className="field col-12 md:col-2">
            <span className="p-float-label">
              <InputText id="qtdProduto" />
              <label htmlFor="qtdProduto">QTD</label>
            </span>
          </div>

          <div className="field col-12 md:col-2">
            <Button label="Adicionar" />
          </div>
        </div>

        <br />

        <Button type="submit" label="Finalizar" />
      </div>
    </form>
  );
};
