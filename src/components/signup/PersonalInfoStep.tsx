"use client";

import { FileText, Mail, Phone, User } from "lucide-react";

// Import the Zustand store to get and update global state
import { useWizardStore } from "@/stores/useWizardStore";

import { Input } from "../ui/Input";

// --- Helper functions for input masking ---
const formatCPF = (value: string) => {
  return (value || "")
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .slice(0, 14);
};

const formatPhone = (value: string) => {
  return (value || "")
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};

const PersonalInfoStep = () => {
  // Get state and the update function from the Zustand store
  const { formData, updateFormData, errors } = useWizardStore();

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Complete Seus Dados
        </h3>
        <p className="text-slate-600">
          Confirme suas informações e preencha os campos restantes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* These fields are disabled as they come from Google */}
        <Input
          label="Nome"
          value={formData.firstName || ""}
          readOnly
          disabled
        />
        <Input
          label="Sobrenome"
          value={formData.lastName || ""}
          readOnly
          disabled
        />
      </div>

      <Input
        label="E-mail"
        type="email"
        value={formData.email || ""}
        readOnly
        disabled
        leftIcon={<Mail size={18} />}
      />

      {/* These fields are editable and will be validated */}
      <Input
        label="Telefone"
        type="tel"
        value={formatPhone(formData.phone)}
        onChange={(e) => updateFormData("phone", e.target.value)}
        placeholder="(11) 99999-9999"
        leftIcon={<Phone size={18} />}
        error={errors?.phone}
        required
      />
      <Input
        label="CPF"
        value={formatCPF(formData.cpf)}
        onChange={(e) => updateFormData("cpf", e.target.value)}
        placeholder="000.000.000-00"
        leftIcon={<FileText size={18} />}
        error={errors?.cpf}
        required
      />
    </div>
  );
};
export default PersonalInfoStep;
