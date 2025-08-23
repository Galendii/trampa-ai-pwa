"use client";

import React, { useMemo } from "react";
import { User } from "lucide-react";

// Components
import { AutocompleteSelect } from "@/components/ui/AutocompleteSelect";

// Hooks & Context
import { useWizard } from "@/contexts/WizardContext";
import { useGetClients } from "@/hooks/api/professional/useProfessional";

const SelectClientStep = () => {
  const { formData, updateFormData, errors } = useWizard();
  const { data: clientsData, isLoading } = useGetClients();

  // Map the fetched client data to the format required by AutocompleteSelect
  const clientOptions = useMemo(() => {
    if (!clientsData?.results) return [];
    return clientsData.results.map((client) => ({
      value: client.id,
      label: `${client.firstName} ${client.lastName} (${client.cpf})`,
    }));
  }, [clientsData]);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Selecionar Cliente
        </h3>
        <p className="text-slate-600">
          Para quem este novo contrato se destina?
        </p>
      </div>

      <AutocompleteSelect
        label="Cliente"
        options={clientOptions}
        value={formData.client}
        onChange={(value) => updateFormData("client", value)}
        placeholder={
          isLoading ? "Carregando clientes..." : "Procure por nome ou CPF"
        }
        disabled={isLoading}
        error={errors?.client}
        fullWidth
      />
    </div>
  );
};

export default SelectClientStep;
