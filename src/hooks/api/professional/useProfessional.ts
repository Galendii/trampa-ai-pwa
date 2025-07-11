import { getClients, getClientById } from "@/api/professional/professional";
import { ClientUserModel } from "@/models/user";
import { useQuery } from "@tanstack/react-query";

export const useGetClients = () => {
  return useQuery<ClientUserModel[], Error>({
    queryKey: ["professional-clients"],
    queryFn: getClients,
  });
};

export const useGetByClientId = (id: string) => {
  return useQuery<ClientUserModel, Error>({
    queryKey: ["professional-client", id],
    queryFn: () => getClientById(id),
  });
};
