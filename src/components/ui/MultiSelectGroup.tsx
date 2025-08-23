"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type MultiSelectOption = {
  value: string;
  label: string;
};

type MultiSelectGroupProps = {
  options: MultiSelectOption[];
  values: string[]; // Now accepts an array of selected values
  onChange: (newValues: string[]) => void;
  label?: string;
};

export const MultiSelectGroup: React.FC<MultiSelectGroupProps> = ({
  options,
  values,
  onChange,
  label,
}) => {
  const handleSelect = (optionValue: string) => {
    const newValues = values.includes(optionValue)
      ? values.filter((v) => v !== optionValue) // Remove if already selected
      : [...values, optionValue]; // Add if not selected
    onChange(newValues);
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-2">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = values.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => handleSelect(option.value)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium rounded-full border transition-colors",
                isSelected
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
