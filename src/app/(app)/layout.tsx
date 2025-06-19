import type React from "react";
import Sidebar from "../../components/Sidebar";
import QueryProvider from "../QueryProvider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50">
      <QueryProvider>
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            {children}
          </main>
        </div>
      </QueryProvider>
    </div>
  );
}
