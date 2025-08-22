"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import {
  useWizard,
  WizardStep as WizardStepType,
} from "@/contexts/WizardContext";

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
  className,
  showProgress = true,
}: WizardHeaderProps) {
  const { currentStep, totalSteps, steps } = useWizard();
  const activeStepRef = React.useRef<HTMLDivElement>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // This effect scrolls the active step into the center of the view
  React.useEffect(() => {
    if (activeStepRef.current && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      const activeStep = activeStepRef.current;

      const scrollLeft =
        activeStep.offsetLeft -
        scrollContainer.offsetWidth / 2 +
        activeStep.offsetWidth / 2;

      scrollContainer.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [currentStep]);

  return (
    <div className={cn("mb-6 sm:mb-8", className)}>
      {children}
      {showProgress && (
        <div className="mt-4">
          {/* Simple text indicator for very small screens */}
          <div className="sm:hidden text-center mb-4">
            <p className="text-sm font-semibold text-slate-700">
              Passo {currentStep + 1} de {totalSteps}:{" "}
              <span className="text-blue-600">{steps[currentStep].title}</span>
            </p>
          </div>

          {/* Scrollable Steps Indicator for small screens and up */}
          <div
            ref={scrollContainerRef}
            className="hidden sm:flex items-center justify-start  mb-4 overflow-x-auto pb-2 -mx-4 sm:mx-0 px-4 sm:px-0"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex items-start justify-center ">
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

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep * 100) / (totalSteps - 1)}%` }} // Corrected percentage
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
  className,
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
        "flex justify-between items-center space-y-3 sm:space-y-0",
        className
      )}
    >
      {showNavigation && (
        <button
          type="button"
          onClick={handlePrev}
          disabled={!canGoPrev}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 text-slate-600 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors order-1",
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
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed order-2"
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
