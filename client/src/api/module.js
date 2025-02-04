import apiClient from "../api/axios";

// Routes pour gérer les modules

// Récupération de tous les modules
export const findAllModules = () => {
  return apiClient.get("/modules");
};

// Récupération de tous les modules avec "show"
export const findAllModulesVisible = () => {
  return apiClient.get("/modules/show");
};

// Création
export const addModules = (data) => {
  return apiClient.post("/modules/", data);
};

// Suppression
export const deleteModule = (id) => {
  return apiClient.delete(`/modules/${id}`);
};

// Filtre selon le Nom et le Lien
export const filterModule = (data) => {
  return apiClient.post("/modules/filtre", data);
};

// Récupération des modules selon un id
export const getModuleById = (id) => {
  return apiClient.get(`/modules/${id}`);
};

// Modification selon un id et des données
export const updateModuleById = (id, data) => {
  return apiClient.put(`/modules/${id}`, data);
};
