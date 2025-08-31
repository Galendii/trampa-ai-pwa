"use client";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
// Import the new Zustand store
import { useWizardStore } from "@/stores/useWizardStore";

// --- The main Wizard container remains simple ---
export interface WizardProps {
  children: React.ReactNode;
  className?: string;
}

export const Wizard = ({ children, className }: WizardProps) => {
  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      {children}
    </div>
  );
};

// --- WizardHeader now pulls state from useWizardStore ---
export interface WizardHeaderProps {
  children?: React.ReactNode;
  className?: string;
  showProgress?: boolean;
}

export const WizardHeader = ({
  children,
  className,
  showProgress = true,
}: WizardHeaderProps) => {
  const { config, currentStep } = useWizardStore();
  const activeStepRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeStepRef.current && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const activeStep = activeStepRef.current;
      const scrollLeft =
        activeStep.offsetLeft -
        scrollContainer.offsetWidth / 2 +
        activeStep.offsetWidth / 2;
      scrollContainer.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [currentStep]);

  if (!config) return null;

  const { steps } = config;
  const totalSteps = steps.length;

  return (
    <div className={cn("mb-6 sm:mb-8", className)}>
      {children}
      {showProgress && (
        <div className="mt-4">
          <div className="sm:hidden text-center mb-4">
            <p className="text-sm font-semibold text-slate-700">
              Passo {currentStep + 1} de {totalSteps}:{" "}
              <span className="text-blue-600">{steps[currentStep]?.title}</span>
            </p>
          </div>
          <div
            ref={scrollContainerRef}
            className="hidden sm:flex items-center justify-start mb-4 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-start justify-center space-x-4 sm:space-x-6">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = index === currentStep;
                const isCompleted = index < currentStep;

                return (
                  <div
                    key={step.id}
                    className="flex items-center"
                    ref={isActive ? activeStepRef : null}
                  >
                    <div className="flex flex-col items-center flex-shrink-0 text-center w-20">
                      <div
                        className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                          isCompleted
                            ? "bg-emerald-500 text-white"
                            : isActive
                              ? "bg-blue-600 text-white shadow-lg"
                              : "bg-slate-200 text-slate-500"
                        )}
                      >
                        {isCompleted ? (
                          <Check size={20} />
                        ) : Icon ? (
                          <Icon className="w-5 h-5" />
                        ) : (
                          <span className="font-bold">{index + 1}</span>
                        )}
                      </div>
                      <span
                        className={cn(
                          "text-xs font-medium text-center",
                          isActive ? "text-blue-600" : "text-slate-500"
                        )}
                      >
                        {step.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep * 100) / (totalSteps - 1)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// --- WizardContent remains simple ---
export interface WizardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const WizardContent = ({ children, className }: WizardContentProps) => {
  return <div className={cn("mb-6 sm:mb-8", className)}>{children}</div>;
};

// --- WizardStep now pulls state from useWizardStore ---
export interface WizardStepProps {
  stepId: string;
  children: React.ReactNode;
  className?: string;
}

export const WizardStep = ({
  stepId,
  children,
  className,
}: WizardStepProps) => {
  const { config, currentStep } = useWizardStore();
  const currentStepId = config?.steps[currentStep]?.id;

  if (currentStepId !== stepId) {
    return null;
  }

  return <div className={cn("", className)}>{children}</div>;
};

// --- WizardFooter now pulls state from useWizardStore ---
export interface WizardFooterProps {
  className?: string;
  nextLabel?: string;
  prevLabel?: string;
  finishLabel?: string;
  onNext?: () => void;
  onPrev?: () => void;
  isLoading?: boolean;
  isLastStep?: boolean;
}

export const WizardFooter = ({
  className,
  nextLabel = "Próximo",
  prevLabel = "Voltar",
  finishLabel = "Finalizar",
  onNext,
  onPrev,
  isLoading = false,
  isLastStep = false,
}: WizardFooterProps) => {
  const { currentStep, prevStep, config } = useWizardStore();
  if (!config) return null;
  const canGoPrev = currentStep > 0;

  return (
    <div className={cn("flex justify-between items-center", className)}>
      <button
        type="button"
        onClick={onPrev || prevStep}
        disabled={!canGoPrev || isLoading}
        className={cn(
          "flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors",
          !canGoPrev && "invisible"
        )}
      >
        <ChevronLeft size={16} />
        <span>{prevLabel}</span>
      </button>
      <button
        type="button"
        onClick={onNext}
        disabled={isLoading}
        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span>
          {isLoading ? "Processando..." : isLastStep ? finishLabel : nextLabel}
        </span>
        {!isLoading &&
          (isLastStep ? <Check size={16} /> : <ChevronRight size={16} />)}
      </button>
    </div>
  );
};

// --- WizardHost is now separate and uses portals ---
export const WizardHost = () => {
  const {
    isWizardOpen,
    closeWizard,
    config,
    currentStep,
    isSubmitting,
    setIsSubmitting,
    nextStep,
    prevStep,
    formData,
  } = useWizardStore();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWizard();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeWizard]);

  // --- FIX: Added safety checks for config and steps array ---
  if (
    typeof document === "undefined" ||
    !isWizardOpen ||
    !config ||
    !config.steps ||
    config.steps.length === 0
  ) {
    if (isWizardOpen) {
      console.error("Wizard started with no steps or invalid config.");
      // closeWizard(); // Close wizard if it's open but has no steps
    }
    return null;
  }

  const currentStepConfig = config.steps[currentStep];
  const isLastInputStep = currentStep === config.steps.length - 2;
  const isSuccessStep = currentStep === config.steps.length - 1;

  const handleNext = async () => {
    if (currentStepConfig?.onStepChange) {
      try {
        setIsSubmitting(true);
        const isValid = await currentStepConfig.onStepChange(formData);
        if (!isValid) return;
      } catch (error: any) {
        toast.error(error.message);
        return;
      } finally {
        setIsSubmitting(false);
      }
    }
    nextStep();
  };

  // useEffect(() => {
  //   if (isSuccessStep) {
  //     const timer = setTimeout(() => closeWizard(), 4000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isSuccessStep, closeWizard]);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[95vh] flex flex-col">
        <Wizard>
          <div className="p-6 border-b">
            <WizardHeader />
          </div>
          <WizardContent className="flex-1 overflow-y-auto p-6">
            {config.steps.map((step) => (
              <WizardStep key={step.id} stepId={step.id}>
                <step.component />
              </WizardStep>
            ))}
          </WizardContent>
          {!isSuccessStep && (
            <div className="p-6 border-t mt-auto">
              <WizardFooter
                onNext={handleNext}
                onPrev={prevStep}
                isLoading={isSubmitting}
                finishLabel="Finalizar"
                isLastStep={isLastInputStep}
              />
            </div>
          )}
        </Wizard>
      </div>
    </div>
  );
};
