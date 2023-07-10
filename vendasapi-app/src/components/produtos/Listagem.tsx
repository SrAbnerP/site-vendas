"use client";
import Link from "next/link";
import Layout from "../layout/Layout";
import { TabelaProdutos } from "./Tabela";
import { Produto } from "@/models/produto";
import useSWR from "swr";
import { httpClient } from "@/services/http/httpClient";
import { AxiosResponse } from "axios";
import { Loader } from "../common/Loader";
import { useRouter } from "next/navigation";

export default function ListagemProdutos() {
  const router = useRouter();

  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    router.push(url);
  };

  const deletar = (produto: Produto) => {};

  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <br />
      <Loader show={!result} />
      <TabelaProdutos
        onDelete={deletar}
        onEdit={editar}
        produtos={result?.data || []}
      />
    </Layout>
  );
}
