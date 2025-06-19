import { UserModel } from "@/models/user";
import api from "./index";

export const getLoggedUser = async (): Promise<UserModel> => {
  const response = await api.get("/users/me/");
  return response.data;
};

export const getUserById = async (id: string): Promise<UserModel> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (
  userData: Partial<UserModel>
): Promise<UserModel> => {
  const response = await api.post("/users", userData);
  return response.data;
};
