"use client";

import type React from "react";
import { useId } from "react";

import { cn } from "../../lib/utils";

export interface RadioProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Radio({ className, label, error, id, ...props }: RadioProps) {
  const radioId = id || `radio-${useId()}`;

  return (
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id={radioId}
          type="radio"
          className="sr-only"
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${radioId}-error` : undefined}
          {...props}
        />
        <div
          className={cn(
            "w-5 h-5 border border-slate-300 rounded-full flex items-center justify-center transition-colors",
            props.checked
              ? "border-blue-600"
              : "bg-white hover:bg-slate-50 hover:border-slate-400",
            props.disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500",
            className
          )}
        >
          {props.checked && (
            <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
          )}
        </div>
      </div>
      {label && (
        <label
          htmlFor={radioId}
          className={cn(
            "ml-2 block text-sm text-slate-700",
            props.disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </label>
      )}
      {error && (
        <p id={`${radioId}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
