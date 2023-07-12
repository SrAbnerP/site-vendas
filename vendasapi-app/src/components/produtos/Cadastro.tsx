"use client";
import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Input, InputMoney } from "../common/Input";
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
    <Layout titulo="Produtos">
      {id && (
        <div className="columns">
          <Input
            label="Código:"
            columnClasses="is-half"
            value={id}
            id="inputId"
            disabled={true}
          />

          <Input
            label="Data Cadastro:"
            columnClasses="is-half"
            value={cadastro}
            id="inputDataCadastro"
            disabled
          />
        </div>
      )}
      <div className="columns">
        <Input
          label="SKU: *"
          columnClasses="is-half"
          onChange={(e) => setSku(e.target.value)}
          value={sku}
          id="inputSku"
          placeholder="Digite o SKU do produto"
        />

        <InputMoney
          label="Preço: *"
          columnClasses="is-half"
          onChange={(e) => setPreco(e.target.value)}
          value={preco}
          id="inputPreco"
          placeholder="Digite o Preço do produto"
        />
      </div>

      <div className="columns">
        <Input
          label="Nome: *"
          columnClasses="is-full"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          id="inputNome"
          placeholder="Digite o Nome do produto"
        />
      </div>

      <div className="columns">
        <div className="field column is-full">
          <label className="label" htmlFor="inputDesc">
            Descrição: *
          </label>
          <div className="control">
            <textarea
              className="textarea"
              id="inputDesc"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Digite a Descrição detalhada do produto"
            />
          </div>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control is-link">
          <button onClick={submit} className="button is-success">
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
