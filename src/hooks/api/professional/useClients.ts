import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getClientById, getClients, registerClient } from "@/api/professional";
import {
  PageDataModel,
  PaginatedResponseModel,
} from "@/models/paginated-response";
import { ClientUserModel } from "@/models/user";

export const useGetClients = (pageData?: PageDataModel) => {
  return useQuery<PaginatedResponseModel<ClientUserModel>, Error>({
    queryKey: ["professional-clients"],
    queryFn: () => getClients(pageData || { page: 1 }),
  });
};

export const useGetByClientId = (id: string) => {
  return useQuery<ClientUserModel, Error>({
    queryKey: ["professional-client", id],
    queryFn: () => getClientById(id),
    enabled: !!id,
  });
};
// Define the type for the data sent to the API
type ClientRegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  cpf: string;
};

export const useClientRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<ClientUserModel, Error, ClientRegisterData>({
    mutationFn: registerClient,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["professional-clients"] });
      toast.success(`Cliente ${data.firstName} pré-cadastrado com sucesso!`);
    },
    onError: (error) => {
      // Provide clear feedback on failure
      toast.error(`Erro ao cadastrar cliente: ${error.message}`);
    },
  });
};
