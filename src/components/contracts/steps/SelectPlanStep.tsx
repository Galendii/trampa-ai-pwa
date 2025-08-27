"use client";

import React from "react";

import { CheckCircle, ClipboardList, Loader2 } from "lucide-react";

// Hooks & Context
import { useGetPlans } from "@/hooks/api/professional/usePlans";
import { cn } from "@/lib/utils";
// Models
import { PlanModel } from "@/models/plan";
import { useWizardStore } from "@/stores/useWizardStore";

const SelectPlanStep = () => {
  const { formData, updateFormData } = useWizardStore();
  const serviceId = formData.service;

  const { data: plansData, isLoading, isError } = useGetPlans(serviceId); // Query is enabled only if a serviceId exists

  const plans = (plansData as any)?.results || [];

  const handleSelectPlan = (plan: PlanModel) => {
    updateFormData("plan", plan.id);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <span className="ml-3 text-slate-600">Carregando planos...</span>
        </div>
      );
    }

    if (isError) {
      return (
        <p className="text-center text-red-500 py-8">
          Ocorreu um erro ao carregar os planos.
        </p>
      );
    }

    if (!serviceId) {
      return (
        <p className="text-center text-slate-500 py-8">
          Por favor, volte e selecione um serviço primeiro.
        </p>
      );
    }

    if (plans.length === 0) {
      return (
        <p className="text-center text-slate-500 py-8">
          Nenhum plano encontrado para este serviço.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 md:gap-4">
        {plans.map((plan: PlanModel) => {
          const isSelected = formData.planId === plan.id;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => handleSelectPlan(plan)}
              className={cn(
                "p-4 border-2 rounded-lg text-left transition-all duration-200 relative w-[90%] mx-auto md:w-full",
                isSelected
                  ? "border-blue-600 bg-blue-50 scale-105"
                  : "border-slate-300 hover:border-blue-400"
              )}
            >
              {isSelected && (
                <CheckCircle className="w-5 h-5 text-white bg-blue-600 rounded-full absolute -top-2 -right-2" />
              )}
              <h4 className="font-bold text-slate-800">{plan.name}</h4>
              <p className="text-sm text-slate-600 mt-1">
                {plan.frequency}x por semana / Duração: {plan.duration} meses
              </p>
              <p className="text-lg font-semibold text-slate-900 mt-2">
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(plan.price)}
              </p>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ClipboardList className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Selecionar Plano
        </h3>
        <p className="text-slate-600">
          Escolha o plano que melhor se encaixa neste contrato.
        </p>
      </div>

      {renderContent()}
    </div>
  );
};

export default SelectPlanStep;
