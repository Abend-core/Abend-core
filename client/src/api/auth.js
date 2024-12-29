import apiClient from "../api/axios";

export const loginUser = (data) => {
  return apiClient.post("/login", data);
};

export const getUserInfos = (id) => {
  return apiClient.get(`/users/${id}`);
};

export const registrateUser = (data) => {
  return apiClient.post("/inscription", data);
};
