"use client";

import { useCallback } from "react";

import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

import { googleLogin } from "@/api/authentication";
import { GoogleAuthenticationModel } from "@/models/authentication";
// import { jwtDecode } from "jwt-decode"; // Use a library to decode the token if needed

type GoogleLoginButtonProps = {
  onSuccess: (data: GoogleAuthenticationModel) => void;
  onError: (error: Error) => void;
  roleIntent: "client" | "professional";
};

export default function GoogleLoginButton({
  onSuccess,
  onError,
  roleIntent,
}: GoogleLoginButtonProps) {
  const handleLoginSuccess = useCallback(
    async (credentialResponse: GoogleCredentialResponse) => {
      // The credentialResponse object contains the id_token.
      const idToken = credentialResponse.credential;

      try {
        if (!idToken) {
          throw Error("Google authentication failed");
        }
        // Send the id_token to your Django backend.
        const apiResponse = await googleLogin({
          idToken: idToken,
          role: roleIntent,
        })
          .then((data) => onSuccess(data))
          .catch(toast.error);
        console.log(apiResponse);
      } catch (error) {
        console.error("An error occurred during the login process:", error);
        onError(error as Error);
      }
    },
    [onError, onSuccess, roleIntent]
  );

  const handleLoginError = useCallback(() => {
    console.log("Login Failed");
    toast.error("Login Failed");
  }, []);

  return (
    <GoogleLogin
      text="continue_with"
      theme="filled_blue"
      onSuccess={handleLoginSuccess}
      onError={handleLoginError}
      useOneTap // Optional: for a smoother login experience
    />
  );
}
