import api from "@/api";
import {
  PageDataModel,
  PaginatedResponseModel,
} from "@/models/paginated-response";
import { ServiceContractFullModel } from "@/models/service-contract";
import { ClientUserModel } from "@/models/user";

export const registerClient = async (clientData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
}) => {
  const payload = {
    first_name: clientData.firstName,
    last_name: clientData.lastName,
    email: clientData.email,
    phone: clientData.phone.replace(/\D/g, ""),
    cpf: clientData.cpf.replace(/\D/g, ""),
  };

  const { data } = await api.post<ClientUserModel>(
    `/professionals/management/clients/client-register/`,
    payload
  );
  return data;
};

export const getClients = async (pageData: PageDataModel) => {
  const { data } = await api.get<PaginatedResponseModel<ClientUserModel>>(
    `/professionals/management/clients/`,
    {
      params: pageData,
    }
  );
  return data;
};
export const getClientById = async (id: string) => {
  const { data } = await api.get<ClientUserModel>(
    `/professionals/management/clients/${id}`
  );
  return data;
};

export const getClientContracts = async (id: string) => {
  const { data } = await api.get<ServiceContractFullModel[]>(
    `/professionals/management/clients/${id}/contracts/`
  );
  return data;
};
