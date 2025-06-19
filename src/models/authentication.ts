// import { UserModel } from './user-model';

import { UserModel } from "./user";
export type UserLoginType = "clients" | "professionals";

export type AuthenticationModel = {
  access: string | null;
  refresh: string | null;
} & UserModel;

export type LoginRequestModel = {
  email: string;
  password: string;
  userType: UserLoginType;
};
