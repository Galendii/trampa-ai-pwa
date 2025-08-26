import * as React from "react";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";

import { useWizard } from "@/contexts/WizardContext";
import { cn } from "@/lib/utils";

export interface WizardProps {
  children: React.ReactNode;
  className?: string;
}

export function Wizard({ children, className }: WizardProps) {
  return <div className={cn("w-full", className)}>{children}</div>;
}

export interface WizardHeaderProps {
  children?: React.ReactNode;
  className?: string;
  showProgress?: boolean;
}

export interface WizardHeaderProps {
  children?: React.ReactNode;
  className?: string;
  showProgress?: boolean;
}

export function WizardHeader({
  children,
  className = "",
  showProgress = true,
}: WizardHeaderProps) {
  const { currentStep, totalSteps, steps } = useWizard();

  return (
    <div className={cn("mb-6 sm:mb-8", className)}>
      {children}
      {showProgress && (
        <div className="mt-4">
          {/* Steps Indicator */}
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div
                    className={cn(
                      "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-200",
                      isCompleted
                        ? "bg-emerald-500 text-white"
                        : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-200 text-slate-500"
                    )}
                  >
                    {isCompleted ? (
                      <Check size={16} />
                    ) : Icon ? (
                      <Icon className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium text-center px-1",
                      isActive ? "text-blue-600" : "text-slate-500"
                    )}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export interface WizardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function WizardContent({ children, className }: WizardContentProps) {
  return <div className={cn("mb-6 sm:mb-8", className)}>{children}</div>;
}

export interface WizardStepProps {
  stepId: string;
  children: React.ReactNode;
  className?: string;
}

export function WizardStep({ stepId, children, className }: WizardStepProps) {
  const { currentStepId } = useWizard();

  if (currentStepId !== stepId) {
    return null;
  }

  return <div className={cn("", className)}>{children}</div>;
}

export interface WizardFooterProps {
  children?: React.ReactNode;
  className?: string;
  showNavigation?: boolean;
  nextLabel?: string;
  prevLabel?: string;
  finishLabel?: string;
  onNext?: () => void | Promise<void>;
  onPrev?: () => void;
  onFinish?: () => void | Promise<void>;
  nextDisabled?: boolean;
  isLoading?: boolean;
}

export function WizardFooter({
  children,
  className = "",
  showNavigation = true,
  nextLabel = "Próximo",
  prevLabel = "Voltar",
  finishLabel = "Finalizar",
  onNext,
  onPrev,
  onFinish,
  nextDisabled = false,
  isLoading = false,
}: WizardFooterProps) {
  const { canGoNext, canGoPrev, isLastStep, nextStep, prevStep } = useWizard();

  const handleNext = async () => {
    if (onNext) {
      await onNext();
    } else {
      nextStep();
    }
  };

  const handlePrev = () => {
    if (onPrev) {
      onPrev();
    } else {
      prevStep();
    }
  };

  const handleFinish = async () => {
    if (onFinish) {
      await onFinish();
    }
  };

  if (children) {
    return (
      <div className={cn("flex items-center justify-between", className)}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0",
        className
      )}
    >
      {showNavigation && (
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-2 sm:order-1",
            !canGoPrev && "invisible"
          )}
        >
          <ChevronLeft size={16} />
          <span>{prevLabel}</span>
        </button>
      )}

      {isLastStep ? (
        <button
          type="button"
          onClick={handleFinish}
          disabled={nextDisabled || isLoading}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
        >
          <span>{isLoading ? "Finalizando..." : finishLabel}</span>
          {!isLoading && <Check size={16} />}
        </button>
      ) : (
        <button
          type="button"
          onClick={handleNext}
          disabled={!canGoNext || nextDisabled || isLoading}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2"
        >
          <span>{isLoading ? "Carregando..." : nextLabel}</span>
          {!isLoading && <ChevronRight size={16} />}
        </button>
      )}
    </div>
  );
}
