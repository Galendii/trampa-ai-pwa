import { create } from "zustand";

import { getLoggedUser } from "@/api/users";
import { UserModel } from "@/models/user";

// Define the shape of our store's state and actions
type UserState = {
  user: UserModel | null;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  setUser: (user: UserModel) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: true,
  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const userData = await getLoggedUser();
      set({ user: userData, isLoading: false });
    } catch (error) {
      console.error("Failed to fetch user details", error);
      set({ user: null, isLoading: false });
    }
  },
  setUser: (user) => {
    set({ user });
  },
}));
