"use client";

import { useId, useState } from "react";

import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "../../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

export function Select({
  options,
  value,
  onChange,
  placeholder = "Selecione uma opção",
  label,
  error,
  disabled,
  fullWidth = false,
  className,
  id,
}: SelectProps) {
  const selectId = id || `select-${useId()}`;
  const [isOpen, setIsOpen] = useState(false);
  const listboxId = `${selectId}-listbox`;

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", fullWidth ? "w-full" : "", className)}>
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {label}
        </label>
      )}
      <button
        id={selectId}
        type="button"
        className={cn(
          "w-full flex items-center justify-between px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-red-500 focus:ring-red-500/20 focus:border-red-500"
        )}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby={label ? selectId : undefined}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${selectId}-error` : undefined}
        disabled={disabled}
      >
        <span
          className={cn("block truncate", !selectedOption && "text-slate-400")}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="pointer-events-none">
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </span>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-auto">
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={selectId}
            className="py-1"
          >
            {options.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                className={cn(
                  "px-3 py-2.5 sm:py-2 flex items-center justify-between cursor-pointer text-sm",
                  value === option.value
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-50",
                  option.disabled && "opacity-50 cursor-not-allowed"
                )}
                onClick={() => handleSelect(option)}
              >
                <span className="block truncate">{option.label}</span>
                {value === option.value && (
                  <Check className="h-4 w-4 flex-shrink-0" />
                )}
              </li>
            ))}
            {options.length === 0 && (
              <li className="px-3 py-2 text-slate-500 text-sm">
                Nenhuma opção disponível
              </li>
            )}
          </ul>
        </div>
      )}

      {error && (
        <p id={`${selectId}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
