import apiClient from "../api/axios";

export const findAllModules = () => {
  return apiClient.get("/modules");
};
