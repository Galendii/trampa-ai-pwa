import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from "@/api/professional/services/services";
import { PaginatedResponseModel } from "@/models/paginated-response";
import { CreateServiceModel, ServiceModel } from "@/models/service";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetServices = (page: number) => {
  return useQuery<PaginatedResponseModel<ServiceModel>, Error>({
    queryKey: ["professional-services"],
    queryFn: () => getServices({ page }),
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation<ServiceModel, Error, CreateServiceModel>({
    mutationFn: (serviceData: CreateServiceModel) => createService(serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-services"] });
      toast.success("Serviço criado com sucesso!");
    },
    onError: (error) => {
      try {
        toast.error(error.message);
      } catch {
        console.error("Error displaying toast notification");
      }
    },
  });
};
export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ServiceModel,
    Error,
    { serviceData: CreateServiceModel; serviceId: string }
  >({
    mutationFn: ({ serviceData, serviceId }) =>
      updateService(serviceData, serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-services"] });
    },
  });
};
export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation<ServiceModel, Error, string>({
    mutationFn: (serviceId: string) => deleteService(serviceId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["professional-services"] });
    },
  });
};

export const useGetServiceById = (id: string) => {
  return useQuery<ServiceModel, Error>({
    queryKey: ["professional-service", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
};
