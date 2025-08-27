import { create } from "zustand";

export interface WizardStep {
  id: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  // The actual component to render for this step
  component: React.ComponentType;
}

export type WizardConfig = {
  steps: WizardStep[];
  initialFormData: Record<string, any>;
  onSubmit: (formData: Record<string, any>) => Promise<any>;
};

type WizardState = {
  isWizardOpen: boolean;
  currentStep: number;
  config: WizardConfig | null;
  formData: Record<string, any>;
  isSubmitting: boolean;
};

type WizardActions = {
  startWizard: (config: WizardConfig) => void;
  closeWizard: () => void;
  goToStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (field: string, value: any) => void;
  submit: () => void;
};

const initialState: WizardState = {
  isWizardOpen: false,
  currentStep: 0,
  config: null,
  formData: {},
  isSubmitting: false,
};

export const useWizardStore = create<WizardState & WizardActions>(
  (set, get) => ({
    ...initialState,
    startWizard: (config) =>
      set({
        isWizardOpen: true,
        config,
        formData: config.initialFormData,
        currentStep: 0,
        isSubmitting: false,
      }),
    closeWizard: () => set(initialState),
    goToStep: (step) => {
      const totalSteps = get().config?.steps.length ?? 0;
      if (step >= 0 && step < totalSteps) {
        set({ currentStep: step });
      }
    },
    nextStep: () => get().goToStep(get().currentStep + 1),
    prevStep: () => get().goToStep(get().currentStep - 1),
    updateFormData: (field, value) =>
      set((state) => ({
        formData: { ...state.formData, [field]: value },
      })),
    submit: async () => {
      const { config, formData, nextStep } = get();
      if (config?.onSubmit) {
        set({ isSubmitting: true });
        try {
          await config.onSubmit(formData);
          nextStep(); // Move to success step
        } catch (error) {
          console.error("Wizard submission failed:", error);
        } finally {
          set({ isSubmitting: false });
        }
      }
    },
  })
);
