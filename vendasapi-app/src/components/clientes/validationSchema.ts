import * as Yup from "yup";
import { mensagemErro } from "../common/Toastr";

export const validationScheme = Yup.object().shape({
  nome: Yup.string().trim().required("Preencha o seu nome"),
  cpf: Yup.string()
    .trim()
    .required("Preencha o seu CPF")
    .length(14, "CPF Inválido!"),
  nascimento: Yup.string()
    .trim()
    .required("Preencha o sua Data de Nascimento")
    .length(10, "Data Inválida!"),
  endereco: Yup.string().trim().required("Preencha o seu Endereço"),
  email: Yup.string()
    .trim()
    .required("Preencha o seu Email")
    .email("Email inválido!"),
  telefone: Yup.string().trim().required("Preencha o seu Telefone"),
});
