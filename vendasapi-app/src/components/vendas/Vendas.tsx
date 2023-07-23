"use client";
import React from "react";
import Layout from "../layout/Layout";
import { Venda } from "@/models/venda";
import { VendasForm } from "./Form";

export default function Vendas() {
  const handleSubmit = (venda: Venda) => {
    console.log(venda);
  };
  return (
    <Layout titulo="Vendas">
      <VendasForm onSubmit={handleSubmit} />
    </Layout>
  );
}
