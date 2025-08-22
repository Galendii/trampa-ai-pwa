import api from "@/api";
import { PaginatedResponseModel } from "@/models/paginated-response";
import { CreateServiceModel, ServiceModel } from "@/models/service";

export const getServices = async (pageData: { page: number }) => {
  const { page } = pageData;
  const { data } = await api.get<PaginatedResponseModel<ServiceModel>>(
    `/services/`,
    {
      params: {
        page,
      },
    }
  );
  return data;
};
export const createService = async (serviceData: CreateServiceModel) => {
  const { data } = await api.post<ServiceModel>(`/services/`, serviceData);
  return data;
};
export const updateService = async (
  serviceData: CreateServiceModel,
  serviceId: string
) => {
  const { data } = await api.patch<ServiceModel>(
    `/services/${serviceId}/`,
    serviceData
  );
  return data;
};
export const deleteService = async (serviceId: string) => {
  const { data } = await api.delete<ServiceModel>(`/services/${serviceId}/`);
  return data;
};
export const getServiceById = async (id: string) => {
  const { data } = await api.get<ServiceModel>(`/services/${id}`);
  return data;
};
