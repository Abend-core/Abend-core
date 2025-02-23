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

// Récupération de tous les modules admin
export const findAllModulesAdmin = () => {
  return apiClient.get("/modules/showAdmin");
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
export const filterModule = () => {
  return apiClient.get(`/modules`);
};

// Récupération des modules selon un id
export const getModuleById = () => {
  return apiClient.get(`/modules/user`);
};

// Récupération des modules selon l'username
export const getInfosUserByUsername = (username) => {
  return apiClient.get(`/modules/user/${username}`);
};

// Modification selon un id et des données
export const updateModuleById = (id, data) => {
  return apiClient.patch(`/modules/${id}`, data);
};

export const countVisitor = (idModule) => {
  return apiClient.post(`/modules/visited/${idModule}`);
};

export const allTags = () => {
  return apiClient.get("/modules/tags");
};

export const displayStats = () => {
  return apiClient.get("/stats");
};

export const displayMostVisited = () => {
  return apiClient.get("/visite");
};
