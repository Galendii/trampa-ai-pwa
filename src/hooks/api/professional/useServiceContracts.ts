import {
  createServiceContract,
  getServiceContracts,
} from "@/api/professional/services/contracts";
import {
  PageDataModel,
  PaginatedResponseModel,
} from "@/models/paginated-response";
import {
  CreateContractFormData,
  ServiceContractFullModel,
  ServiceContractModel,
} from "@/models/service-contract";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetServiceContracts = (pageData: PageDataModel) => {
  return useQuery<PaginatedResponseModel<ServiceContractFullModel>, Error>({
    queryKey: ["professional-service-contract"],
    queryFn: () => getServiceContracts(pageData),
  });
};

export const useCreateServiceContract = () => {
  const queryClient = useQueryClient();

  return useMutation<ServiceContractModel, Error, CreateContractFormData>({
    mutationFn: (serviceContractData: CreateContractFormData) =>
      createServiceContract(serviceContractData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professional-service-contract"],
      });
    },
  });
};
// export const useUpdateServiceContract = () => {
//   return useMutation<ServiceContractModel, Error, ServiceContractModel>({
//     mutationFn: (serviceContractData: ServiceContractModel) =>
//       updateServiceContract(serviceContractData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["professional-service-contract"],
//       });
//     },
//   });
// };
// export const useDeleteServiceContract = () => {
//   return useMutation<ServiceContractModel, Error, ServiceContractModel>({
//     mutationFn: (serviceContractData: ServiceContractModel) =>
//       deleteServiceContract(serviceContractData),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["professional-service-contract"],
//       });
//     },
//   });
// };

// export const useGetServiceContractById = (id: string) => {
//   return useQuery<ServiceContractModel, Error>({
//     queryKey: ["professional-service-contract", id],
//     queryFn: () => getServiceContractById(id),
//   });
// };
