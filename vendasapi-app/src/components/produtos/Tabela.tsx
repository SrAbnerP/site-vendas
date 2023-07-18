import { Produto } from "@/models/produto";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

interface TabelaProdutosProps {
  produtos: Array<Produto>;
  onEdit: (produto: any) => void;
  onDelete: (produto: any) => void;
}

export const TabelaProdutos: React.FC<TabelaProdutosProps> = ({
  produtos,
  onDelete,
  onEdit,
}) => {
  const actionTemplate = (registro: Produto) => {
    const url = `/cadastros/produtos?id=${registro.id}`;
    return (
      <div>
        <ConfirmPopup />
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={(e) => onEdit(registro)}
            className="p-button-rounded p-button-info"
            icon="pi pi-check"
            label="Editar"
          ></Button>
          <Button
            onClick={(event) => {
              confirmPopup({
                message: "Confirma a exclusão deste registro?",
                acceptLabel: "Sim",
                rejectLabel: "Não",
                accept: () => onDelete(registro),
              });
            }}
            icon="pi pi-times"
            label="Deletar"
            className="p-button-danger p-button-outlined p-button-rounded"
          ></Button>
        </div>
      </div>
    );
  };

  return (
    <DataTable
      value={produtos}
      paginator
      rows={5}
      emptyMessage="Nenhum registro."
    >
      <Column field="id" header="Código" />
      <Column field="sku" header="SKU" />
      <Column field="nome" header="Nome" />
      <Column field="preco" header="Preço" />
      <Column header="" body={actionTemplate} />
    </DataTable>
  );
};
