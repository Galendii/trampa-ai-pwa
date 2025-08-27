"use client";
import type React from "react";
import { useEffect, useState } from "react";

import { useProfessionalStore } from "@/stores/useProfessionalStore";

import Sidebar from "../../components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { fetchProfessional } = useProfessionalStore();

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
          {children}
        </main>
      </div>
    </div>
  );
}
