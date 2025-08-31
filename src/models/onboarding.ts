/**
 * Enum representing the component names for different onboarding steps.
 * This corresponds to the ComponentNameChoices in the Django model.
 */
export enum OnboardingComponentName {
  WELCOME = "welcome",
  PERSONAL_DETAILS = "personal-information",
  COMPANY_DETAILS = "password", // Note: The model says "password", might be a typo for "company-details"
  SUBSCRIPTION_PLAN = "subscription-plan",
}

/**
 * Represents the details of a single, atomic onboarding step.
 * Corresponds to the OnboardingStep model and serializer.
 */
export interface OnboardingStepModel {
  name: string;
  componentName: OnboardingComponentName;
}

/**
 * Represents a step within a specific onboarding flow, including its order.
 * Corresponds to the FlowStep model and serializer.
 */
export interface FlowStepModel {
  order: number;
  step: OnboardingStepModel;
}

/**
 * Represents a complete onboarding flow, such as "Professional Onboarding".
 * Corresponds to the OnboardingFlow model.
 */
export interface OnboardingFlowModel {
  name: string;
  role: string; // e.g., "client", "professional"
  steps: FlowStepModel[];
  requireGoogleAuth: boolean;
  active: boolean;
}

/**
 * Represents the complete onboarding status for a user.
 * Corresponds to the UserOnboardingProgress model and serializer.
 */
export interface UserOnboardingProgressModel {
  onboardingRequired: boolean;
  isComplete: boolean;
  currentStep: FlowStepModel | null;
  flow: OnboardingFlowModel; // Added the full flow object for context
  steps: FlowStepModel[];
}
