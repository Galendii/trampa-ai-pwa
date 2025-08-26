"use client";

import React, { useMemo } from "react";

import { HandshakeIcon } from "lucide-react";

// Components
import { AutocompleteSelect } from "@/components/ui/AutocompleteSelect";
// Hooks & Context
import { useWizard } from "@/contexts/WizardContext";
import { useGetServices } from "@/hooks/api/professional/useService";

const SelectServiceStep = () => {
  const { formData, updateFormData, errors } = useWizard();
  // TODO: add param for fetching all
  const { data: servicesData, isLoading } = useGetServices(1);

  // Map the fetched service data to the format required by AutocompleteSelect
  const serviceOptions = useMemo(() => {
    if (!servicesData) return [];
    // The API returns the paginated response, so we access `results`
    const services = Array.isArray(servicesData)
      ? servicesData
      : servicesData.results || [];
    return services.map((service) => ({
      value: service.id,
      label: service.name,
    }));
  }, [servicesData]);

  const handleServiceChange = (serviceId: string) => {
    updateFormData("service", serviceId);
    // IMPORTANT: When the service changes, we must clear the selected plan,
    // as the old plan may not belong to the new service.
    updateFormData("plan", null);
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <HandshakeIcon className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Selecionar Serviço
        </h3>
        <p className="text-slate-600">
          Qual serviço será incluído neste contrato?
        </p>
      </div>

      <AutocompleteSelect
        label="Serviço"
        options={serviceOptions}
        value={formData.service}
        onChange={handleServiceChange}
        placeholder={
          isLoading ? "Carregando serviços..." : "Procure pelo nome do serviço"
        }
        disabled={isLoading}
        error={errors?.service}
        fullWidth
      />
    </div>
  );
};

export default SelectServiceStep;
