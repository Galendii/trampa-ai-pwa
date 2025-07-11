import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "@/api/professional/services/services";
import { ServiceModel } from "@/models/service";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useGetServices = () => {
  return useQuery<ServiceModel[], Error>({
    queryKey: ["professional-services"],
    queryFn: getServices,
  });
};

export const useCreateService = () => {
  return useMutation<ServiceModel, Error, ServiceModel>({
    mutationFn: (serviceData: ServiceModel) => createService(serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-services"] });
    },
  });
};
export const useUpdateService = () => {
  return useMutation<ServiceModel, Error, ServiceModel>({
    mutationFn: (serviceData: ServiceModel) => updateService(serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-services"] });
    },
  });
};
export const useDeleteService = () => {
  return useMutation<ServiceModel, Error, ServiceModel>({
    mutationFn: (serviceData: ServiceModel) => deleteService(serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-services"] });
    },
  });
};

export const useGetServiceById = (id: string) => {
  return useQuery<ServiceModel, Error>({
    queryKey: ["professional-service", id],
    queryFn: () => getServiceById(id),
  });
};
