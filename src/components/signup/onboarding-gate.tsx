"use client";

import React, { Suspense, useEffect } from "react";

import { buildOnboardingWizardConfig } from "@/components/signup/onboarding-wizard-config";
import { useOnboardingStatus } from "@/hooks/api/useOnboarding";
import { useUser } from "@/hooks/api/useUsers";
import { useWizardStore } from "@/stores/useWizardStore";

// This component acts as a gatekeeper for the main application.
export const OnboardingGate = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingStatus } = useOnboardingStatus();
  const { data: user } = useUser();
  // const { user } = useUserStore();
  const { startWizard, isWizardOpen } = useWizardStore();

  useEffect(() => {
    if (
      onboardingStatus?.onboardingRequired &&
      !isWizardOpen &&
      !onboardingStatus.isComplete &&
      user
    ) {
      // If onboarding is required and the wizard isn't already open, start it.
      const config = buildOnboardingWizardConfig(onboardingStatus, user);
      startWizard(config);
    }
  }, [onboardingStatus, isWizardOpen, startWizard, user]);

  // If onboarding is in progress, the WizardHost will render the wizard overlay.
  // We still render the children so the dashboard is visible "behind" the wizard.
  return (
    <Suspense fallback={<div>Verificando seu status...</div>}>
      {children}
    </Suspense>
  );
};
