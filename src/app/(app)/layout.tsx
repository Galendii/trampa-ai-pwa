"use client";
import type React from "react";
import { Suspense, useEffect, useState } from "react";

import { OnboardingGate } from "@/components/signup/onboarding-gate";
import { useAuthStore } from "@/stores/useAuthStore";
import { useProfessionalStore } from "@/stores/useProfessionalStore";

import Sidebar from "../../components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { fetchProfessional } = useProfessionalStore();
  const { isUserLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isUserLoggedIn) {
      console.error("logout");
    }
  }, [isUserLoggedIn]);

  useEffect(() => {
    fetchProfessional();
  }, [fetchProfessional]);

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        setMobileOpen={setMobileSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <OnboardingGate>{children}</OnboardingGate>
        </main>
      </div>
    </div>
  );
}
