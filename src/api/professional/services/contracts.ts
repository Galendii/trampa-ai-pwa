import api from "@/api";
import {
  ServiceContractModel,
  ServiceContractPreviewModel,
  ServiceContractPreviewPayloadModel,
} from "@/models/service-contract";

export const getServiceContracts = async () => {
  const { data } = await api.get<ServiceContractModel[]>(`/contracts/`);
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
