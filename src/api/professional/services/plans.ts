import api from "@/api";
import { PaginatedResponseModel } from "@/models/paginated-response";
import { PlanCreateModel, PlanModel } from "@/models/plan";

export const getPlans = async (
  serviceId: string,
  page: { page: number } = { page: 1 }
) => {
  const { data } = await api.get<PaginatedResponseModel<PlanModel>>(
    `/services/${serviceId}/plans/`,
    {
      params: page,
    }
  );
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
  planData: Partial<PlanModel>,
  serviceId: string
) => {
  const { data } = await api.patch<PlanModel>(
    `/services/${serviceId}/plans/${planData.id}/`,
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
