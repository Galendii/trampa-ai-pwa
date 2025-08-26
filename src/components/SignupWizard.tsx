import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Check, ClipboardList, FileText, Lock, User, X } from "lucide-react";

import LoginHeader from "@/app/login/components/login-header";
import { useToast } from "@/contexts/ToastContext";
import { useWizard } from "@/contexts/WizardContext";

import Features from "./landing/Features";
import {
  DocumentationStep,
  PersonalInfoStep,
  PlanSelectionStep,
  SecurityStep,
  SuccessStep,
} from "./signup/";
import {
  Wizard,
  WizardContent,
  WizardFooter,
  WizardHeader,
  WizardStep,
} from "./Wizard";

interface SignupWizardProps {
  userType: "client" | "professional" | "organization";
  onClose: () => void;
}

export const CLIENT_STEPS = [
  { id: "personal", title: "Dados Pessoais", icon: User },
  { id: "security", title: "Segurança", icon: Lock },
  { id: "documentation", title: "Documentação", icon: FileText },
  { id: "success", title: "Sucesso", icon: Check },
];

export const PROFESSIONAL_STEPS = [
  { id: "plan", title: "Plano", icon: ClipboardList },
  { id: "personal", title: "Dados Pessoais", icon: User },
  { id: "security", title: "Segurança", icon: Lock },
  { id: "documentation", title: "Documentação", icon: FileText },
  { id: "success", title: "Sucesso", icon: Check },
];

export const ORGANIZATION_STEPS = [
  { id: "personal", title: "Dados Pessoais", icon: User },
  { id: "security", title: "Segurança", icon: Lock },
  { id: "documentation", title: "Documentação", icon: FileText },
  { id: "plan", title: "Plano", icon: ClipboardList },
  { id: "success", title: "Sucesso", icon: Check },
];

const SignupWizard = ({ userType, onClose }: SignupWizardProps) => {
  const { currentStepId, nextStep, prevStep, formData, isLastStep } =
    useWizard();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      // Simular cadastro
      await new Promise((resolve) => setTimeout(resolve, 2000));
      addToast("Conta criada com sucesso", "success");
      nextStep(); // Go to success step

      // Redirecionar após 3 segundos
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Erro no cadastro:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleNext = async () => {
    if (isLastStep) {
      await handleSubmit();
      return;
    }
    nextStep();
    return;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-95vh overflow-hidden">
        {/* Wizard Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-8rem)]">
          <Wizard>
            <WizardHeader />

            <WizardContent>
              <WizardStep stepId="personal">
                <PersonalInfoStep />
              </WizardStep>

              <WizardStep stepId="security">
                <SecurityStep />
              </WizardStep>

              <WizardStep stepId="documentation">
                <DocumentationStep />
              </WizardStep>
              <WizardStep stepId="plan">
                <PlanSelectionStep />
              </WizardStep>

              <WizardStep stepId="success">
                <SuccessStep userName={formData.firstName} />
              </WizardStep>
            </WizardContent>

            {currentStepId !== "success" && (
              <WizardFooter
                onNext={handleNext}
                onPrev={prevStep}
                // nextDisabled={!canProceed()}
                isLoading={isLoading}
                finishLabel="Criar Conta"
              />
            )}
          </Wizard>
        </div>
      </div>
    </div>
  );
};
export default SignupWizard;
