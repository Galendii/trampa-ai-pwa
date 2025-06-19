"use client";

import { useState } from "react";
import { X, User, Lock, FileText, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useWizard } from "@/contexts/WizardContext";
import {
  Wizard,
  WizardHeader,
  WizardContent,
  WizardStep,
  WizardFooter,
} from "./ui/Wizard";
import PersonalInfoStep from "./signup/PersonalInfoStep";
import SecurityStep from "./signup/SecurityStep";
import DocumentationStep from "./signup/DocumentationStep";
import SuccessStep from "./signup/SuccessStep";
import { useToast } from "@/contexts/ToastContext";

interface SignupWizardProps {
  userType: "cliente" | "profissional" | "organizacao";
  onClose: () => void;
}

interface FormData {
  // Step 1
  nome: string;
  sobrenome: string;
  email: string;
  telefone: string;
  // Step 2
  senha: string;
  confirmacaoSenha: string;
  // Step 3
  documento: string;
  tipoDocumento: "cpf" | "cnpj";
  nomeEmpresa?: string;
}

export const SIGNUP_STEPS = [
  { id: "personal", title: "Dados Pessoais", icon: User },
  { id: "security", title: "Segurança", icon: Lock },
  { id: "documentation", title: "Documentação", icon: FileText },
  { id: "success", title: "Sucesso", icon: Check },
];

export default function SignupWizard({ userType, onClose }: SignupWizardProps) {
  const { currentStepId, nextStep, prevStep } = useWizard();
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    sobrenome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmacaoSenha: "",
    documento: "",
    tipoDocumento: "cpf",
    nomeEmpresa: "",
  });
  const router = useRouter();

  const userTypeLabels = {
    cliente: "Cliente",
    profissional: "Profissional",
    organizacao: "Organização",
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 0: // Personal Info
        if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório";
        if (!formData.sobrenome.trim())
          newErrors.sobrenome = "Sobrenome é obrigatório";
        if (!formData.email.trim()) newErrors.email = "E-mail é obrigatório";
        else if (!/\S+@\S+\.\S+/.test(formData.email))
          newErrors.email = "E-mail inválido";
        if (!formData.telefone.trim())
          newErrors.telefone = "Telefone é obrigatório";
        break;

      case 1: // Security
        if (!formData.senha) newErrors.senha = "Senha é obrigatória";
        else if (formData.senha.length < 8)
          newErrors.senha = "Senha deve ter pelo menos 8 caracteres";
        if (!formData.confirmacaoSenha)
          newErrors.confirmacaoSenha = "Confirmação de senha é obrigatória";
        else if (formData.senha !== formData.confirmacaoSenha)
          newErrors.confirmacaoSenha = "As senhas não coincidem";
        break;

      case 2: // Documentation
        if (!formData.documento.trim())
          newErrors.documento = "Documento é obrigatório";
        if (formData.tipoDocumento === "cnpj" && !formData.nomeEmpresa?.trim())
          newErrors.nomeEmpresa = "Nome da empresa é obrigatório";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (
      !validateStep(SIGNUP_STEPS.findIndex((step) => step.id === currentStepId))
    ) {
      return;
    }

    const currentStepIndex = SIGNUP_STEPS.findIndex(
      (step) => step.id === currentStepId
    );
    if (currentStepIndex < SIGNUP_STEPS.length - 2) {
      // Changed from < 2 to < SIGNUP_STEPS.length - 2 to account for 0-indexed steps and the success step (last step)
      nextStep();
    } else {
      // Final step - submit form
      await handleSubmit();
    }
  };

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

  const canProceed = () => {
    const currentStepIndex = SIGNUP_STEPS.findIndex(
      (step) => step.id === currentStepId
    );

    switch (currentStepIndex) {
      case 0:
        return (
          formData.nome &&
          formData.sobrenome &&
          formData.email &&
          formData.telefone
        );
      case 1:
        return (
          formData.senha &&
          formData.confirmacaoSenha &&
          formData.senha === formData.confirmacaoSenha &&
          formData.senha.length >= 8
        );
      case 2:
        return (
          formData.documento &&
          (formData.tipoDocumento === "cpf" || formData.nomeEmpresa)
        );
      default:
        return false;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-800">
              Criar Conta - {userTypeLabels[userType]}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Preencha os dados para criar sua conta
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* Wizard Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-8rem)]">
          <Wizard steps={SIGNUP_STEPS}>
            <WizardHeader />

            <WizardContent>
              <WizardStep stepId="personal">
                <PersonalInfoStep
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              </WizardStep>

              <WizardStep stepId="security">
                <SecurityStep
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              </WizardStep>

              <WizardStep stepId="documentation">
                <DocumentationStep
                  formData={formData}
                  updateFormData={updateFormData}
                  errors={errors}
                />
              </WizardStep>

              <WizardStep stepId="success">
                <SuccessStep userName={formData.nome} />
              </WizardStep>
            </WizardContent>

            {currentStepId !== "success" && (
              <WizardFooter
                onNext={handleNext}
                onPrev={prevStep}
                nextDisabled={!canProceed()}
                isLoading={isLoading}
                finishLabel="Criar Conta"
              />
            )}
          </Wizard>
        </div>
      </div>
    </div>
  );
}
