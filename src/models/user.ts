export type UserModel = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  cpf: string;
  phone: string;
  createdAt: string;
  lastLogin: string;
  role: "client" | "professional";
};

export type ProfessionalUserModel = {
  code: string;
  companyName?: string;
  cnpj?: string;
} & UserModel;

export type ClientUserModel = {
  professionalReferralCode: string;
} & UserModel;
