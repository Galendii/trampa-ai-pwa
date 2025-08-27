"use client";

import { FileText } from "lucide-react";

import { useWizardStore } from "@/stores/useWizardStore";

import { Input } from "../ui/Input";

const DocumentationStep: React.FC = () => {
  const { updateFormData, formData } = useWizardStore();
  const formatCpf = (value: string) => {
    if (!value) return value;
    const numbers = value.replace(/\D/g, "");

    return numbers
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  const formatCnpj = (value: string) => {
    if (!value) return value;
    const numbers = value.replace(/\D/g, "");

    return numbers
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">
          Documentação
        </h3>
        <p className="text-slate-600">Precisamos validar sua identidade</p>
      </div>

      {/* <div>
        <label
          htmlFor="tipoDocumento"
          className="block text-sm font-medium text-slate-700 mb-3"
        >
          Tipo de Documento
        </label>
        <div className="grid grid-cols-2 gap-4">
          <Button
            type="button"
            variant={formData.tipoDocumento === "cpf" ? "default" : "outline"}
            onClick={() => updateFormData("tipoDocumento", "cpf")}
            className="h-12"
          >
            CPF
          </Button>
          <Button
            type="button"
            variant={formData.tipoDocumento === "cnpj" ? "default" : "outline"}
            onClick={() => updateFormData("tipoDocumento", "cnpj")}
            className="h-12"
          >
            CNPJ
          </Button>
        </div>
      </div> */}

      <Input
        label="CPF"
        value={formatCpf(formData.cpf)}
        onChange={(e) => updateFormData("cpf", e.target.value)}
        placeholder={"000.000.000-00"}
        // error={errors?.documento}
        required
      />

      <Input
        label="CNPJ"
        value={formatCnpj(formData.cnpj)}
        onChange={(e) => updateFormData("cnpj", e.target.value)}
        placeholder={"00.000.000/0000-00"}
        // error={errors?.documento}
        required
      />

      {/* {formData.tipoDocumento === "cnpj" && (
        <Input
          label="Nome da Empresa"
          value={formData.nomeEmpresa || ""}
          onChange={(e) => updateFormData("nomeEmpresa", e.target.value)}
          placeholder="Nome da sua empresa"
          leftIcon={<Building2 size={18} />}
          // error={errors?.nomeEmpresa}
          required
        />
      )} */}
    </div>
  );
};
export default DocumentationStep;
