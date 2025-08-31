import { z } from "zod";

import {
  OnboardingComponentName,
  UserOnboardingProgressModel,
} from "@/models/onboarding";
import { UserModel } from "@/models/user";
import { WizardConfig, WizardStep } from "@/stores/useWizardStore";

// Import your step components
import {
  DocumentationStep,
  PersonalInfoStep,
  PlanSelectionStep,
  SuccessStep,
} from "./";

// This maps the component names from your Django backend to your React components
const componentMap = {
  [OnboardingComponentName.PERSONAL_DETAILS]: PersonalInfoStep,
  [OnboardingComponentName.COMPANY_DETAILS]: DocumentationStep,
  [OnboardingComponentName.SUBSCRIPTION_PLAN]: PlanSelectionStep,
  [OnboardingComponentName.WELCOME]: SuccessStep,
};

// --- Zod Schema for Personal Info Validation ---
const PersonalInfoSchema = z.object({
  firstName: z.string().min(2, "O nome é obrigatório."),
  lastName: z.string().min(2, "O sobrenome é obrigatório."),
  // Add other fields from this step as needed
});

export const buildOnboardingWizardConfig = (
  progress: UserOnboardingProgressModel,
  user: UserModel,
  updateUser: (formData: Partial<UserModel>) => Promise<void>,
  advanceStep: () => Promise<void>
): WizardConfig => {
  const { firstName, lastName, email, phone, cpf } = user;

  return {
    initialFormData: { firstName, lastName, email, phone, cpf },
    steps: progress.steps.map(
      (flowStep): WizardStep => ({
        id: flowStep.step.componentName,
        title: flowStep.step.name,
        component: componentMap[flowStep.step.componentName],

        // --- Define validation logic for the personal details step ---
        onStepChange: async (formData) => {
          if (
            flowStep.step.componentName ===
            OnboardingComponentName.PERSONAL_DETAILS
          ) {
            const result = await PersonalInfoSchema.safeParseAsync(formData);
            if (!result.success) {
              // Throw an error with a user-friendly message
              const firstError = result.error.errors[0].message;
              throw new Error(firstError);
            }
            await updateUser(formData);
            await advanceStep();
          }
          return true; // Return true if validation passes
        },

        // --- Define the submission logic for each step ---
        onStepSubmit: async (formData, { updateUser, advanceStep }) => {
          if (
            flowStep.step.componentName ===
            OnboardingComponentName.PERSONAL_DETAILS
          ) {
            const result = await PersonalInfoSchema.safeParseAsync(formData);

            await updateUser(formData);

            await advanceStep();
          } else {
            // Default action for other steps is just to advance.
            await advanceStep();
          }
        },
      })
    ),
  };
};
