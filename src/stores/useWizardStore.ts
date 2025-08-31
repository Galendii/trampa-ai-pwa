import { create } from "zustand";

export interface WizardStep {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  component: React.ComponentType;

  /**
   * This function is called to validate the step's data before proceeding.
   * It should return `true` if the step is valid, or throw an error with a
   * user-friendly message if it's invalid.
   */
  onStepChange?: (formData: Record<string, any>) => Promise<boolean> | boolean;

  /**
   * This function defines a special action to take when submitting from this step,
   * typically used for the final submission before a success screen.
   */
  onStepSubmit?: (formData: Record<string, any>) => Promise<void>;
}

export type WizardConfig = {
  steps: WizardStep[];
  initialFormData: Record<string, any>;
};

type WizardState = {
  isWizardOpen: boolean;
  currentStep: number;
  config: WizardConfig | null;
  formData: Record<string, any>;
  errors: Record<string, string>;
  isSubmitting: boolean;
};

type WizardActions = {
  startWizard: (config: WizardConfig) => void;
  closeWizard: () => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (field: string, value: any) => void;
  setErrors: (errors: Record<string, string>) => void;
  setIsSubmitting: (isSubmitting: boolean) => void;
};

const initialState: WizardState = {
  isWizardOpen: false,
  currentStep: 0,
  config: null,
  formData: {},
  errors: {},
  isSubmitting: false,
};

export const useWizardStore = create<WizardState & WizardActions>(
  (set, get) => ({
    ...initialState,
    startWizard: (config) => {
      console.log("start", config);
      return set({
        isWizardOpen: true,
        config,
        formData: config.initialFormData,
        currentStep: 0,
        errors: {},
      });
    },
    closeWizard: () => set(initialState),
    goToStep: (step) => {
      const totalSteps = get().config?.steps.length ?? 0;
      if (step >= 0 && step < totalSteps) {
        set({ currentStep: step });
      }
    },
    nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
    prevStep: () => set((state) => ({ currentStep: state.currentStep - 1 })),
    updateFormData: (field, value) =>
      set((state) => ({
        formData: { ...state.formData, [field]: value },
      })),
    setErrors: (errors) => set({ errors }),
    setIsSubmitting: (isSubmitting) => set({ isSubmitting }),
  })
);
