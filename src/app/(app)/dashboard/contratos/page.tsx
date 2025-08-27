"use client";

import React, { Suspense, useCallback, useMemo, useState } from "react";

import clsx from "clsx";
import {
  MessageSquareWarningIcon,
  PlusCircleIcon,
  TextSelectIcon,
  TrashIcon,
} from "lucide-react";

// API & Models
import { getServiceContracts } from "@/api/professional/services/contracts";
import {
  ContractFiltersType,
  ContractsFilter,
} from "@/components/contracts/components/contracts-filter";
import { CreateContractWizardConfig } from "@/components/contracts/create-contract-wizard";
// Core Components
import Header from "@/components/Header";
import { ActionConfirmationModal } from "@/components/ui/ActionConfirmationModal";
import Button from "@/components/ui/Button";
import { Drawer } from "@/components/ui/Drawer";
import FilterableList from "@/components/ui/filterable-list";
// Hooks & Contexts
import {
  useDeleteServiceContract,
  useGetServiceContractById,
} from "@/hooks/api/professional/useServiceContracts";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useUrlStateSync } from "@/hooks/useUrlStateSync";
import {
  ServiceContractFullModel,
  ServiceContractStatus,
  ServiceContractStatusMap,
} from "@/models/service-contract";
import { useModalStore } from "@/stores/useModalStore";
import { useWizardStore } from "@/stores/useWizardStore";
// import { useWizardStore } from "@/stores/useWizardStore";

// --- ContractDetails component ---
const ContractDetails = ({
  selectedContractId,
  onDelete,
  isDeleting,
}: {
  selectedContractId: string;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) => {
  const { openModal, closeModal } = useModalStore();
  const { data: contract, isPending } =
    useGetServiceContractById(selectedContractId);

  const handleDeleteContract = () => {
    onDelete(String(contract.id));
  };

  const handleConfirmationModal = () => {
    openModal(
      <ActionConfirmationModal
        title="Excluir Contrato"
        message="Tem certeza que deseja excluir este contrato?"
        onConfirm={handleDeleteContract}
        onCancel={closeModal}
        isLoading={isPending}
      />,
      "small"
    );
  };
  if (!contract) return <ContractDetailsSkeleton />;

  return (
    <div className="bg-white h-full p-4 rounded-md shadow-md">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold mb-4">{`Contrato #${contract.id}`}</h3>
        <Button
          onClick={handleConfirmationModal}
          variant="danger"
          disabled={isDeleting}
        >
          {isDeleting ? "Excluindo..." : <TrashIcon className="h-4 w-4" />}
        </Button>
      </div>
      <p>
        <strong>Cliente:</strong> {contract.client.firstName}{" "}
        {contract.client.lastName}
      </p>
      <p>
        <strong>Plano:</strong> {contract.plan.name}
      </p>
      <p>
        <strong>Status:</strong> {ServiceContractStatusMap[contract.status]}
      </p>
    </div>
  );
};

const ContractDetailsSkeleton = () => (
  <div className="bg-white h-full p-4 rounded-md shadow-md animate-pulse">
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
  </div>
);

const ContratosPage = () => {
  const isMobile = useIsMobile();
  const [selectedContract, setSelectedContract] =
    useState<ServiceContractFullModel | null>(null);
  const [drawerOpened, setDrawerOpened] = useState<boolean>(false);
  const { closeModal } = useModalStore();

  // --- ZUSTAND STORE FOR WIZARD ---
  const { startWizard } = useWizardStore();

  const [filters, setFilters] = useUrlStateSync<ContractFiltersType>({
    search: "",
    status: [],
    ordering: "-created_at",
  });

  const { mutate: deleteContract, isPending: isDeletingContract } =
    useDeleteServiceContract();

  const isDrawerOpened = useMemo(
    () => drawerOpened && isMobile,
    [drawerOpened, isMobile]
  );

  const handleContractCreation = useCallback(() => {
    // --- TRIGGER WIZARD FROM THE STORE ---
    startWizard(CreateContractWizardConfig);
  }, [startWizard]);

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
      const statusColorMap = {
        [ServiceContractStatus.ACTIVE]: "emerald",
        [ServiceContractStatus.PENDING_SIGNATURE]: "yellow",
        [ServiceContractStatus.CANCELED]: "red",
        [ServiceContractStatus.OVERDUE]: "orange",
      };
      return (
        <button
          key={contract?.id}
          onClick={() => handleContractSelection(contract)}
          className={clsx(
            "w-full text-start hover:border-primary-500 border border-l-4 cursor-pointer p-4 rounded-lg transition-all duration-300 relative",
            {
              [`bg-${statusColorMap[contract.status]}-50 border-${
                statusColorMap[contract.status]
              }-400`]: contract.status,
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
                {`Contrato #${contract.id}`}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Cliente: {contract.client.firstName} {contract.client.lastName}
              </p>
              <span className="text-yellow-700">
                {ServiceContractStatusMap[contract.status]}
              </span>
            </div>
          </div>
          {(contract.status === ServiceContractStatus.PENDING_SIGNATURE ||
            contract.status === ServiceContractStatus.OVERDUE) && (
            <MessageSquareWarningIcon
              className={clsx("h-6 w-6 mb-2 ml-2 absolute top-2 right-2", {
                [`text-${statusColorMap[contract.status]}-700`]:
                  contract.status,
              })}
            />
          )}
        </button>
      );
    },
    [selectedContract, handleContractSelection]
  );

  const handleContractDeletion = useCallback(() => {
    if (!selectedContract?.id) return;
    try {
      deleteContract(String(selectedContract.id));
      setSelectedContract(null);
    } catch (e) {
      console.log(e);
    } finally {
      closeModal();
      setDrawerOpened(false);
    }
  }, [selectedContract, deleteContract, closeModal]);

  const renderContractDetails = useCallback(() => {
    if (!selectedContract?.id) {
      return (
        <div className="hidden md:flex flex-col items-center justify-center text-center h-full p-4 border-2 border-dashed rounded-lg w-full max-w-sm">
          <TextSelectIcon className="h-12 w-12 text-gray-400" />
          <p className="text-md font-semibold text-neutral-800 mt-2">
            Nenhum contrato selecionado
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Selecione um contrato na lista para ver seus detalhes.
          </p>
        </div>
      );
    }
    return (
      <div className="hidden md:block w-full max-w-sm">
        <Suspense fallback={<ContractDetailsSkeleton />}>
          {/* --- FIX 2: Pass the delete function and loading state down as props --- */}
          <ContractDetails
            selectedContractId={String(selectedContract.id)}
            onDelete={handleContractDeletion}
            isDeleting={isDeletingContract}
          />
        </Suspense>
      </div>
    );
  }, [selectedContract, deleteContract, isDeletingContract]);

  return (
    <>
      <Header title="Contratos" />
      <div className="w-full">
        <div className="p-4 h-full w-full flex flex-col md:flex-row items-start gap-4">
          <div className="bg-white p-4 rounded-md shadow-md flex-1 space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Lista de Contratos</h2>
              <Button onClick={handleContractCreation} variant="outline">
                <PlusCircleIcon className="h-4 w-4 mr-2" />
                <span>Criar Contrato</span>
              </Button>
            </div>

            <ContractsFilter filters={filters} onFilterChange={setFilters} />

            <FilterableList<ServiceContractFullModel, ContractFiltersType>
              baseQueryKey={["professional-service-contracts"]}
              className="mt-6"
              filters={filters}
              renderData={renderData}
              fetchData={getServiceContracts}
              ordering={filters.ordering || "-created_at"}
            />
          </div>
          {renderContractDetails()}
        </div>
      </div>
      <Drawer
        handleCloseDrawer={() => setDrawerOpened(false)}
        opened={isDrawerOpened}
      >
        <div className="p-4">
          {selectedContract?.id ? (
            <Suspense fallback={<ContractDetailsSkeleton />}>
              {/* --- FIX 3: Also pass the props to the Drawer's instance --- */}
              <ContractDetails
                selectedContractId={String(selectedContract.id)}
                onDelete={handleContractDeletion}
                isDeleting={isDeletingContract}
              />
            </Suspense>
          ) : null}
        </div>
      </Drawer>
    </>
  );
};

export default React.memo(ContratosPage);
