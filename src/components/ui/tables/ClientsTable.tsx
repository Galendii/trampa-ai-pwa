import { ClientUserModel } from "@/models/user";
import { Table } from "./Table";
import React, { useCallback } from "react";
import { StringHelper } from "@/helpers/string-helper";
import Button from "../button";
import { PlusIcon } from "lucide-react";

const HEADERS = [
  {
    label: "Cliente",
    key: "client",
  },
  {
    label: "Plano Atual",
    key: "services",
  },
  {
    label: "Código do Profissional",
    key: "professionalReferralCode",
  },
  {
    label: "Data de cadastro",
    key: "created_at",
  },
];

export const ClientsTable = ({ clients }: { clients: ClientUserModel[] }) => {
  const stringHelper = new StringHelper();
  const renderCellContent = useCallback(
    (row: ClientUserModel, key: string) => {
      console.log(key, row);
      switch (key) {
        case "client":
          return (
            <div className="px-6 py-4 whitespace-nowrap">
              <div className="text-md font-medium text-gray-900">
                {row.firstName} {row.lastName}
              </div>
              <div className="text-xs my-1 text-gray-500">{row.email}</div>
              <div className="text-xs my-1 text-gray-500">
                {stringHelper.formatAsPhoneNumber(row.phone)}
              </div>
              <div className="text-xs my-1 text-gray-500">
                {stringHelper.formatAsCPF(row.cpf)}
              </div>
            </div>
          );
        case "services":
          return row[key] ?? "-";
        case "professionalReferralCode":
          return row[key] ?? "-";
        default:
          return row[key] ?? "-";
      }
    },
    [stringHelper]
  );
  return (
    <Table
      rows={clients}
      headers={HEADERS}
      title="Clientes"
      renderCellContent={renderCellContent}
      actionButton={
        <Button>
          <PlusIcon className="mr-2" size={16} /> Adicionar Cliente
        </Button>
      }
    />
  );
};
