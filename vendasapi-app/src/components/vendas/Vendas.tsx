"use client";
import React from "react";
import Layout from "../layout/Layout";
import { Venda } from "@/models/venda";
import { VendasForm } from "./Form";
import { useVendasService } from "@/services/vendaService";
import { mensagemErro, mensagemSucesso } from "../common/Toastr";

export default function Vendas() {
  const vendaService = useVendasService();

  const handleSubmit = (venda: Venda) => {
    vendaService
      .realizarVenda(venda)
      .then((response) => {
        mensagemSucesso("Venda efetuada com sucesso!");
      })
      .catch((error) => {
        mensagemErro("Ocorreu um erro, entre em contato com a administração.");
      });
  };

  return (
    <Layout titulo="Vendas">
      <VendasForm onSubmit={handleSubmit} />
    </Layout>
  );
}
