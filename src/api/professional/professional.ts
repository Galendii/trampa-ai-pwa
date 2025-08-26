import api from "@/api";
import { ProfessionalUserModel } from "@/models/user";
export const getProfessionalDetails = async () => {
  const { data } = await api.get<ProfessionalUserModel>(
    `/professionals/details/`
  );
  return data;
};
