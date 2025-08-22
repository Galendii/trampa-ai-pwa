import { getClients, getClientById } from "@/api/professional/professional";
import { PaginatedResponseModel } from "@/models/paginated-response";
import { ClientUserModel } from "@/models/user";
import { useQuery } from "@tanstack/react-query";

export const useGetClients = () => {
  return useQuery<PaginatedResponseModel<ClientUserModel>, Error>({
    queryKey: ["professional-clients"],
    queryFn: () => getClients({ page: 1 }),
  });
};

export const useGetByClientId = (id: string) => {
  return useQuery<ClientUserModel, Error>({
    queryKey: ["professional-client", id],
    queryFn: () => getClientById(id),
    enabled: !!id,
  });
};
