export type PlanModel = {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  name: string;
  price: string;
  duration: number;
  frequency: number;
  active: boolean;
};
export type PlanCreateModel = Omit<
  PlanModel,
  "id" | "createdAt" | "updatedAt" | "deletedAt"
>;
