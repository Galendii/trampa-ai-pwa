import { AuthenticationModel, UserLoginType } from "@/models/authentication";

import api from ".";

export const login = async (
  email: string,
  password: string,
  userType: UserLoginType
) => {
  const { data } = await api.post<AuthenticationModel>(`/${userType}/login/`, {
    email,
    password,
  });
  return data;
};
