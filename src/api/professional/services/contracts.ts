import api from "@/api";
import { PaginatedResponseModel } from "@/models/paginated-response";
import {
  ServiceContractFullModel,
  ServiceContractModel,
  ServiceContractPreviewModel,
  ServiceContractPreviewPayloadModel,
} from "@/models/service-contract";

export const getServiceContracts = async (pageData: any) => {
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
  contractData: ServiceContractModel
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
