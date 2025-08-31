import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { toast } from "sonner";

import { advanceOnboardingStep, getOnboardingStatus } from "@/api/onboarding";
import { UserOnboardingProgressModel } from "@/models/onboarding";

/**
 * A hook to fetch the user's current onboarding status.
 * This will be the main driver for our dynamic wizard.
 */
export const useOnboardingStatus = () => {
  return useSuspenseQuery<UserOnboardingProgressModel, Error>({
    queryKey: ["onboarding-status"],
    queryFn: getOnboardingStatus,
    // We can make this refetch occasionally to ensure sync, but for now, this is fine.
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

/**
 * A hook to handle the mutation for advancing to the next onboarding step.
 */
export const useAdvanceOnboardingStep = () => {
  const queryClient = useQueryClient();

  return useMutation<UserOnboardingProgressModel, Error>({
    mutationFn: advanceOnboardingStep,
    onSuccess: (data) => {
      // When we successfully advance, we update the cached onboarding status
      // with the new data from the server.
      queryClient.setQueryData(["onboarding-status"], data);
      toast.success("Passo concluído!");
    },
    onError: (error) => {
      toast.error(`Erro ao avançar: ${error.message}`);
    },
  });
};
