import { ClientUserModel, ProfessionalUserModel } from "@/models/user";
import api from "@/api";
import { PaginatedResponseModel } from "@/models/paginated-response";
export const getProfessionalDetails = async () => {
  const { data } = await api.get<ProfessionalUserModel>(
    `/professionals/details/`
  );
  return data;
};

export const getClients = async ({ page }: { page: number }) => {
  const { data } = await api.get<PaginatedResponseModel<ClientUserModel>>(
    `/professionals/management/clients/`,
    {
      params: {
        page,
      },
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
