import React, { useState } from "react";

import { useFormik } from "formik";
import { ItemVenda, Venda } from "@/models/venda";

import {
  AutoComplete,
  AutoCompleteChangeEvent,
  AutoCompleteCompleteEvent,
} from "primereact/autocomplete";

import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

import { useClienteService } from "@/services/clienteService";
import { useProdutoService } from "@/services/produtoService";

import { Produto } from "@/models/produto";
import { Page } from "@/models/pagina";
import { Cliente } from "@/models/cliente";

interface VendasFormProps {
  onSubmit: (venda: Venda) => void;
}

const formScheme: Venda = {
  cliente: null,
  itens: [],
  total: 0,
  formaPagamento: "",
};

export const VendasForm: React.FC<VendasFormProps> = ({ onSubmit }) => {
  const clienteService = useClienteService();
  const produtoService = useProdutoService();

  const [mensagem, setMensagem] = useState<string>("");
  const [quantidadeProduto, setQuantidadeProduto] = useState<number>(0);
  const [listaProdutos, setListaProdutos] = useState<Produto[]>([]);
  const [listaProdutosFilter, setListaProdutosFilter] = useState<Produto[]>([]);
  const [codigoProduto, setCodigoProduto] = useState<string>("");
  const [produto, setProduto] = useState<Produto>({});
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
    if (codigoProduto) {
      produtoService
        .carregarProduto(codigoProduto)
        .then((produto) => setProduto(produto))
        .catch((error) => setMensagem("Produto não encontrado!"));
    }
  };

  const handleAddProduto = () => {
    const itensAdd = formik.values.itens;

    const existsItem = itensAdd?.some((iv: ItemVenda) => {
      return iv.produto.id === produto.id;
    });

    if (existsItem) {
      itensAdd?.forEach((iv: ItemVenda) => {
        if (iv.produto.id === produto.id) {
          iv.quantidade = iv.quantidade + quantidadeProduto;
        }
      });
    } else {
      itensAdd?.push({
        produto: produto,
        quantidade: quantidadeProduto,
      });
    }

    setProduto({});
    setCodigoProduto("");
    setQuantidadeProduto(0);
  };

  const handleFecharDialog = () => {
    setMensagem("");
    setCodigoProduto("");
    setProduto({});
  };

  const handleProdutoAutoComplete = async (e: AutoCompleteCompleteEvent) => {
    if (!listaProdutos.length) {
      const produtosEncontrados = await produtoService.listar();
      setListaProdutos(produtosEncontrados);
    }

    const produtosEncontrados = listaProdutos.filter((produto: Produto) =>
      produto.nome?.toUpperCase().includes(e.query.toUpperCase())
    );

    setListaProdutosFilter(produtosEncontrados);
  };

  const dialogMensagemFooter = () => {
    return (
      <div>
        <Button label="Ok" onClick={handleFecharDialog} />
      </div>
    );
  };

  const disabledAddProdutoButton = () => {
    return !produto || !quantidadeProduto;
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
            <AutoComplete
              id="produto"
              name="produto"
              field="nome"
              completeMethod={handleProdutoAutoComplete}
              onChange={(e) => setProduto(e.target.value)}
              suggestions={listaProdutosFilter}
              value={produto.nome}
            />
          </div>

          <div className="field col-12 md:col-2">
            <span className="p-float-label">
              <InputText
                id="qtdProduto"
                value={quantidadeProduto.toString()}
                onChange={(e) => setQuantidadeProduto(parseInt(e.target.value))}
              />
              <label htmlFor="qtdProduto">QTD</label>
            </span>
          </div>

          <div className="field col-12 md:col-2">
            <Button
              type="button"
              disabled={disabledAddProdutoButton()}
              label="Adicionar"
              onClick={handleAddProduto}
            />
          </div>

          <div className="col-12">
            <DataTable value={formik.values.itens}>
              <Column field="produto.id" header="Código" />
              <Column field="produto.sku" header="SKU" />
              <Column field="produto.nome" header="Produto" />
              <Column field="produto.preco" header="Valor Unitário" />
              <Column field="quantidade" header="QTD" />
              <Column
                body={(iv: ItemVenda) =>
                  iv.produto.preco ? iv.produto.preco * iv.quantidade : ""
                }
                header="Total"
              />
            </DataTable>
          </div>
        </div>

        <br />

        <Button type="submit" label="Finalizar" />
      </div>
      <Dialog
        header="Atenção!"
        position="top"
        visible={!!mensagem}
        onHide={handleFecharDialog}
        footer={dialogMensagemFooter}
      >
        {mensagem}
      </Dialog>
    </form>
  );
};
