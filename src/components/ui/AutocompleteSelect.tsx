"use client";

import { useEffect, useId, useRef, useState } from "react";

import { Check, Search, X } from "lucide-react";

import { cn } from "../../lib/utils";

export interface AutocompleteOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface AutocompleteSelectProps {
  options: AutocompleteOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
  noOptionsMessage?: string;
}

export function AutocompleteSelect({
  options,
  value,
  onChange,
  placeholder = "Pesquisar...",
  label,
  error,
  disabled,
  fullWidth = false,
  className,
  id,
  noOptionsMessage = "Nenhuma opção encontrada",
}: AutocompleteSelectProps) {
  const generatedId = `autocomplete-${useId()}`;
  const componentId = id || generatedId;
  const listboxId = `${componentId}-listbox`;
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedOption = options.find((option) => option.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: AutocompleteOption) => {
    if (option.disabled) return;
    onChange?.(option.value);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClear = () => {
    onChange?.("");
    setSearchTerm("");
    inputRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn("relative", fullWidth ? "w-full" : "", className)}
      ref={containerRef}
    >
      {label && (
        <label
          htmlFor={componentId}
          className="block text-sm font-medium text-slate-700 mb-2"
        >
          {label}
        </label>
      )}

      <div className="relative">
        {!isOpen && selectedOption ? (
          <div
            className={cn(
              "w-full flex items-center justify-between px-3 py-2.5 border border-slate-300 rounded-lg bg-white text-left",
              disabled && "opacity-50 cursor-not-allowed",
              error && "border-red-500"
            )}
            onClick={() => !disabled && setIsOpen(true)}
          >
            <span className="block truncate">{selectedOption.label}</span>
            {!disabled && (
              <button
                type="button"
                className="flex items-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                aria-label="Limpar seleção"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
        ) : (
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              id={componentId}
              ref={inputRef}
              type="text"
              className={cn(
                "w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white",
                disabled && "opacity-50 cursor-not-allowed",
                error &&
                  "border-red-500 focus:ring-red-500/20 focus:border-red-500"
              )}
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsOpen(true)}
              disabled={disabled}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? `${componentId}-error` : undefined}
              aria-controls={isOpen ? listboxId : undefined}
              aria-expanded={isOpen}
            />
            {(searchTerm || selectedOption) && !disabled && (
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={handleClear}
                aria-label="Limpar pesquisa"
              >
                <X className="h-4 w-4 text-slate-400 hover:text-slate-600" />
              </button>
            )}
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 sm:max-h-60 overflow-auto">
          <ul
            id={listboxId}
            role="listbox"
            aria-labelledby={componentId}
            className="py-1"
          >
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
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
              ))
            ) : (
              <li className="px-3 py-2 text-slate-500 text-sm">
                {noOptionsMessage}
              </li>
            )}
          </ul>
        </div>
      )}

      {error && (
        <p id={`${componentId}-error`} className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}
