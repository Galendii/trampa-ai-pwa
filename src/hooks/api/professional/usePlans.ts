import {
  createPlan,
  getPlanById,
  getPlans,
  updatePlan,
} from "@/api/professional/services/plans";
import { PlanModel } from "@/models/plan";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useGetPlans = () => {
  return useQuery<PlanModel[], Error>({
    queryKey: ["professional-plans"],
    queryFn: getPlans,
  });
};

export const useCreatePlan = () => {
  return useMutation<PlanModel, Error, PlanModel>({
    mutationFn: (planData: PlanModel) => createPlan(planData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-plans"] });
    },
  });
};
// export const useUpdatePlan = () => {
//   return useMutation<PlanModel, Error, PlanModel>({
//     mutationFn: (planData: PlanModel) => updatePlan(planData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["professional-Plans"] });
//     },
//   });
// };
// export const useDeletePlan = () => {
//   return useMutation<PlanModel, Error, PlanModel>({
//     mutationFn: (planData: PlanModel) => deletePlan(planData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["professional-Plans"] });
//     },
//   });
// };

export const useGetPlanById = (id: string) => {
  return useQuery<PlanModel, Error>({
    queryKey: ["professional-Plan", id],
    queryFn: () => getPlanById(id),
  });
};
