import apiClient from "../api/axios";

export const loginUser = (data) => {
  return apiClient.post("auth/signin", data);
};

export const getUserInfos = (id) => {
  return apiClient.get(`/users/${id}`);
};

export const registrateUser = (data) => {
  return apiClient.post("auth/register", data);
};
