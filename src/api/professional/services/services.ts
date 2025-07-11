import api from "@/api";
import { ServiceModel } from "@/models/service";

export const getServices = async () => {
  const { data } = await api.get<ServiceModel[]>(`/services/`);
  return data;
};
export const createService = async (serviceData: ServiceModel) => {
  const { data } = await api.post<ServiceModel>(`/services/`, serviceData);
  return data;
};
export const updateService = async (serviceData: ServiceModel) => {
  const { data } = await api.patch<ServiceModel>(`/services/`, serviceData);
  return data;
};
export const deleteService = async (serviceData: ServiceModel) => {
  const { data } = await api.delete<ServiceModel>(`/services/`, {
    data: serviceData,
  });
  return data;
};
export const getServiceById = async (id: string) => {
  const { data } = await api.get<ServiceModel>(`/services/${id}`);
  return data;
};
