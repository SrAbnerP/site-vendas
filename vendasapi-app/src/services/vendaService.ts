import { Venda } from "@/models/venda";
import { httpClient } from "./http/httpClient";

const resourceURL = "/api/vendas";

export const useVendasService = () => {
  const realizarVenda = async (venda: Venda): Promise<void> => {
    await httpClient.post(resourceURL, venda);
  };

  return { realizarVenda };
};
