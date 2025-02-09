import apiClient from "../api/axios";

// Routes pour gérer l'authentification des utilisateurs

// Inscription
export const registrateUser = (data) => {
  return apiClient.post("auth/register", data);
};

// Connexion
export const loginUser = (data) => {
  return apiClient.post("auth/signin", data);
};

// Récupération des informations liées à l'utilisateur selon son id
export const getUserInfos = (id) => {
  return apiClient.get(`/users/${id}`);
};

export const validationUser = (token) => {
  return apiClient.post("/auth/", token);
};
