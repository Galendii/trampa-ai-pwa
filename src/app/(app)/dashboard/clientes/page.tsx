"use client";

import { useState } from "react";

import { Edit, Eye, Plus, Search, Trash2, Users } from "lucide-react";

import { getClients } from "@/api/professional/professional";
import { ClientsFilter } from "@/components/clients/clients-filter";
import FilterableList from "@/components/ui/filterable-list";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { StringHelper } from "@/helpers/string-helper";
import { useUrlStateSync } from "@/hooks/useUrlStateSync";
import { PageDataModel } from "@/models/paginated-response";
import { ClientUserModel } from "@/models/user";

import Header from "../../../../components/Header";

type ClientsFilterTypes = Omit<PageDataModel, "page">;

export default function ClientsPage() {
  const stringHelper = new StringHelper();
  const [filters, setFilters] = useUrlStateSync<ClientsFilterTypes>({
    search: "",
    ordering: "-created_at",
  });

  const getStatusBadge = (status: string) => {
    return status === "ativo" ? "status-badge-active" : "status-badge-inactive";
  };

  const renderData = (client: ClientUserModel) => (
    <div
      key={client.id}
      className="bg-white md:flex items-center justify-between md:space-x-4"
    >
      <div className="p-2 md:px-6 md:py-4 whitespace-nowrap">
        <div>
          <div className="text-sm font-medium text-gray-900">
            {client.firstName} {client.lastName}
          </div>
          <div className="text-sm text-gray-500">{client.email}</div>
          <div className="text-sm text-gray-500">
            {stringHelper.formatAsPhoneNumber(client.phone)}
          </div>
          <div className="text-sm text-gray-500">
            {stringHelper.formatAsCPF(client.cpf)}
          </div>
        </div>
      </div>

      <div className="p-2 md:px-6 md:py-4 whitespace-nowrap text-sm text-gray-900">
        Criado em: {new Date(client.createdAt).toLocaleDateString("pt-BR")}
      </div>
      <div className="px-2 md:px-6 md:py-4 whitespace-nowrap">
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(
            client.professionalReferralCode ? "ativo" : "inativo"
          )}`}
        >
          {client.professionalReferralCode ? "Ativo" : "Inativo"}
        </span>
      </div>
      <div className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end space-x-2">
          <button
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Ver detalhes"
          >
            <Eye size={16} />
          </button>
          <button
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Editar"
          >
            <Edit size={16} />
          </button>
          <button
            className="text-gray-400 hover:text-red-600 p-1"
            aria-label="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <Header title="Clientes" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1 w-full sm:w-auto">
          <ClientsFilter filters={filters} onFilterChange={setFilters} />
        </div>
      </div>

      <FilterableList<ClientUserModel, ClientsFilterTypes>
        baseQueryKey={["professional-clients"]}
        fetchData={getClients}
        renderData={renderData}
        filters={filters}
        ordering={filters?.ordering || "-created_at"}
      />
    </div>
  );
}
