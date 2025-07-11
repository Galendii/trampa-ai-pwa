import { PlanModel } from "@/models/plan";
import api from "@/api";

export const getPlans = async () => {
  const { data } = await api.get<PlanModel[]>(`/plans/`);
  return data;
};
export const createPlan = async (planData: PlanModel) => {
  const { data } = await api.post<PlanModel>(`/plans/`, planData);
  return data;
};
export const updatePlan = async (planData: PlanModel) => {
  const { data } = await api.patch<PlanModel>(`/plans/`, planData);
  return data;
};
export const deletePlan = async (planData: PlanModel) => {
  const { data } = await api.delete<PlanModel>(`/plans/`, {
    data: planData,
  });
  return data;
};
export const getPlanById = async (id: string) => {
  const { data } = await api.get<PlanModel>(`/plans/${id}`);
  return data;
};
