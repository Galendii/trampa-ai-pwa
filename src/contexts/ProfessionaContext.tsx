// import React, { useContext, createContext, useState, useCallback } from "react";
// import { ProfessionalUserModel } from "@/models/user";
// import { useAuthContext } from "./AuthContext";
// // import { RefreshAccessToken } from "domain/models/refresh-access-token";

// type ProfessionalProviderProps = {
//   children: React.ReactElement;
//   professional: ProfessionalUserModel | null;
// };

// type ProfessionalContextProps = {
//   getProfessional: () => Promise<void>;
//   professional: ProfessionalUserModel | null;
// };
// export const ProfessionalContext = createContext(
//   {} as ProfessionalContextProps
// );

// export const useProfessionalContext = () => useContext(ProfessionalContext);

// export const ProfessionalProvider = ({
//   children,
//   professional: initialProfessional,
// }: // refreshAccessTokenService,
// ProfessionalProviderProps) => {
//   // const navigate = useNavigate();
//   const [professional, setProfessional] = useState<ProfessionalModel | null>(
//     initialProfessional
//   );
//   const { logout } = useAuthContext();
//   const isUserLoggedIn = !!professional;

//   const getProfessional = useCallback(async () => {
//     try {
//       const user = await getProfessionalService.execute();
//       setProfessional(user);
//     } catch (error) {
//       if (error instanceof UnauthorizedError) {
//         logout();
//       }
//     }
//   }, [getProfessionalService, logout]);

//   // const refreshAccessToken = useCallback(async () => {
//   //   try {
//   //     const tokens = getProfessionalenticationTokens();
//   //     if (tokens?.refreshToken) {
//   //       const { accessToken } = await refreshAccessTokenService.execute(
//   //         tokens.refreshToken
//   //       );
//   //       if (accessToken) {
//   //         setProfessionalenticationTokens({
//   //           refreshToken: tokens.refreshToken,
//   //           accessToken,
//   //         });
//   //       }
//   //     }
//   //   } catch (error) {
//   //     if (error instanceof UnauthorizedError) {
//   //       sessionValueSetter("role", "");
//   //       sessionValueSetter("authorization", "");
//   //       logout("/?session-expired=true");
//   //     }
//   //   }
//   // }, [
//   //   getProfessionalenticationTokens,
//   //   logout,
//   //   refreshAccessTokenService,
//   //   setProfessionalenticationTokens,
//   // ]);

//   return (
//     <ProfessionalContext.Provider value={{ getProfessional, professional }}>
//       {children}
//     </ProfessionalContext.Provider>
//   );
// };
