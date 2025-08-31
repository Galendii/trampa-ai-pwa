import { deleteCookie, setCookie } from "cookies-next";
import { create } from "zustand";

import { GoogleAuthenticationModel } from "@/models/authentication";
import { UserModel } from "@/models/user";

type AuthStore = {
  user: UserModel | null;
  isUserLoggedIn: boolean;
  login: (auth: GoogleAuthenticationModel) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isUserLoggedIn: false,
  login: (auth) => {
    const { access, refresh, user } = auth;
    setCookie("accessToken", access);
    setCookie("refreshToken", refresh);
    setCookie("role", user.role);
    set({ user, isUserLoggedIn: true });
  },
  logout: () => {
    ["accessToken", "refreshToken", "role"].forEach((key) => deleteCookie(key));
    set({ user: null, isUserLoggedIn: false });
  },
}));
