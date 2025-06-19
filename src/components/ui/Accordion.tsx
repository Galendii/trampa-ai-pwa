"use client";

import type React from "react";
import { useId, useState } from "react";
import { cn } from "../../lib/utils";
import { ChevronDown } from "lucide-react";

export interface AccordionItemProps {
  title: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  disabled?: boolean;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
  disabled = false,
  className,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const id = `accordion-${useId()}`;
  const headingId = `${id}-heading`;
  const contentId = `${id}-content`;

  return (
    <div
      className={cn(
        "border border-slate-200 rounded-lg overflow-hidden",
        disabled && "opacity-60 cursor-not-allowed",
        className
      )}
    >
      <h3>
        <button
          id={headingId}
          className={cn(
            "flex w-full items-center justify-between px-4 py-3 text-left font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            isOpen ? "bg-slate-50" : "bg-white hover:bg-slate-50",
            disabled && "cursor-not-allowed"
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={contentId}
          disabled={disabled}
        >
          <span>{title}</span>
          <ChevronDown
            className={cn(
              "h-5 w-5 text-slate-500 transition-transform duration-200",
              isOpen && "transform rotate-180"
            )}
          />
        </button>
      </h3>
      <div
        id={contentId}
        role="region"
        aria-labelledby={headingId}
        className={cn(
          "overflow-hidden transition-all duration-200",
          isOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <div className="px-4 py-3 border-t border-slate-200">{children}</div>
      </div>
    </div>
  );
}

export interface AccordionProps {
  children: React.ReactNode;
  className?: string;
}

export function Accordion({ children, className }: AccordionProps) {
  return <div className={cn("space-y-2", className)}>{children}</div>;
}
