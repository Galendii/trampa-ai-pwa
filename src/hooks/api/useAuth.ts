import { login } from "@/api/authentication";
import {
  AuthenticationModel,
  LoginRequestModel,
} from "@/models/authentication";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation<AuthenticationModel, Error, LoginRequestModel>({
    mutationFn: (loginData: LoginRequestModel) =>
      login(loginData.email, loginData.password, loginData.userType),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] }); // Invalida o cache de usuários após criação
    },
  });
};
