"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, FileText, Loader2 } from "lucide-react";

// UI Components
import { Input } from "@/components/ui/Input";
import Button from "@/components/ui/Button";

// Hooks & API
import { useClientRegister } from "@/hooks/api/professional/useClients";

// --- Zod Validation Schema ---
const ClientPreSignSchema = z.object({
  firstName: z.string().min(2, "Nome é obrigatório"),
  lastName: z.string().min(2, "Sobome é obrigatório"),
  email: z.string().email("Formato de e-mail inválido"),
  phone: z.string().refine((val) => val.replace(/\D/g, "").length >= 10, {
    message: "Telefone deve ter no mínimo 10 dígitos",
  }),
  cpf: z.string().refine((val) => val.replace(/\D/g, "").length === 11, {
    message: "CPF deve ter 11 dígitos",
  }),
});

type ClientPreSignFormData = z.infer<typeof ClientPreSignSchema>;

// --- Helper functions for input masking ---
const formatCPF = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .slice(0, 14);
};

const formatPhone = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);
};


interface ClientPreSignModalProps {
  onClose: () => void;
  onSuccess?: () => void;
}

const ClientPreSignModal: React.FC<ClientPreSignModalProps> = ({ onClose, onSuccess }) => {
  const { mutate: registerClient, isPending } = useClientRegister();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientPreSignFormData>({
    resolver: zodResolver(ClientPreSignSchema),
  });

  const onSubmit = (data: ClientPreSignFormData) => {
    registerClient(data, {
      onSuccess: () => {
        onSuccess?.();
        onClose();
      },
    });
  };

  return (
    // The form is now the root element, to be placed inside your generic Modal
    <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header Content */}
        <div>
            <h2 className="text-xl font-bold text-slate-800">
                Pré-Cadastro de Cliente
            </h2>
            <p className="text-sm text-slate-600 mt-1">
                Insira os dados básicos do cliente. Ele receberá um convite para completar o cadastro e definir uma senha.
            </p>
        </div>
        
        {/* Body Content */}
        <div className="space-y-4 my-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                    label="Nome"
                    placeholder="João"
                    leftIcon={<User size={18} />}
                    error={errors.firstName?.message}
                    {...register("firstName")}
                />
                <Input
                    label="Sobrenome"
                    placeholder="Silva"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                />
            </div>
            <Input
                label="E-mail"
                type="email"
                placeholder="joao.silva@email.com"
                leftIcon={<Mail size={18} />}
                error={errors.email?.message}
                {...register("email")}
            />
            <Input
                label="Telefone"
                placeholder="(11) 99999-9999"
                leftIcon={<Phone size={18} />}
                error={errors.phone?.message}
                {...register("phone", {
                    onChange: (e) => { e.target.value = formatPhone(e.target.value); }
                })}
            />
            <Input
                label="CPF"
                placeholder="000.000.000-00"
                leftIcon={<FileText size={18} />}
                error={errors.cpf?.message}
                {...register("cpf", {
                    onChange: (e) => { e.target.value = formatCPF(e.target.value); }
                })}
            />
        </div>

        {/* Footer Content */}
        <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
                Cancelar
            </Button>
            <Button type="submit" disabled={isPending}>
                {isPending ? (
                <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Cadastrando...
                </>
                ) : (
                "Pré-Cadastrar Cliente"
                )}
            </Button>
        </div>
    </form>