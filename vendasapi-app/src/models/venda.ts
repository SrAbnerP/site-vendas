import { Cliente } from "./cliente";
import { Produto } from "./produto";

export interface Venda {
  cliente?: any;
  itens?: Array<ItemVenda>;
  formaPagamento?: string;
  total?: number;
}

export interface ItemVenda {
  produto: Produto;
  quantidade: number;
}
