"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Eye, EyeOff, Lock, Mail, X } from "lucide-react";
import { toast } from "sonner";

import { useLogin } from "@/hooks/api/useAuth";
import { UserLoginType } from "@/models/authentication";
import { useAuthStore } from "@/stores/useAuthStore";

import PWAInstallBanner from "./PWAInstallBanner";

interface LoginModalProps {
  userType: "client" | "professional" | "organization";
  onClose: () => void;
}

export default function LoginModal({ userType, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { mutate: login } = useLogin();
  const { login: loginStore } = useAuthStore();

  const userTypeLabels = {
    client: "Cliente",
    professional: "Profissional",
    organization: "Organização",
  };
  const userTypePaths: Record<
    "client" | "professional" | "organization",
    UserLoginType
  > = {
    client: "clients",
    professional: "professionals",
    organization: "organizations",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    login(
      { email, password, userType: userTypePaths[userType] },
      {
        onSuccess: (response) => {
          loginStore(response);
          toast.success(`Bem-vindo, ${response.firstName}!`);
          router.push("/dashboard");
        },
        onSettled: () => {
          setIsLoading(false);
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );

    // Redirecionar para dashboard
    // router.push("/dashboard");
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);

    // Simular login com Google
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    // Redirecionar para dashboard
    router.push("/dashboard");
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Login - {userTypeLabels[userType]}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Entre com suas credenciais
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-500" />
          </button>
        </div>

        {/* PWA Install Banner */}
        <div className="px-6 pb-4">
          <PWAInstallBanner variant="card" />
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Senha
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-4 text-sm text-slate-500">ou</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          {/* Google Login */}
        </div>
      </div>
    </div>
  );
}
