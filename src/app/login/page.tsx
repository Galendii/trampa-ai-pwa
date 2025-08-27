"use client";

import React, { useMemo, useState } from "react";

import { ArrowRight, User, UserCheck } from "lucide-react";

// Import the new wizard configurations and the Zustand store
import {
  ClientSignupWizardConfig,
  ProfessionalSignupWizardConfig,
} from "@/components/signup/SignupWizard";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { WizardHost } from "@/components/ui/Wizard";
import { useWizardStore } from "@/stores/useWizardStore";

import LoginModal from "../../components/LoginModal";

import LoginHeader from "./components/login-header";

type UserType = "client" | "professional" | null;

const LoginPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>(null);

  // Get the startWizard function from the store
  const startWizard = useWizardStore((state) => state.startWizard);

  const handleUserTypeSelect = (
    userType: "client" | "professional",
    action: "login" | "signup"
  ) => {
    setSelectedUserType(userType);
    if (action === "login") {
      setShowLoginModal(true);
    } else {
      // Start the correct wizard based on the user type
      if (userType === "client") {
        startWizard(ClientSignupWizardConfig);
      } else if (userType === "professional") {
        startWizard(ProfessionalSignupWizardConfig);
      }
    }
  };

  const userTypes = useMemo(
    () => [
      {
        id: "client" as const,
        title: "Cliente",
        description: "Acesse sua agenda, planos e acompanhe seu progresso",
        icon: User,
        color: "from-blue-500 to-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        hoverColor: "hover:border-blue-300",
        iconColor: "text-blue",
      },
      {
        id: "professional" as const,
        title: "Profissional",
        description:
          "Gerencie seus clientes, agenda e crescimento profissional",
        icon: UserCheck,
        color: "from-emerald-500 to-emerald-600",
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        hoverColor: "hover:border-emerald-300",
        iconColor: "text-emerald",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <LoginHeader />
        <div className="grid md:grid-cols-2 gap-6 mb-6 sm:mb-8">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <Card.Root
                key={type.id}
                borderColor={type.borderColor}
                hoverColor={type.hoverColor}
              >
                <Card.Icon
                  bgColor={type.bgColor}
                  Icon={Icon}
                  iconClassName={type.iconColor}
                />
                <Card.Header
                  title={type.title}
                  description={type.description}
                />
                <Card.Footer>
                  <Button
                    onClick={() => handleUserTypeSelect(type.id, "login")}
                    className={`w-full bg-gradient-to-r ${type.color} text-white`}
                  >
                    <span>Fazer Login</span>
                    <ArrowRight size={14} />
                  </Button>
                  <Button
                    onClick={() => handleUserTypeSelect(type.id, "signup")}
                    variant="outline"
                    className="w-full"
                  >
                    Criar Conta
                  </Button>
                </Card.Footer>
              </Card.Root>
            );
          })}
        </div>
      </div>

      {showLoginModal && selectedUserType && (
        <LoginModal
          userType={selectedUserType}
          onClose={() => {
            setShowLoginModal(false);
            setSelectedUserType(null);
          }}
        />
      )}
      <WizardHost />
    </div>
  );
};
export default LoginPage;
