import {
  createPlan,
  getPlanById,
  getPlans,
  updatePlan,
} from "@/api/professional/services/plans";
import { PaginatedResponseModel } from "@/models/paginated-response";
import { PlanCreateModel, PlanModel } from "@/models/plan";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetPlans = (serviceId: string, page: any = { page: 1 }) => {
  return useQuery<PaginatedResponseModel<PlanModel>, Error>({
    queryKey: ["service-plans", serviceId],
    queryFn: () => getPlans(serviceId, page),
    enabled: !!serviceId,
  });
};

export const useCreatePlan = (serviceId: string) => {
  const queryClient = useQueryClient();
  return useMutation<PlanModel, Error, PlanCreateModel>({
    mutationFn: (planData) => createPlan(planData, serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["service-plans", serviceId],
      });
      toast.success("Plano criado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao criar o plano: ${error.message}`);
    },
  });
};
export const useUpdatePlan = (serviceId: string) => {
  const queryClient = useQueryClient();
  return useMutation<PlanModel, Error, Partial<PlanModel>>({
    mutationFn: (planData) => updatePlan(planData, serviceId),
    onSuccess: () => {
      console.log(serviceId);
      queryClient.invalidateQueries({
        queryKey: ["service-plans", serviceId],
      });

      toast.success("Plano atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar o plano: ${error.message}`);
    },
  });
};
// export const useDeletePlan = () => {
//   return useMutation<PlanModel, Error, PlanModel>({
//     mutationFn: (planData: PlanModel) => deletePlan(planData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["professional-Plans"] });
//     },
//   });
// };

export const useGetPlanById = (id: string, serviceId: string) => {
  return useQuery<PlanModel, Error>({
    queryKey: ["service-plans", serviceId, id],
    queryFn: () => getPlanById(id, serviceId),
    enabled: !!id && !!serviceId,
  });
};
