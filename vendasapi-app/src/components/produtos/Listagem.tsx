"use client";
import Link from "next/link";
import Layout from "../layout/Layout";
import { TabelaProdutos } from "./Tabela";
import { Produto } from "@/models/produto";
import useSWR from "swr";
import { httpClient } from "@/services/http/httpClient";
import { AxiosResponse } from "axios";
import { Loader } from "../common/Loader";

export default function ListagemProdutos() {
  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <Loader show={!result} />
      <TabelaProdutos produtos={result?.data || []} />
    </Layout>
  );
}
