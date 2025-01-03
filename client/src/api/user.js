import apiClient from "../api/axios";

export const findAll = () => {
  return apiClient.get("/users");
};

export const filter = (data) => {
  return apiClient.post("/users/filtre", data);
};

export const addUser = () => {
  return apiClient.post("/users/add", data);
};

export const deleteUser = (id) => {
  return apiClient.post(`/users/${id}`);
};

export const getUserById = (id) => {
  return apiClient.get(`/users/${id}`);
};
