import { PlanModel } from "./plan";

export type ServiceModel = {
  name: string;
  description?: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  professional: number;
  plans: PlanModel[];
};
