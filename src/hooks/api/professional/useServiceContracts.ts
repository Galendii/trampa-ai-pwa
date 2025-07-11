import { ServiceContractModel } from "@/models/service-contract";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const useGetServiceContracts = () => {
  return useQuery<ServiceContractModel[], Error>({
    queryKey: ["professional-service-contract"],
    queryFn: getServiceContracts,
  });
};

export const useCreateServiceContract = () => {
  return useMutation<ServiceContractModel, Error, ServiceContractModel>({
    mutationFn: (serviceContractData: ServiceContractModel) =>
      createServiceContract(serviceContractData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professional-service-contract"],
      });
    },
  });
};
export const useUpdateServiceContract = () => {
  return useMutation<ServiceContractModel, Error, ServiceContractModel>({
    mutationFn: (serviceContractData: ServiceContractModel) =>
      updateServiceContract(serviceContractData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professional-service-contract"],
      });
    },
  });
};
export const useDeleteServiceContract = () => {
  return useMutation<ServiceContractModel, Error, ServiceContractModel>({
    mutationFn: (serviceContractData: ServiceContractModel) =>
      deleteServiceContract(serviceContractData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professional-service-contract"],
      });
    },
  });
};

export const useGetServiceContractById = (id: string) => {
  return useQuery<ServiceContractModel, Error>({
    queryKey: ["professional-service-contract", id],
    queryFn: () => getServiceContractById(id),
  });
};
