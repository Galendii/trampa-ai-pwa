"use client";

import { useState, useEffect } from "react";
import { Download, X, Smartphone, Monitor } from "lucide-react";
import { usePWA } from "../hooks/usePWA";

interface PWAInstallBannerProps {
  variant?: "banner" | "card" | "button";
  className?: string;
}

export default function PWAInstallBanner({
  variant = "banner",
  className = "",
}: PWAInstallBannerProps) {
  const { isInstalled, isInstallable, installPWA } = usePWA();
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Only show after component is mounted to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || isInstalled || !isInstallable || isDismissed) {
    return null;
  }

  const handleInstall = async () => {
    const success = await installPWA();
    if (success) {
      setIsDismissed(true);
    }
  };

  if (variant === "button") {
    return (
      <button
        onClick={handleInstall}
        className={`flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors ${className}`}
        aria-label="Instalar aplicativo"
      >
        <Download size={16} />
        <span>Instalar App</span>
      </button>
    );
  }

  if (variant === "card") {
    return (
      <div
        className={`bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-4 sm:p-6 ${className}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm sm:text-base">
                Instale o App Trampa AI
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Acesso rápido e offline
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-1 hover:bg-blue-200 rounded-lg transition-colors"
            aria-label="Fechar"
          >
            <X size={16} className="text-slate-500" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-slate-600">
          <div className="flex items-center space-x-2">
            <Monitor size={14} className="flex-shrink-0" />
            <span>Funciona offline</span>
          </div>
          <div className="flex items-center space-x-2">
            <Download size={14} className="flex-shrink-0" />
            <span>Acesso instantâneo</span>
          </div>
        </div>

        <button
          onClick={handleInstall}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Download size={16} />
          <span>Instalar Agora</span>
        </button>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm bg-white shadow-lg border border-slate-200 rounded-2xl p-4 z-50 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Download className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 text-sm">
              Instalar Trampa AI
            </h4>
            <p className="text-xs text-slate-600">Para melhor experiência</p>
          </div>
        </div>
        <button
          onClick={() => setIsDismissed(true)}
          className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Fechar"
        >
          <X size={16} className="text-slate-500" />
        </button>
      </div>

      <button
        onClick={handleInstall}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors text-sm"
      >
        Instalar App
      </button>
    </div>
  );
}
