import { Check, FileText, Lock, User } from "lucide-react";
import { toast } from "sonner";

// Import API, Models, and Step Components
import { createUser } from "@/api/users";
import { UserModel } from "@/models/user";
import { WizardConfig } from "@/stores/useWizardStore";

import {
  DocumentationStep,
  PersonalInfoStep,
  SecurityStep,
  SuccessStep,
} from "./";

// --- Base onSubmit Logic ---
const handleSignupSubmit = async (formData: Record<string, any>) => {
  try {
    // Here you would adapt the formData to match the createUser API payload
    const userData = { ...formData } as Partial<UserModel>;
    await createUser(userData);
    toast.success("Conta criada com sucesso!");
  } catch (error: any) {
    toast.error(`Erro ao criar conta: ${error.message}`);
    throw error; // Re-throw to be handled by the store
  }
};

// --- Client Signup Configuration ---
export const ClientSignupWizardConfig: WizardConfig = {
  initialFormData: {
    role: "client",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cpf: "",
  },
  steps: [
    {
      id: "personal",
      title: "Dados Pessoais",
      icon: User,
      component: PersonalInfoStep,
    },
    { id: "security", title: "Segurança", icon: Lock, component: SecurityStep },
    {
      id: "documentation",
      title: "Documentos",
      icon: FileText,
      component: DocumentationStep,
    },
    {
      id: "success",
      title: "Sucesso",
      icon: Check,
      component: SuccessStep as React.FC,
    },
  ],
  onSubmit: handleSignupSubmit,
};

// --- Professional Signup Configuration ---
export const ProfessionalSignupWizardConfig: WizardConfig = {
  initialFormData: {
    role: "professional",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cpf: "",
    planId: null,
  },
  steps: [
    // {
    //   id: "plan",
    //   title: "Plano",
    //   icon: ClipboardList,
    //   component: PlanSelectionStep,
    // },
    {
      id: "personal",
      title: "Dados Pessoais",
      icon: User,
      component: PersonalInfoStep,
    },
    { id: "security", title: "Segurança", icon: Lock, component: SecurityStep },
    {
      id: "documentation",
      title: "Documentos",
      icon: FileText,
      component: DocumentationStep,
    },
    {
      id: "success",
      title: "Sucesso",
      icon: Check,
      component: SuccessStep as React.FC,
    },
  ],
  onSubmit: handleSignupSubmit,
};
