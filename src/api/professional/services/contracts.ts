import api from "@/api";
import { ContractFiltersType } from "@/components/contracts/components/contracts-filter";
import {
  PageDataModel,
  PaginatedResponseModel,
} from "@/models/paginated-response";
import {
  CreateContractFormData,
  ServiceContractFullModel,
  ServiceContractModel,
  ServiceContractPreviewModel,
  ServiceContractPreviewPayloadModel,
} from "@/models/service-contract";

export const getServiceContracts = async (
  pageData: PageDataModel & ContractFiltersType
) => {
  const { data } = await api.get<
    PaginatedResponseModel<ServiceContractFullModel>
  >(`/contracts/`, {
    params: pageData,
  });
  return data;
};

export const getContractPreview = async (
  contractData: ServiceContractPreviewPayloadModel
) => {
  const { data } = await api.post<ServiceContractPreviewModel>(
    `/contracts/preview/`,
    contractData
  );
  return data;
};

export const createServiceContract = async (
  contractData: CreateContractFormData
) => {
  const { data } = await api.post<ServiceContractModel>(
    `/contracts/`,
    contractData
  );
  return data;
};

export const signServiceContract = async (contractId: string) => {
  const { data } = await api.post<ServiceContractModel>(
    `/contracts/${contractId}/sign/`
  );
  return data;
};
