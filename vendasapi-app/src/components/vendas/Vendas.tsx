"use client";
import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Venda } from "@/models/venda";
import { VendasForm } from "./Form";
import { useVendasService } from "@/services/vendaService";
import { mensagemErro, mensagemSucesso } from "../common/Toastr";

export default function Vendas() {
  const vendaService = useVendasService();

  const [vendaRealizada, setVendaRealizada] = useState<boolean>(false);

  const handleSubmit = (venda: Venda) => {
    vendaService
      .realizarVenda(venda)
      .then((response) => {
        setVendaRealizada(true);
        mensagemSucesso("Venda efetuada com sucesso!");
      })
      .catch((error) => {
        mensagemErro("Ocorreu um erro, entre em contato com a administração.");
      });
  };

  const handleNovaVenda = () => {
    setVendaRealizada(false);
  };

  return (
    <Layout titulo="Vendas">
      <VendasForm
        onSubmit={handleSubmit}
        onNovaVenda={handleNovaVenda}
        vendaRealizada={vendaRealizada}
      />
    </Layout>
  );
}
