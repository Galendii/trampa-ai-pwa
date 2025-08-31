import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { getLoggedUser, updateUser } from "@/api/users";
import { UserModel } from "@/models/user";

// export const useUsers = () => {
//   return useQuery<UserModel[], Error>({
//     queryKey: ["users"],
//     queryFn: getUsers,
//   });
// };

export const useUser = () => {
  return useSuspenseQuery<UserModel, Error>({
    queryKey: ["me"],
    queryFn: getLoggedUser,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserModel, Error, Partial<UserModel>>({
    mutationFn: updateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] }); // Invalida o cache de usuários após criação
    },
  });
};
