"use client";

import React from "react";
import { CreditCard, Loader2 } from "lucide-react";

// Components
import { DatePicker } from "@/components/ui/DatePicker";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

// Hooks & Context
import { useWizard } from "@/contexts/WizardContext";
import { useGetPlanById } from "@/hooks/api/professional/usePlans";
import { PAYMENT_METHOD_OPTIONS } from "../wizard";

const PaymentStep = () => {
  const { formData, updateFormData, errors } = useWizard();
  const { serviceId, planId } = formData;

  const {
    data: selectedPlan,
    isLoading,
    isError,
  } = useGetPlanById(planId, serviceId);

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

    if (!selectedPlan) {
      return (
        <p className="text-center text-slate-500 py-8">
          Por favor, volte e selecione um plano primeiro.
        </p>
      );
    }

    return (
      <div className="space-y-6">
        <div className="p-4 bg-slate-50 rounded-lg border">
          <p className="text-sm text-slate-600">
            Valor total do plano selecionado:
          </p>
          <p className="text-2xl font-bold text-slate-800">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(selectedPlan.price)}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Método de Pagamento"
            options={PAYMENT_METHOD_OPTIONS}
            value={formData.paymentMethod}
            onChange={(value) => updateFormData("paymentMethod", value)}
            placeholder="Selecione o método"
          />
          <DatePicker
            label="Data do Primeiro Pagamento"
            value={
              formData.firstPaymentDate
                ? new Date(formData.firstPaymentDate)
                : undefined
            }
            onChange={(date) => updateFormData("firstPaymentDate", date)}
            fullWidth
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Número de Parcelas"
            type="number"
            placeholder="Ex: 6"
            value={formData.installments || ""}
            onChange={(e) => updateFormData("installments", e.target.value)}
          />
          <Input
            label="Valor da Parcela (R$)"
            type="number"
            placeholder="Ex: 150.00"
            value={formData.installmentAmount || ""}
            onChange={(e) =>
              updateFormData("installmentAmount", e.target.value)
            }
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Detalhes de Pagamento
        </h3>
        <p className="text-slate-600">
          Configure as informações financeiras do contrato.
        </p>
      </div>
      {renderContent()}
    </div>
  );
};

export default PaymentStep;
