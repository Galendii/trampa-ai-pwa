// import { UserModel } from './user-model';

import { UserOnboardingProgressModel } from "./onboarding";
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

export type GoogleAuthenticationModel = {
  access: string;
  refresh: string;
  isNewUser: boolean;
  onboarding: UserOnboardingProgressModel;
  user: UserModel;
};
