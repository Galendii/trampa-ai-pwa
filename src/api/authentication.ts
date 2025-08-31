import {
  AuthenticationModel,
  GoogleAuthenticationModel,
  UserLoginType,
} from "@/models/authentication";

import api from ".";

export const login = async (
  email: string,
  password: string,
  userType: UserLoginType
) => {
  try {
    const { data } = await api.post<AuthenticationModel>(
      `/${userType}/login/`,
      {
        email,
        password,
      }
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const googleLogin = async (payload: {
  idToken: string;
  role: string;
}): Promise<GoogleAuthenticationModel> => {
  try {
    const { data } = await api.post<GoogleAuthenticationModel>(
      `/google/auth/account/`,
      payload
    );
    return data;
  } catch (error: any) {
    console.log(error);
    throw error as Error;
  }
};
