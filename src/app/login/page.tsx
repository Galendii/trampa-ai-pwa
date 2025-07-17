"use client";

import React, { useState, useMemo } from "react";
import { Building2, User, UserCheck, ArrowRight } from "lucide-react";
import LoginModal from "../../components/LoginModal";
import SignupWizard, {
  CLIENT_STEPS,
  ORGANIZATION_STEPS,
  PROFESSIONAL_STEPS,
} from "../../components/SignupWizard";
import { WizardProvider } from "@/contexts/WizardContext";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import LoginHeader from "./components/login-header";
import Features from "./components/features";

type UserType = "client" | "professional" | "organization" | null;

const LoginPage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupWizard, setShowSignupWizard] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<UserType>("client");
  // const [windowWidth, setWindowWidth] = useState(0);

  const initialFormData = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirmation: "",
      cpf: "",
      cnpj: "",
      companyName: "",
      productId: null,
      role: selectedUserType ?? "client",
    }),
    [selectedUserType]
  );
  const SIGNUP_STEPS = useMemo(() => {
    if (selectedUserType === "client") {
      return CLIENT_STEPS;
    }
    if (selectedUserType === "professional") {
      return PROFESSIONAL_STEPS;
    }
    if (selectedUserType === "organization") {
      return ORGANIZATION_STEPS;
    }
    return CLIENT_STEPS;
  }, [selectedUserType]);

  // Handle window resize
  // useEffect(() => {
  //   const handleResize = () => {
  //     setWindowWidth(window.innerWidth);
  //   };

  //   if (typeof window !== "undefined") {
  //     setWindowWidth(window.innerWidth);
  //     window.addEventListener("resize", handleResize);
  //   }

  //   return () => {
  //     if (typeof window !== "undefined") {
  //       window.removeEventListener("resize", handleResize);
  //     }
  //   };
  // }, []);

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
  const userTypes = useMemo(
    () => [
      {
        id: "cliente" as const,
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
        id: "profissional" as const,
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
      {
        id: "organizacao" as const,
        title: "Organização",
        description: "Administre sua equipe, profissionais e operação completa",
        icon: Building2,
        color: "from-purple-500 to-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        hoverColor: "hover:border-purple-300",
        iconColor: "text-purple",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <LoginHeader />

        {/* User Type Cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
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
                    className={`
                        w-full bg-gradient-to-r ${type.color} text-white 
                      `}
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

        {/* Features */}
        <Features />
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
        <WizardProvider initialFormData={initialFormData} steps={SIGNUP_STEPS}>
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
};
export default LoginPage;
