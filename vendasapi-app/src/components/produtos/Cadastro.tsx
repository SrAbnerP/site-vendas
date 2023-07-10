"use client";
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Input from "../common/Input";
import { useProdutoService } from "@/services/produtoService";
import { Produto } from "@/models/produto";
import { converterBigDecimal, formatReal } from "@/util/Money";
import { mensagemErro, mensagemSucesso } from "../common/Toastr";
import { useSearchParams } from "next/navigation";

import * as yup from "yup";

import "toastr/build/toastr.css";
import Link from "next/link";

const validarSchema = yup.object().shape({
  descricao: yup.string().trim().required("Descricao Inválida!"),
  nome: yup.string().trim().required("Nome Inválido!"),
  preco: yup
    .number()
    .required("Preço Inválido!")
    .moreThan(0, "O Preço deve ser maior que zero!"),
  sku: yup.string().trim().required("SKU Inválido!"),
});

export default function CadastroProdutos() {
  const searchParams = useSearchParams();
  const produtoService = useProdutoService();
  const [sku, setSku] = useState<string>("");
  const [preco, setPreco] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [cadastro, setCadastro] = useState<string>("");

  const queryId = searchParams.get("id");

  useEffect(() => {
    produtoService.carregarProduto(queryId).then((produtoEncontrado) => {
      if (queryId) {
        setId(produtoEncontrado.id || "");
        setSku(produtoEncontrado.sku || "");
        setCadastro(produtoEncontrado.cadastro || "");
        setNome(produtoEncontrado.nome || "");
        setDescricao(produtoEncontrado.descricao || "");
        setPreco(formatReal(`${produtoEncontrado.preco}`) || "");
      }
    });
  }, [queryId]);

  const submit = () => {
    const produto: Produto = {
      id,
      sku,
      preco: converterBigDecimal(preco),
      nome,
      descricao,
    };
    validarSchema
      .validate(produto)
      .then((obj) => {
        if (id) {
          produtoService.atualizar(produto).then((response) => {
            mensagemSucesso("Produto salvo com sucesso!");
          });
        } else {
          produtoService.salvar(produto).then((response) => {
            mensagemSucesso("Produto salvo com sucesso!");
            setId(response.id ?? "");
            setCadastro(response.cadastro ?? "");
          });
        }
      })
      .catch((err) => {
        mensagemErro(err.message);
      });
  };

  return (
    <Layout titulo="Cadastro de Produtos">
      {id && (
        <div className="columns">
          {/* Codigo */}
          <Input
            label="Código: *"
            id="inputId"
            columnClasses="is-half"
            value={id}
            disabled
          />

          {/* Data Cadastro */}
          <Input
            label="Data Cadastro: *"
            id="inputCadastro"
            columnClasses="is-half"
            value={cadastro}
            disabled
          />
        </div>
      )}

      {/* divide em coluna */}
      <div className="columns">
        {/* SKU */}
        <Input
          label="SKU: *"
          id="inputSKU"
          columnClasses="is-half"
          onChange={setSku}
          value={sku}
          placeholder="Digite o SKU do produto"
        />

        {/* Preco */}
        <Input
          label="Preço: *"
          id="inputPreco"
          columnClasses="is-half"
          onChange={setPreco}
          value={preco}
          placeholder="Digite o Preço do produto"
          currency
        />
      </div>

      {/* Nome */}
      <div className="columns">
        <Input
          label="Nome: *"
          id="inputNome"
          columnClasses="is-full"
          onChange={setNome}
          value={nome}
          placeholder="Digite o Nome do produto"
        />
      </div>

      {/* Descricao */}
      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="inputDescricao">
            Descrição: *
          </label>
          <div className="control">
            <textarea
              id="inputDescricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="textarea"
              placeholder="Digite a Descrição detalhada do produto"
            />
          </div>
        </div>
      </div>

      {/* botoes de salvar e voltar */}
      <div className="field is-grouped">
        <div className="control">
          <button className="button is-primary" onClick={submit}>
            {id ? "Atualizar" : "Salvar"}
          </button>
        </div>
        <div className="control">
          <Link href="/consultas/produtos">
            <button className="button is-danger">Voltar</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
