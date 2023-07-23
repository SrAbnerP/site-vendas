import { Cliente } from "./cliente";
import { Produto } from "./produto";

export interface Venda {
  cliente?: any;
  produtos?: Array<Produto>;
  formaPagamento?: string;
  total?: number;
}
