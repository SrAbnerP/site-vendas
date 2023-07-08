"use client";
import Link from "next/link";
import Layout from "../layout/Layout";
import { TabelaProdutos } from "./Tabela";
import { Produto } from "@/models/produto";
import useSWR from "swr";
import { httpClient } from "@/services/http/httpClient";
import { AxiosResponse } from "axios";

export default function ListagemProdutos() {
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  if (!result) {
    return <div>Carregando...</div>;
  }

  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <TabelaProdutos produtos={result.data} />
    </Layout>
  );
}
