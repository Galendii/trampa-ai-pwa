"use client";

import React, { useContext, createContext, useState, useCallback } from "react";
// import { RefreshAccessToken } from "domain/models/refresh-access-token";
import { UserModel } from "@/models/user";
import { AuthenticationModel } from "@/models/authentication";
import { deleteCookie, setCookie } from "cookies-next";

type InitialStateType = {
  user: UserModel | null;
  isUserLoggedIn: boolean;
  login: (auth: AuthenticationModel) => void;
  logout: (redirectUrl?: string) => void;
  refreshAccessToken?: () => Promise<void>;
};

type AuthProviderProps = {
  children: React.ReactElement;
  user?: UserModel | null;
};

const InitialState: InitialStateType = {
  user: null,
  isUserLoggedIn: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext(InitialState);

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({
  children,
  user: initialUser,
}: // refreshAccessTokenService,
AuthProviderProps) => {
  // const navigate = useNavigate();
  const [user, setUser] = useState<UserModel | null>(null);
  const isUserLoggedIn = !!user;
  const login = useCallback((auth: AuthenticationModel) => {
    const { access, refresh, ...user } = auth;

    setCookie("accessToken", access, { secure: true, sameSite: "strict" });
    setCookie("refreshToken", refresh, { secure: true, sameSite: "strict" });
    setCookie("role", user.role, { secure: true, sameSite: "strict" });

    const emailKey =
      user.role === "professional" ? "professionalEmail" : "clientEmail";
    setCookie(emailKey, user.email, { secure: true, sameSite: "strict" });

    setUser(user);
  }, []);

  const logout = useCallback(() => {
    [
      "accessToken",
      "refreshToken",
      "professionalEmail",
      "clientEmail",
      "role",
    ].forEach((key) => deleteCookie(key));
    setUser(null);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isUserLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
