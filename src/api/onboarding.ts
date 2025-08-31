import { UserOnboardingProgressModel } from "@/models/onboarding";

import api from ".";

/**
 * Fetches the current onboarding status for the authenticated user.
 */
export const getOnboardingStatus = async () => {
  const { data } = await api.get<UserOnboardingProgressModel>(
    "/onboarding/status/"
  );
  return data;
};

/**
 * Advances the user to the next step in their onboarding flow.
 */
export const advanceOnboardingStep = async () => {
  const { data } = await api.post<UserOnboardingProgressModel>(
    "/onboarding/next-step/"
  );
  return data;
};
