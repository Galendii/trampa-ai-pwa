"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  User,
  HandshakeIcon,
  ClipboardList,
  Calendar,
  Clock,
  FileText,
  CreditCard,
  Check,
  FileCheck,
} from "lucide-react";
import { toast } from "sonner";

// Wizard Components & Context
import { useWizard, WizardProvider } from "@/contexts/WizardContext";
import {
  Wizard,
  WizardContent,
  WizardFooter,
  WizardHeader,
  WizardStep,
} from "@/components/ui/Wizard";

// API & Models
import { useCreateServiceContract } from "@/hooks/api/professional/useServiceContracts";
import {
  CreateContractFormData,
  PaymentMethods,
  ServiceContractModel,
  ServiceContractStatus,
} from "@/models/service-contract";

import { SelectOption } from "../ui/Select";

import {
  SelectClientStep,
  SelectServiceStep,
  SelectPlanStep,
  SelectDatesStep,
  AttendanceStep,
  TermsStep,
  PaymentStep,
  SuccessStep,
  PreviewStep,
} from "./steps";

// --- Wizard Step Definitions ---
const CONTRACT_STEPS = [
  { id: "client", title: "Cliente", icon: User },
  { id: "service", title: "Serviço", icon: HandshakeIcon },
  { id: "plan", title: "Plano", icon: ClipboardList },
  { id: "dates", title: "Período", icon: Calendar },
  { id: "attendance", title: "Frequência", icon: Clock },
  { id: "terms", title: "Termos", icon: FileText },
  { id: "payment", title: "Pagamento", icon: CreditCard },
  { id: "preview", title: "Prévia", icon: FileCheck },
  { id: "success", title: "Sucesso", icon: Check },
];
export const PAYMENT_METHOD_OPTIONS: SelectOption[] = [
  { value: PaymentMethods.CREDIT_CARD, label: "Cartão de Crédito" },
  { value: PaymentMethods.DEBIT_CARD, label: "Cartão de Débito" },
  { value: PaymentMethods.PIX, label: "PIX" },
  { value: PaymentMethods.CASH, label: "Dinheiro" },
];

interface CreateContractWizardProps {
  onClose: () => void;
}

const CreateContractWizard: React.FC<CreateContractWizardProps> = ({
  onClose,
}) => {
  const { mutate: createContract, isPending } = useCreateServiceContract();

  // --- Initial Form State for the Wizard ---
  const initialFormData = useMemo<CreateContractFormData>(
    () => ({
      client: "",
      service: "",
      plan: "",
      startingDate: new Date().toISOString().substring(0, 10),
      endingDate: new Date().toISOString().substring(0, 10),
      attendance: [],
      status: ServiceContractStatus.PENDING_SIGNATURE,
      rescheduleTerms: "",
      cancellationTerms: "",
      paymentMethod: "",
      professional: "",
      installmentAmount: 0,
      firstPaymentDate: new Date().toISOString().substring(0, 10),
      installments: 0,
    }),
    []
  );

  // --- Final Submission Logic ---
  const handleSubmit = (formData: CreateContractFormData) => {
    // Here you would transform formData into the ServiceContractModel payload

    createContract(formData, {
      onSuccess: () => {
        toast.success("Contrato criado com sucesso!");
        setTimeout(() => {
          onClose();
        }, 2000);
      },
      onError: (error) => {
        console.error(error);
        toast.error(`Erro ao criar contrato: ${error.message}`);
      },
    });
  };

  return (
    <WizardProvider steps={CONTRACT_STEPS} initialFormData={initialFormData}>
      <WizardWrapper
        onClose={onClose}
        onSubmit={handleSubmit}
        isSubmitting={isPending}
      />
    </WizardProvider>
  );
};

// --- Inner component to access Wizard context ---
const WizardWrapper = ({
  onClose,
  onSubmit,
  isSubmitting,
}: {
  onClose: () => void;
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}) => {
  const { formData, nextStep, isLastStep, currentStepId } = useWizard();

  const handleNext = () => {
    // Here you can add validation logic for each step before calling nextStep()
    if (currentStepId === "preview") {
      onSubmit(formData);
      nextStep();
    }
    nextStep();
  };

  return (
    <Wizard className="flex flex-col h-full justify-items-stretch">
      <WizardHeader className="p-6 border-b" />
      <WizardContent className="flex-1 overflow-y-auto md:p-4">
        <WizardStep stepId="client">
          <SelectClientStep />
        </WizardStep>
        <WizardStep stepId="service">
          <SelectServiceStep />
        </WizardStep>
        <WizardStep stepId="plan">
          <SelectPlanStep />
        </WizardStep>
        <WizardStep stepId="dates">
          <SelectDatesStep />
        </WizardStep>
        <WizardStep stepId="attendance">
          <AttendanceStep />
        </WizardStep>
        <WizardStep stepId="terms">
          <TermsStep />
        </WizardStep>
        <WizardStep stepId="payment">
          <PaymentStep />
        </WizardStep>
        <WizardStep stepId="preview">
          <PreviewStep />
        </WizardStep>
        <WizardStep stepId="success">
          <SuccessStep />
        </WizardStep>
      </WizardContent>

      {/* {currentStepId !== "success" && ( */}
      <WizardFooter
        className="p-6 border-t"
        onNext={handleNext}
        isLoading={isSubmitting}
        finishLabel="Criar Contrato"
      />
      {/* )} */}
    </Wizard>
  );
};

export default CreateContractWizard;
