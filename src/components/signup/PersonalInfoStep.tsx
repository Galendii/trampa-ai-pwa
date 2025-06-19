"use client"

import { Mail, Phone, User } from "lucide-react"
import { Input } from "../ui/Input"

interface PersonalInfoStepProps {
  formData: {
    nome: string
    sobrenome: string
    email: string
    telefone: string
  }
  updateFormData: (field: string, value: string) => void
  errors?: Record<string, string>
}

export default function PersonalInfoStep({ formData, updateFormData, errors }: PersonalInfoStepProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Dados Pessoais</h3>
        <p className="text-slate-600">Vamos começar com suas informações básicas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nome"
          value={formData.nome}
          onChange={(e) => updateFormData("nome", e.target.value)}
          placeholder="João"
          error={errors?.nome}
          required
        />
        <Input
          label="Sobrenome"
          value={formData.sobrenome}
          onChange={(e) => updateFormData("sobrenome", e.target.value)}
          placeholder="Silva"
          error={errors?.sobrenome}
          required
        />
      </div>

      <Input
        label="E-mail"
        type="email"
        value={formData.email}
        onChange={(e) => updateFormData("email", e.target.value)}
        placeholder="joao@email.com"
        leftIcon={<Mail size={18} />}
        error={errors?.email}
        required
      />

      <Input
        label="Telefone"
        type="tel"
        value={formData.telefone}
        onChange={(e) => updateFormData("telefone", e.target.value)}
        placeholder="(11) 99999-9999"
        leftIcon={<Phone size={18} />}
        error={errors?.telefone}
        required
      />
    </div>
  )
}
