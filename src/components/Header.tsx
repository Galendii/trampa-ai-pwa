import { Bell, Settings, User } from "lucide-react";

import { organizacao } from "../lib/mock-data";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-slate-200/60 px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-slate-800">
            {title}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Gerencie seu negócio com clareza
          </p>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Notifications */}
          <button
            className="p-2 sm:p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all duration-200"
            aria-label="Notificações"
          >
            <Bell size={18} />
          </button>

          {/* Settings */}
          <button
            className="p-2 sm:p-2.5 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all duration-200"
            aria-label="Configurações"
          >
            <Settings size={18} />
          </button>

          {/* User info */}
          <div className="flex items-center space-x-2 sm:space-x-3 pl-2 sm:pl-4 border-l border-slate-200">
            <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
              <User size={16} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {organizacao.dono}
              </p>
              <p className="text-xs text-slate-500">
                Dono da {organizacao.nome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
