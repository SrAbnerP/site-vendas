"use client";
import { useState } from "react";
import Layout from "../layout/Layout";

import { Cliente } from "@/models/cliente";
import { ClienteForm } from "./Form";

export default function CadastroCliente(props: any) {
  const [cliente, setCliente] = useState<Cliente>({});

  const handleSubmit = (cliente: Cliente) => {
    console.log(cliente);
  };
  return (
    <Layout titulo="Clientes">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
}
