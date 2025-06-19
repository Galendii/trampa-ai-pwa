import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, getLoggedUser } from "@/api/users";
import { UserModel } from "@/models/user";

// export const useUsers = () => {
//   return useQuery<UserModel[], Error>({
//     queryKey: ["users"],
//     queryFn: getUsers,
//   });
// };

export const useUser = () => {
  return useQuery<UserModel, Error>({
    queryKey: ["me"],
    queryFn: getLoggedUser,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation<UserModel, Error, Partial<UserModel>>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] }); // Invalida o cache de usuários após criação
    },
  });
};
