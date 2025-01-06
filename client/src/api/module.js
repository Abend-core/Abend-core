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
