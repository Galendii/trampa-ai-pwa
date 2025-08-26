"use client";

import React, { useState } from "react";

import { ArrowDown, ArrowUp, Loader, Search, UserPlus } from "lucide-react";

import { Input } from "@/components/ui/Input";
import {
  MultiSelectGroup,
  MultiSelectOption,
} from "@/components/ui/MultiSelectGroup";
import { Select, SelectOption } from "@/components/ui/Select";
import { useModalContext } from "@/contexts/ModalContext";
import useDebounce from "@/hooks/useDebounce";
import { PageDataModel } from "@/models/paginated-response";

import Button from "../ui/Button";

// This is the type for the state that our hook will manage
export type ClientsFiltersType = Omit<PageDataModel, "page">;

type ClientsFilterProps = {
  filters: ClientsFiltersType;
  onFilterChange: (newFilters: Partial<ClientsFiltersType>) => void;
};

const ORDERING_OPTIONS: SelectOption[] = [
  { value: "-created_at", label: "Mais Recentes" },
  { value: "created_at", label: "Mais Antigos" },
];

export const ClientsFilter: React.FC<ClientsFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  const [search, setSearch] = useState(filters.search);
  const { openModal } = useModalContext();
  const [isReady] = useDebounce(
    () => {
      onFilterChange({ ...filters, search });
    },
    500,
    [search]
  );

  const handleClientPreSignModal = () => {
    openModal(ClientPreSignModal);
  };
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4 w-full">
      <Button onClick={handleClientPreSignModal}>
        <UserPlus className="h-4 w-4 mr-3" />
        Pré Cadastro
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            placeholder="Buscar clientes"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={
              !isReady ? (
                <Loader className="h-4 w-4 text-neutral-600 animate-spin" />
              ) : (
                <Search className="h-4 w-4 text-neutral-600" />
              )
            }
          />
        </div>
        <Select
          options={ORDERING_OPTIONS}
          value={filters.ordering}
          onChange={(value) => onFilterChange({ ordering: value })}
        />
      </div>
    </div>
  );
};
