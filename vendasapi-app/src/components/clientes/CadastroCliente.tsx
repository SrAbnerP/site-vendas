"use client";
import { useEffect, useState } from "react";
import Layout from "../layout/Layout";

import { Cliente } from "@/models/cliente";
import { ClienteForm } from "./Form";
import { useClienteService } from "@/services/clienteService";
import { mensagemSucesso } from "../common/Toastr";
import { useSearchParams } from "next/navigation";

export default function CadastroCliente(props: any) {
  const clienteService = useClienteService();
  const [cliente, setCliente] = useState<Cliente>({});
  const searchParams = useSearchParams();

  const queryId = searchParams.get("id");

  useEffect(() => {
    if (queryId) {
      clienteService
        .carregarCliente(queryId)
        .then((cliente) => setCliente(cliente));
    }
  }, [queryId]);

  const handleSubmit = (cliente: Cliente) => {
    console.log(cliente);
    if (cliente.id) {
      clienteService.atualizar(cliente).then((response) => {
        mensagemSucesso("Cliente  atualizado com sucesso!");
      });
    } else {
      clienteService.salvar(cliente).then((response) => {
        setCliente(response);
        mensagemSucesso("Cliente cadastrado com sucesso!");
      });
    }
  };

  return (
    <Layout titulo="Clientes">
      <ClienteForm cliente={cliente} onSubmit={handleSubmit} />
    </Layout>
  );
}
