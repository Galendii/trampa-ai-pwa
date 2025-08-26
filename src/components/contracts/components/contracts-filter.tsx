"use client";

import React from "react";

import { ArrowDown, ArrowUp, Search } from "lucide-react";

import { Input } from "@/components/ui/Input";
import {
  MultiSelectGroup,
  MultiSelectOption,
} from "@/components/ui/MultiSelectGroup";
import { Select, SelectOption } from "@/components/ui/Select";
import { PageDataModel } from "@/models/paginated-response";

// This is the type for the state that our hook will manage
export type ContractFiltersType = {
  status?: string[];
} & Omit<PageDataModel, "page">;

type ContractsFilterProps = {
  filters: ContractFiltersType;
  onFilterChange: (newFilters: Partial<ContractFiltersType>) => void;
};

const STATUS_OPTIONS: MultiSelectOption[] = [
  { value: "pending", label: "Pendente" },
  { value: "signed", label: "Assinado" },
  { value: "active", label: "Ativo" },
  { value: "finished", label: "Finalizado" },
];

const ORDERING_OPTIONS: SelectOption[] = [
  { value: "-created_at", label: "Mais Recentes" },
  { value: "created_at", label: "Mais Antigos" },
  { value: "-signature_date", label: "Assinados Recentemente" },
  { value: "signature_date", label: "Assinados há mais tempo" },
];

export const ContractsFilter: React.FC<ContractsFilterProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Input
            placeholder="Buscar por cliente ou plano..."
            className="pl-10"
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            leftIcon={<Search className="h-4 w-4 text-neutral-600" />}
          />
        </div>
        <Select
          options={ORDERING_OPTIONS}
          value={filters.ordering}
          onChange={(value) => onFilterChange({ ordering: value })}
        />
      </div>
      <div>
        <MultiSelectGroup
          label="Status do Contrato"
          options={STATUS_OPTIONS}
          values={filters.status ?? []}
          onChange={(values) => onFilterChange({ status: values })}
        />
      </div>
    </div>
  );
};
