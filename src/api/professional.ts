import { ProfessionalUserModel } from "@/models/user";
import api from ".";
export const getProfessional = async () => {
  const { data } = await api.get<ProfessionalUserModel>(`/professionals/`);
  return data;
};
