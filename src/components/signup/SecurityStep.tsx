"use client";

import { Lock, Eye, EyeOff, Shield } from "lucide-react";
import { useState } from "react";
import { Input } from "../ui/Input";
import { useWizard } from "@/contexts/WizardContext";

const SecurityStep = () => {
  const { updateFormData, formData, errors, setErrors } = useWizard();
  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 mb-2">Segurança</h3>
        <p className="text-slate-600">
          Crie uma senha segura para proteger sua conta
        </p>
      </div>

      <div className="relative">
        <Input
          label="Senha"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={(e) => updateFormData("password", e.target.value)}
          placeholder="••••••••"
          leftIcon={<Lock size={18} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          error={errors?.password}
          required
        />
        <p className="text-xs text-slate-500 mt-1">Mínimo 8 caracteres</p>
      </div>

      <div className="relative">
        <Input
          label="Confirmar Senha"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.passwordConfirmation}
          onChange={(e) =>
            updateFormData("passwordConfirmation", e.target.value)
          }
          placeholder="••••••••"
          leftIcon={<Lock size={18} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          }
          error={errors?.passwordConfirmation}
          required
        />
        {formData.passwordConfirmation &&
          formData.password !== formData.passwordConfirmation && (
            <p className="text-xs text-red-500 mt-1">As senhas não coincidem</p>
          )}
      </div>

      {/* Password Strength Indicator */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-700">Força da senha:</p>
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`h-2 flex-1 rounded-full ${
                formData.senha.length >= level * 2
                  ? level <= 2
                    ? "bg-red-400"
                    : level === 3
                    ? "bg-yellow-400"
                    : "bg-emerald-400"
                  : "bg-slate-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityStep;
