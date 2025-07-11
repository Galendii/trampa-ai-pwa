import { PlanModel } from "./plan";
import { ServiceModel } from "./service";
import { ClientUserModel, ProfessionalUserModel } from "./user";

export enum PaymentMethods {
  CREDIT_CARD = "credit-card",
  DEBIT_CARD = "debit-card",
  PIX = "pix",
  CASH = "cash",
}

export type ContractSignatureModel = {
  id: string;
  client: string;
  professional: string;
  professionalSignatureDate?: string;
  clientSignatureDate?: string;
  signatureDate?: string;
};

export type WeekdayTimeModel = {
  weekday: string;
  time: string;
};

export type ServiceContractModel = {
  id: number | string;
  plan: string;
  client: string;
  service: string;
  professional: string;
  signature?: ContractSignatureModel;
  startingDate: Date;
  endingDate: Date;
  cancellationTerms: string;
  rescheduleTerms: string;
  installmentAmount: string;
  paymentMethod: string;
  firstPaymentDate: Date;
  installments: string;
  updatedAt: string;
  createdAt: string;
  label: string;
  attendance: WeekdayTimeModel[];
};

export type ServiceContractFullModel = {
  id: number | string;
  plan: PlanModel;
  client: ClientUserModel;
  service: ServiceModel;
  professional: ProfessionalUserModel;
  signature?: ContractSignatureModel;
  startingDate: Date;
  endingDate: Date;
  cancellationTerms: string;
  rescheduleTerms: string;
  installmentAmount: string;
  paymentMethod: string;
  firstPaymentDate: Date;
  installments: string;
  updatedAt: string;
  createdAt: string;
  label: string;
  attendance: WeekdayTimeModel[];
};

export type ServiceContractPreviewPayloadModel = Omit<
  ServiceContractModel,
  "id" | "createdAt" | "updatedAt"
>;
export type ServiceContractPreviewModel = {
  contractUrl: string;
};
