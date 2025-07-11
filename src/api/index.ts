import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import humps from "humps";

const api = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptores de requisição (ex: adicionar token de autenticação)
api.interceptors.request.use((config) => {
  const token = getCookie("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptores para lidar com snake_case para camelCase
api.interceptors.response.use((response) => {
  if (response.data) {
    response.data = humps.camelizeKeys(response.data);
  }
  return response;
});

// Interceptores de resposta (ex: lidar com erros 401/403)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirecionar para login ou refresh token
      [
        "accessToken",
        "refreshToken",
        "professionalEmail",
        "clientEmail",
        "role",
      ].forEach((key) => deleteCookie(key));
      console.log("Unauthorized, redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default api;
