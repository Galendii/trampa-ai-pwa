"use client";

import { Suspense, useState } from "react";

import { copyToClipboard } from "lib/utils";
import { CopyIcon, Edit, Eye, TextSelectIcon, Trash2 } from "lucide-react";

import { getClients } from "@/api/professional";
import { ClientsFilter } from "@/components/clients/clients-filter";
import Header from "@/components/Header";
import { Accordion, AccordionItem } from "@/components/ui/Accordion";
import { Drawer } from "@/components/ui/Drawer";
import FilterableList from "@/components/ui/filterable-list";
import { StringHelper } from "@/helpers/string-helper";
import { useGetClientContracts } from "@/hooks/api/professional/useClients";
import { useUrlStateSync } from "@/hooks/useUrlStateSync";
import { PageDataModel } from "@/models/paginated-response";
import { ServiceContractStatusMap } from "@/models/service-contract";
import { ClientUserModel } from "@/models/user";
import { useProfessionalStore } from "@/stores/useProfessionalStore";

type ClientsFilterTypes = Omit<PageDataModel, "page">;
const ClientContractDetails = ({ clientId }: { clientId: string }) => {
  const { data: contracts } = useGetClientContracts(clientId);

  if (contracts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-full p-4 border-2 border-dashed rounded-lg w-full max-w-sm mx-auto">
        <TextSelectIcon className="h-12 w-12 text-gray-400" />
        <p className="text-md font-semibold text-neutral-800 mt-2">
          Nenhum contrato criado
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Crie um contrato para este cliente para ver seus detalhes.
        </p>
      </div>
    );
  }
  return (
    <Accordion>
      {contracts.map((contract) => (
        <AccordionItem
          key={contract.id}
          title={
            <h3 className="text-lg font-bold mb-4">{`Contrato #${contract.id}`}</h3>
          }
          className="bg-white h-full p-4 rounded-md shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold mb-4">{`Contrato #${contract.id}`}</h3>

            <p>
              <strong>Cliente:</strong> {contract.client.firstName}{" "}
              {contract.client.lastName}
            </p>
            <p>
              <strong>Plano:</strong> {contract.plan.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {ServiceContractStatusMap[contract.status]}
            </p>
          </div>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const ClientContractDetailsSkeleton = () => (
  <div className="bg-white h-full p-4 rounded-md shadow-md animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

export default function ClientsPage() {
  const stringHelper = new StringHelper();
  const [isDrawerOpened, setDrawerOpened] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [filters, setFilters] = useUrlStateSync<ClientsFilterTypes>({
    search: "",
    ordering: "-created_at",
  });
  const { professional } = useProfessionalStore();

  const getStatusBadge = (status: ClientUserModel["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white";
      case "pending-account-creation":
        return "bg-yellow-500 text-white";
      case "user-deactivated":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusText = (status: ClientUserModel["status"]) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "pending-account-creation":
        return "Cadastro pendente";
      case "user-deactivated":
        return "Inativo";
      default:
        return "Indefinido";
    }
  };

  const handleClientSelection = (clientId: string) => {
    setSelectedClientId(clientId);
    setDrawerOpened(!isDrawerOpened);
  };

  const renderData = (client: ClientUserModel) => (
    <button
      onClick={() => handleClientSelection(client.id)}
      key={client.id}
      className="w-full text-start bg-white md:flex items-center justify-between md:space-x-4"
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
            client.status
          )}`}
        >
          {getStatusText(client.status)}
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
    </button>
  );

  return (
    <>
      <div className="p-4 sm:p-6 space-y-6">
        <Header title="Clientes" />

        <div className="flex flex-col items-start space-y-4 w-full">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1 w-full">
            <ClientsFilter filters={filters} onFilterChange={setFilters} />
          </div>
          <div className="flex items-center">
            <p>Código exclusivo de profissional: </p>
            <button
              className="flex items-center font-bold ml-2"
              onClick={() => copyToClipboard(professional?.code || "")}
            >
              {professional?.code} <CopyIcon className="w-4 h-4 ml-2" />
            </button>
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
      <Drawer
        handleCloseDrawer={() => setDrawerOpened(false)}
        opened={isDrawerOpened}
      >
        <div className="p-4">
          {selectedClientId ? (
            <Suspense fallback={<ClientContractDetailsSkeleton />}>
              {/* --- FIX 3: Also pass the props to the Drawer's instance --- */}
              <ClientContractDetails clientId={selectedClientId} />
            </Suspense>
          ) : null}
        </div>
      </Drawer>
    </>
  );
}
