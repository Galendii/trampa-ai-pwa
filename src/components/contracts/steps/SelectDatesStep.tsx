"use client";

import React, { useEffect } from "react";
import { Calendar, Loader2 } from "lucide-react";
import { addMonths, format } from "date-fns";

// Components
import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/Input";

// Hooks & Context
import { useWizard } from "@/contexts/WizardContext";
import { useGetPlanById } from "@/hooks/api/professional/usePlans";

const SelectDatesStep = () => {
  const { formData, updateFormData, errors } = useWizard();
  const { service, plan, startingDate } = formData;

  // Fetch the full details of the selected plan to get its duration
  const {
    data: selectedPlan,
    isLoading,
    isError,
  } = useGetPlanById(plan, service);

  // Automatically calculate and update the end date when the start date or plan changes
  useEffect(() => {
    if (startingDate && selectedPlan) {
      const startDateObj = new Date(startingDate);
      // addMonths is a reliable way to add months, handling edge cases like end-of-month dates
      const calculatedEndDate = addMonths(startDateObj, selectedPlan.duration);
      updateFormData("endingDate", calculatedEndDate.toISOString());
    }
  }, [startingDate, selectedPlan, updateFormData]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      );
    }

    if (isError) {
      return (
        <p className="text-center text-red-500 py-8">
          Erro ao carregar detalhes do plano.
        </p>
      );
    }

    if (!plan || !selectedPlan) {
      return (
        <p className="text-center text-slate-500 py-8">
          Por favor, volte e selecione um plano primeiro.
        </p>
      );
    }

    return (
      <div className="space-y-6">
        <DatePicker
          label="Data de Início do Contrato"
          value={
            formData.startingDate ? new Date(formData.startingDate) : undefined
          }
          onChange={(date) =>
            updateFormData("startingDate", date?.toISOString())
          }
          fullWidth
          minDate={new Date()}
        />

        {formData.endingDate && (
          <div>
            <Input
              label="Data de Término do Contrato"
              value={format(formData.endingDate, "dd/MM/yyyy")}
              readOnly
              disabled
            />
            <p className="text-xs text-slate-500 mt-1">
              *Calculado automaticamente com base na duração do plano de{" "}
              <strong>{selectedPlan.duration} meses</strong>.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Período do Contrato
        </h3>
        <p className="text-slate-600">
          Defina quando o contrato começa. A data final será calculada para
          você.
        </p>
      </div>

      {renderContent()}
    </div>
  );
};

export default SelectDatesStep;
