import apiClient from "../api/axios";

// Route pour gérer les utilisateurs

// Récupération de tous les utilisateurs
export const findAll = () => {
  return apiClient.get("/users");
};

// Filtre selon l'Email et l'Identifiant
export const filter = (data) => {
  return apiClient.post("/users/filtre", data);
};

// Création
export const addUser = (data) => {
  return apiClient.post("/users/", data);
};

// Suppression
export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

// Récupération d'un utilisateur selon un id
export const getUserById = (id) => {
  return apiClient.get(`/users/${id}`);
};

// Modification des informations selon un id et des données
export const editUserById = (id, data) => {
  return apiClient.patch(`/users/${id}`, data);
};

// Modification du mot de passe
export const editPasswordById = (data) => {
  return apiClient.put("/users/password", data);
};

// Modification de la photo de profil
export const updateImgProfil = (data) => {
  return apiClient.put("/users/image", data);
};

//Suivre un utilisateur
export const follow = (id) => {
  return apiClient.post(`/users/follow/${id}`);
};
