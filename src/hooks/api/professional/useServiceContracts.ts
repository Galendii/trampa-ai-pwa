import {
  createServiceContract,
  deleteServiceContract,
  getServiceContractById,
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
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export const useGetServiceContracts = (pageData: PageDataModel) => {
  return useQuery<PaginatedResponseModel<ServiceContractFullModel>, Error>({
    queryKey: ["professional-service-contracts", pageData],
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
        queryKey: ["professional-service-contracts"],
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
export const useDeleteServiceContract = () => {
  const queryClient = useQueryClient();
  return useMutation<ServiceContractModel, Error, string>({
    mutationFn: (contractId: string) => deleteServiceContract(contractId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["professional-service-contracts"],
      });
    },
  });
};

export const useGetServiceContractById = (id: string) => {
  return useSuspenseQuery<ServiceContractFullModel, Error>({
    queryKey: ["professional-service-contracts", id],
    queryFn: () => getServiceContractById(id),
  });
};
