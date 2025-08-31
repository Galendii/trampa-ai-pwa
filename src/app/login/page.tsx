"use client";

import React, { useMemo } from "react";

import { User, UserCheck } from "lucide-react";
import { toast } from "sonner";

import Card from "@/components/ui/Card";
import GoogleLoginButton from "@/components/ui/GoogleLoginButton";
import { GoogleAuthenticationModel } from "@/models/authentication";
import { useAuthStore } from "@/stores/useAuthStore";
import { useUserStore } from "@/stores/useUserStore";

import LoginHeader from "./components/login-header";

type UserType = "client" | "professional";

const LoginPage = () => {
  const { login } = useAuthStore();
  const { setUser } = useUserStore();

  // This function will be called on successful Google Sign-In
  const handleLoginSuccess = (auth: GoogleAuthenticationModel) => {
    // Redirect to the dashboard where the OnboardingGate will take over.
    console.log(auth);
    setUser(auth.user);
    login(auth);
    window.location.pathname = "/dashboard";
  };

  const userTypes = useMemo(
    () => [
      {
        id: "client" as const,
        title: "Sou Cliente",
        description: "Acesse sua agenda, planos e acompanhe seu progresso.",
        icon: User,
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        hoverColor: "hover:border-blue-300",
        iconColor: "text-blue-600",
      },
      {
        id: "professional" as const,
        title: "Sou Profissional",
        description:
          "Gerencie seus clientes, agenda e crescimento profissional.",
        icon: UserCheck,
        bgColor: "bg-emerald-50",
        borderColor: "border-emerald-200",
        hoverColor: "hover:border-emerald-300",
        iconColor: "text-emerald-600",
      },
    ],
    []
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <LoginHeader />
        <div className="grid md:grid-cols-2 gap-6 mb-6 sm:mb-8">
          {userTypes.map((type) => (
            <Card.Root
              key={type.id}
              borderColor={type.borderColor}
              hoverColor={type.hoverColor}
            >
              <Card.Icon
                Icon={type.icon}
                bgColor={type.bgColor}
                iconClassName={type.iconColor}
              />
              <Card.Header title={type.title} description={type.description} />
              <Card.Footer>
                <GoogleLoginButton
                  onError={({ message }) => toast.error(String(message))}
                  roleIntent={type.id}
                  onSuccess={handleLoginSuccess}
                />
              </Card.Footer>
            </Card.Root>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
