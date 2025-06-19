"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";

export type ToastVariant =
  | "default"
  | "success"
  | "danger"
  | "info"
  | "warning";

export interface ToastProps {
  id: string;
  message: string;
  variant?: ToastVariant;
  duration?: number;
  onClose?: () => void;
}

export interface ToastContextType {
  addToast: (
    message: string,
    variant?: ToastVariant,
    duration?: number
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, toasts[0].duration || 3000);
      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const addToast = (
    message: string,
    variant: ToastVariant = "default",
    duration?: number
  ) => {
    const id = Date.now().toString();
    setToasts((prevToasts) => [
      ...prevToasts,
      { id, message, variant, duration },
    ]);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[9999] flex flex-col-reverse gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            {...toast}
            onClose={() =>
              setToasts((prev) => prev.filter((t) => t.id !== toast.id))
            }
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

const ToastItem: React.FC<ToastProps> = ({ id, message, variant, onClose }) => {
  const variantClasses = {
    default: "bg-white text-slate-800 border-slate-200",
    success: "bg-emerald-500 text-white",
    danger: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
    warning: "bg-amber-500 text-white",
  };

  const Icon = {
    default: Info,
    success: CheckCircle,
    danger: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  }[variant || "default"];

  return (
    <div
      className={cn(
        "relative p-4 rounded-lg shadow-lg flex items-center gap-3 pr-10 pointer-events-auto",
        variantClasses[variant || "default"]
      )}
    >
      <Icon size={20} />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 rounded-full hover:bg-black/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-current"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
