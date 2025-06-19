"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from "react";

export interface WizardStep {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface WizardContextType {
  currentStep: number;
  totalSteps: number;
  steps: WizardStep[];
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  canGoNext: boolean;
  canGoPrev: boolean;
  isFirstStep: boolean;
  isLastStep: boolean;
  currentStepId: string;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

export interface WizardProviderProps {
  children: React.ReactNode;
  initialStep?: number;
  steps: WizardStep[];
}

export const WizardProvider: React.FC<WizardProviderProps> = ({
  children,
  initialStep = 0,
  steps,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const totalSteps = steps.length;

  const goToStep = useCallback(
    (step: number) => {
      console.log(currentStep, step);
      const newStep = Math.max(0, Math.min(step, totalSteps - 1));
      setCurrentStep(newStep);
    },
    [totalSteps]
  );

  const nextStep = useCallback(
    () => goToStep(currentStep + 1),
    [currentStep, goToStep]
  );
  const prevStep = useCallback(
    () => goToStep(currentStep - 1),
    [currentStep, goToStep]
  );

  const canGoNext = currentStep < totalSteps - 1;
  const canGoPrev = currentStep > 0;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const currentStepId = steps[currentStep]?.id || "";

  const value = useMemo(
    () => ({
      currentStep,
      totalSteps,
      steps,
      goToStep,
      nextStep,
      prevStep,
      canGoNext,
      canGoPrev,
      isFirstStep,
      isLastStep,
      currentStepId,
    }),
    [
      currentStep,
      totalSteps,
      steps,
      goToStep,
      nextStep,
      prevStep,
      canGoNext,
      canGoPrev,
      isFirstStep,
      isLastStep,
      currentStepId,
    ]
  );

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
};

export const useWizard = () => {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
};
