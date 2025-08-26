"use client";

import { Check, Loader2, Sparkles } from "lucide-react";

// Hooks & Context
import { useWizard } from "@/contexts/WizardContext";
import { useGetByClientId } from "@/hooks/api/professional/useClients";

const SuccessStep = () => {
  const { formData } = useWizard();
  const { data: client, isLoading } = useGetByClientId(formData.clientId);

  const clientName = isLoading
    ? "..."
    : `${client?.firstName} ${client?.lastName}`;

  return (
    <div className="text-center py-8">
      <div className="relative mb-6">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-10 h-10 text-emerald-600" />
        </div>
        <div className="absolute -top-2 -right-2 animate-ping">
          <Sparkles className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 mb-4">
        Contrato Criado com Sucesso!
      </h3>
      <p className="text-slate-600 mb-6">
        O contrato para <strong>{clientName}</strong> foi criado. Você será
        redirecionado em instantes.
      </p>

      <div className="flex items-center justify-center space-x-2">
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        />
        <div
          className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        />
      </div>
    </div>
  );
};

export default SuccessStep;
