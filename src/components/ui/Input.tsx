"use client";

import type React from "react";
import { cn } from "../../lib/utils";
import { useId } from "react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export function Input({
  className,
  label,
  error,
  leftIcon,
  rightIcon,
  fullWidth = false,
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${useId()}`;

  return (
    <div className={cn("relative", fullWidth ? "w-full" : "")}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={cn(
            "w-full p-2  border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white",
            leftIcon && "pl-10",
            rightIcon && "pr-10",
            error &&
              "border-red-500 focus:ring-red-500/20 focus:border-red-500",
            className
          )}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
      </div>
      {error && (
        <p id={`${inputId}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
