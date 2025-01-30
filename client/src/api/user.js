import apiClient from "../api/axios";

export const findAll = () => {
  return apiClient.get("/users");
};

export const filter = (data) => {
  return apiClient.post("/users/filtre", data);
};

export const addUser = (data) => {
  return apiClient.post("/users/add", data);
};

export const deleteUser = (id) => {
  return apiClient.delete(`/users/${id}`);
};

export const getUserById = (id) => {
  return apiClient.get(`/users/${id}`);
};

export const editUserById = (id, data) => {
  return apiClient.put(`/users/${id}`, data);
};

export const editPasswordById = (data) => {
  return apiClient.patch("/users/password", data);
};

export const updateImgProfil = (data) => {
  return apiClient.patch("/users/image", data);
};
