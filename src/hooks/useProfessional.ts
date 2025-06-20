import { getClients, getClientById } from "@/api/professional";
import { ClientUserModel } from "@/models/user";
import { useQuery } from "@tanstack/react-query";

export const useClients = () => {
  return useQuery<ClientUserModel[], Error>({
    queryKey: ["professional-clients"],
    queryFn: getClients,
  });
};

export const useClientId = (id: string) => {
  return useQuery<ClientUserModel, Error>({
    queryKey: ["professional-client", id],
    queryFn: () => getClientById(id),
  });
};
