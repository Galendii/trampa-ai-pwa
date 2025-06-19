"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  User,
  UserCheck,
  ArrowRight,
  Shield,
  Sparkles,
} from "lucide-react";
import LoginModal from "../../components/LoginModal";
import SignupWizard, { SIGNUP_STEPS } from "../../components/SignupWizard";
import { WizardProvider } from "@/contexts/WizardContext";

type UserType = "cliente" | "profissional" | "organizacao" | null;

export default function LoginPage() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupWizard, setShowSignupWizard] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const userTypes = [
    {
      id: "cliente" as const,
      title: "Cliente",
      description: "Acesse sua agenda, planos e acompanhe seu progresso",
      icon: User,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      hoverColor: "hover:border-blue-300",
    },
    {
      id: "profissional" as const,
      title: "Profissional",
      description: "Gerencie seus clientes, agenda e crescimento profissional",
      icon: UserCheck,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200",
      hoverColor: "hover:border-emerald-300",
    },
    {
      id: "organizacao" as const,
      title: "Organização",
      description: "Administre sua equipe, profissionais e operação completa",
      icon: Building2,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      hoverColor: "hover:border-purple-300",
    },
  ];

  const handleUserTypeSelect = (
    userType: UserType,
    action: "login" | "signup"
  ) => {
    setSelectedUserType(userType);
    if (action === "login") {
      setShowLoginModal(true);
    } else {
      setShowSignupWizard(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex items-center justify-center mb-4 sm:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl sm:text-2xl">
                T
              </span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2 sm:mb-4">
            Bem-vindo ao <span className="text-blue-600">Trampa AI</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Sua gestão, clara como o dia. Escolha como você quer acessar nossa
            plataforma.
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.id}
                className={`
                  relative bg-white rounded-2xl border-2 ${type.borderColor} ${type.hoverColor}
                  transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group
                `}
              >
                <div className="p-4 sm:p-8">
                  <div
                    className={`w-12 h-12 sm:w-16 sm:h-16 ${type.bgColor} rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-slate-700" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">
                    {type.title}
                  </h3>
                  <p className="text-slate-600 mb-4 sm:mb-6 text-sm leading-relaxed">
                    {type.description}
                  </p>

                  <div className="space-y-3">
                    <button
                      onClick={() => handleUserTypeSelect(type.id, "login")}
                      className={`
                        w-full bg-gradient-to-r ${type.color} text-white py-2.5 sm:py-3 px-4 rounded-lg
                        font-medium transition-all duration-200 hover:shadow-md hover:scale-105
                        flex items-center justify-center space-x-2
                      `}
                    >
                      <span>Fazer Login</span>
                      <ArrowRight size={14} />
                    </button>

                    <button
                      onClick={() => handleUserTypeSelect(type.id, "signup")}
                      className="w-full border-2 border-slate-200 text-slate-700 py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
                    >
                      Criar Conta
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-slate-200/60 p-4 sm:p-8">
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">
                Seguro e Confiável
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Seus dados protegidos com criptografia de ponta
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">
                Inteligência Artificial
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                IA para otimizar sua gestão automaticamente
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-slate-800 mb-2 text-sm sm:text-base">
                Gestão Completa
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Tudo que você precisa em uma só plataforma
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showLoginModal && selectedUserType && (
        <LoginModal
          userType={selectedUserType}
          onClose={() => {
            setShowLoginModal(false);
            setSelectedUserType(null);
          }}
        />
      )}

      {showSignupWizard && selectedUserType && (
        <WizardProvider steps={SIGNUP_STEPS}>
          <SignupWizard
            userType={selectedUserType}
            onClose={() => {
              setShowSignupWizard(false);
              setSelectedUserType(null);
            }}
          />
        </WizardProvider>
      )}
    </div>
  );
}
