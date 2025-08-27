import { create } from "zustand";

import { getProfessionalDetails } from "@/api/professional";
import { ProfessionalUserModel } from "@/models/user";

// Define the shape of our store's state and actions
type ProfessionalState = {
  professional: ProfessionalUserModel | null;
  isLoading: boolean;
  fetchProfessional: () => Promise<void>;
};

export const useProfessionalStore = create<ProfessionalState>((set) => ({
  professional: null,
  isLoading: true,
  fetchProfessional: async () => {
    set({ isLoading: true });
    try {
      const professionalData = await getProfessionalDetails();
      set({ professional: professionalData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch professional details", error);
      set({ professional: null, isLoading: false });
    }
  },
}));
