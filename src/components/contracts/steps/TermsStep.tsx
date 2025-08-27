"use client";

import React from "react";

import { FileText } from "lucide-react";

// Components
import { TextArea } from "@/components/ui/TextArea";
// Hooks & Context
import { useWizardStore } from "@/stores/useWizardStore";

const TermsStep = () => {
  const { formData, updateFormData } = useWizardStore();

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Termos do Contrato
        </h3>
        <p className="text-slate-600">
          Defina as políticas de reagendamento e cancelamento.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="reschedule_terms"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Políticas de Reagendamento
          </label>
          <TextArea
            id="reschedule_terms"
            placeholder="Ex: O cliente pode reagendar com no mínimo 24h de antecedência..."
            rows={4}
            value={formData.rescheduleTerms || ""}
            onChange={(e) => updateFormData("rescheduleTerms", e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="cancellation_terms"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Políticas de Cancelamento
          </label>
          <TextArea
            id="cancellation_terms"
            placeholder="Ex: Em caso de cancelamento, será cobrada uma taxa de 50% do valor restante..."
            rows={4}
            value={formData.cancellationTerms || ""}
            onChange={(e) =>
              updateFormData("cancellationTerms", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default TermsStep;
