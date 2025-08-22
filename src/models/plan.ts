export type PlanModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  price: number;
  duration: number;
  frequency: number;
  active: boolean;
  service: string;
};
export type PlanCreateModel = Omit<
  PlanModel,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
