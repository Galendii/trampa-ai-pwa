"use client";

import React, { useState, useCallback, useMemo } from "react";
import {
  MessageSquareWarningIcon,
  PlusCircleIcon,
  TextSelectIcon,
} from "lucide-react";
import clsx from "clsx";

// Core Components
import Header from "@/components/Header";
import Button from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import InfiniteScroll from "@/components/ui/infinite-scroll";

// Hooks & Contexts
import { useIsMobile } from "@/hooks/useIsMobile";
import { useModalContext } from "@/contexts/ModalContext";

// API & Models
import { getServiceContracts } from "@/api/professional/services/contracts";
import { ServiceContractFullModel } from "@/models/service-contract";
import { CreateContractWizard } from "@/components/contracts";
import FilterableList from "@/components/ui/filterable-list";
import {
  ContractFiltersType,
  ContractsFilter,
} from "@/components/contracts/components/contracts-filter";
import { useUrlStateSync } from "@/hooks/useUrlStateSync";

// Placeholders for components we will create next

// import ContractDetails from "./components/contract-details";
const ContractDetails = ({
  selectedContract,
}: {
  selectedContract: ServiceContractFullModel | null;
}) => {
  if (!selectedContract) return null;
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">
        {selectedContract.label || `Contrato #${selectedContract.id}`}
      </h3>
      <p>
        <strong>Cliente ID:</strong> {selectedContract.client.id}
      </p>
      <p>
        <strong>Plano ID:</strong> {selectedContract.plan.name}
      </p>
      <p>
        <strong>Status:</strong>{" "}
        {selectedContract.signature ? "Assinado" : "Pendente"}
      </p>
    </div>
  );
};

const ContratosPage = () => {
  const isMobile = useIsMobile();
  const [selectedContract, setSelectedContract] =
    useState<ServiceContractFullModel | null>(null);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const { openModal } = useModalContext();
  const [filters, setFilters] = useUrlStateSync<ContractFiltersType>({
    search: "",
    status: [],
    ordering: "-created_at",
  });

  const isDrawerOpened = useMemo(
    () => drawerOpened && isMobile,
    [drawerOpened, isMobile]
  );

  const handleContractCreationModal = useCallback(() => {
    openModal(<CreateContractWizard onClose={() => setDrawerOpened(false)} />);
  }, [openModal]);

  const handleContractSelection = useCallback(
    (contract: ServiceContractFullModel) => {
      setSelectedContract(contract);
      setDrawerOpened(true);
    },
    []
  );

  const renderData = useCallback(
    (contract: ServiceContractFullModel): React.ReactElement => {
      if (!contract) return <></>;
      const isPendingSignature = !contract.signature?.clientSignatureDate;
      return (
        <div
          key={contract?.id}
          onClick={() => handleContractSelection(contract)}
          className={clsx(
            "border-emerald-300 hover:border-emerald-500 border border-l-4 cursor-pointer p-4 rounded-lg transition-all duration-300 relative",
            {
              "bg-yellow-50 border-yellow-400": isPendingSignature,
            },
            {
              "border-l-[10px] border-primary-500 hover:border-primary-500 bg-slate-50":
                contract.id === selectedContract?.id,
            }
          )}
        >
          <div className="flex items-center justify-between">
            <div className="w-full">
              <p className="font-semibold text-gray-900 truncate w-full">
                {contract.label || `Contrato #${contract.id}`}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Cliente ID: {contract.client.firstName}{" "}
                {contract.client.lastName}
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Criado em:{" "}
                {new Date(contract.createdAt).toLocaleDateString("pt-BR")}
              </p>
              {isPendingSignature && (
                <span className="text-yellow-700">Pendente de assinatura</span>
              )}
            </div>
          </div>
          {isPendingSignature && (
            <MessageSquareWarningIcon className="h-6 w-6 mb-2 ml-2 text-yellow-700 absolute top-2 right-2" />
          )}
        </div>
      );
    },
    [selectedContract, handleContractSelection]
  );

  return (
    <>
      <Header title="Contratos" />
      <div className="w-full">
        <div className="p-4 h-full w-full flex flex-col md:flex-row justify-around items-start space-y-4 md:space-y-0 md:space-x-4">
          <div className="bg-white p-4 rounded-md shadow-md w-full md:flex-1">
            <Button onClick={handleContractCreationModal} variant="outline">
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              <span className="text-sm">Criar Contrato</span>
            </Button>
            <ContractsFilter filters={filters} onFilterChange={setFilters} />
            <FilterableList<ServiceContractFullModel, ContractFiltersType>
              baseQueryKey={["professional-contracts"]}
              className="mt-6"
              filters={filters}
              renderData={renderData}
              fetchData={getServiceContracts}
              ordering={filters.ordering}
            />
          </div>

          <div className="hidden md:block w-full max-w-sm">
            {selectedContract ? (
              <div className="bg-white h-full p-4 rounded-md shadow-md">
                <ContractDetails selectedContract={selectedContract} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-center h-full p-4 border-2 border-dashed rounded-lg">
                <TextSelectIcon className="h-12 w-12 text-gray-400" />
                <p className="text-md font-semibold text-neutral-800 mt-2">
                  Nenhum contrato selecionado
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Selecione um contrato na lista para ver seus detalhes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Drawer
        handleCloseDrawer={() => setDrawerOpened(false)}
        opened={isDrawerOpened}
      >
        <div className="p-4">
          <ContractDetails selectedContract={selectedContract} />
        </div>
      </Drawer>
    </>
  );
};

export default React.memo(ContratosPage);
