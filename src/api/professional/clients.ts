import api from "@/api";
import {
  PageDataModel,
  PaginatedResponseModel,
} from "@/models/paginated-response";
import { ClientUserModel } from "@/models/user";

// ... (existing functions like getProfessionalDetails, getClients, etc.)

// --- ADD THIS NEW FUNCTION ---
export const registerClient = async (clientData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
}) => {
  // Clean the data before sending it to the backend
  const payload = {
    first_name: clientData.firstName,
    last_name: clientData.lastName,
    email: clientData.email,
    phone: clientData.phone.replace(/\D/g, ""), // Remove non-digit characters
    cpf: clientData.cpf.replace(/\D/g, ""), // Remove non-digit characters
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
