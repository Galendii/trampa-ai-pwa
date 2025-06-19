"use client";

import type React from "react";
import { cn } from "../../lib/utils";
import { Check } from "lucide-react";
import { useId } from "react";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Checkbox({
  className,
  label,
  error,
  id,
  ...props
}: CheckboxProps) {
  const checkboxId = id || `checkbox-${useId()}`;

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={checkboxId}
          type="checkbox"
          className="sr-only"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${checkboxId}-error` : undefined}
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 border border-slate-300 rounded flex items-center justify-center transition-colors",
            props.checked
              ? "bg-blue-600 border-blue-600"
              : "bg-white hover:bg-slate-50 hover:border-slate-400",
            props.disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500",
            className
          )}
        >
          {props.checked && <Check className="w-3.5 h-3.5 text-white" />}
        </div>
      </div>
      {label && (
        <label
          htmlFor={checkboxId}
          className={cn(
            "ml-2 block text-sm text-slate-700",
            props.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </label>
      )}
      {error && (
        <p id={`${checkboxId}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
