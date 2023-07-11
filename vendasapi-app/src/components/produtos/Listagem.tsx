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
import { useProdutoService } from "@/services/produtoService";

import { mensagemErro, mensagemSucesso } from "../common/Toastr";
import { useEffect, useState } from "react";

export default function ListagemProdutos() {
  const router = useRouter();
  const produtoService = useProdutoService();

  const { data: result, error } = useSWR<AxiosResponse<Produto[]>>(
    "/api/produtos",
    (url) => httpClient.get(url)
  );

  const [lista, setLista] = useState<Produto[]>([]);

  useEffect(() => {
    setLista(result?.data || []);
  }, [result]);

  const editar = (produto: Produto) => {
    const url = `/cadastros/produtos?id=${produto.id}`;
    router.push(url);
  };

  const deletar = (produto: Produto) => {
    produtoService
      .deletar(produto.id)
      .then((response) => {
        mensagemSucesso("Produto deletado com sucesso!");
        const listaAlterada: Produto[] = lista?.filter(
          (p) => p.id != produto.id
        );
        setLista(listaAlterada);
      })
      .catch((err) => {
        mensagemErro(err.message);
      });
  };

  return (
    <Layout titulo="Produtos">
      <Link href="/cadastros/produtos">
        <button className="button is-warning">Novo</button>
      </Link>
      <br />
      <br />
      <Loader show={!result} />
      <TabelaProdutos onDelete={deletar} onEdit={editar} produtos={lista} />
    </Layout>
  );
}
