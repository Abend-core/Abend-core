import apiClient from "../api/axios";

export const findAllModules = () => {
  return apiClient.get("/modules");
};

export const addModules = (data) => {
  return apiClient.post("/modules/add", data);
};

export const deleteModule = (id) => {
  return apiClient.post(`/modules/delete/${id}`);
};

export const filterModule = (data) => {
  return apiClient.post("/modules/filtre", data);
};

export const getModuleById = (id) => {
  return apiClient.get(`/modules/${id}`);
};

export const updateModuleById = (id, data) => {
  return apiClient.post(`/modules/update/${id}`, data);
};
