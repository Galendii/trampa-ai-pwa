import { ClientUserModel, ProfessionalUserModel } from "@/models/user";
import api from ".";
export const getProfessionalDetails = async () => {
  const { data } = await api.get<ProfessionalUserModel>(
    `/professionals/details/`
  );
  return data;
};

export const getClients = async () => {
  const { data } = await api.get<ClientUserModel[]>(`/professionals/clients/`);
  return data;
};
export const getClientById = async (id: string) => {
  const { data } = await api.get<ClientUserModel>(
    `/professionals/clients/${id}`
  );
  return data;
};
