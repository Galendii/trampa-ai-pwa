import { ServiceModel } from "./service";

export type UserModel = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  phone: string;
  createdAt: string;
  lastLogin: string;
  status?: "active" | "pending-account-creation" | "user-deactivated";
  role: "client" | "professional";
};

export type ProfessionalUserModel = {
  code: string;
  companyName?: string;
  cnpj?: string;
} & UserModel;

export type ClientUserModel = {
  professionalReferralCode?: string;
  services?: ServiceModel[];
} & UserModel;
