import { PlanModel, PlanCreateModel } from "@/models/plan";
import api from "@/api";

export const getPlans = async (serviceId: string) => {
  const { data } = await api.get<PlanModel[]>(`/services/${serviceId}/plans/`);
  return data;
};
export const createPlan = async (
  planData: PlanCreateModel,
  serviceId: string
) => {
  const { data } = await api.post<PlanModel>(
    `/services/${serviceId}/plans/`,
    planData
  );
  return data;
};
export const updatePlan = async (
  planData: Partial<PlanCreateModel>,
  serviceId: string
) => {
  const { data } = await api.patch<PlanModel>(
    `/services/${serviceId}/plans/`,
    planData
  );
  return data;
};
export const deletePlan = async (planData: PlanModel, serviceId: string) => {
  const { data } = await api.delete<PlanModel>(
    `/services/${serviceId}/plans/`,
    {
      data: planData,
    }
  );
  return data;
};
export const getPlanById = async (id: string, serviceId: string) => {
  const { data } = await api.get<PlanModel>(
    `/services/${serviceId}/plans/${id}`
  );
  return data;
};
