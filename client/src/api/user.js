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
  return apiClient.post(`/users/delete/${id}`);
};

export const getUserById = (id) => {
  return apiClient.get(`/users/${id}`);
};

export const editUserById = (id, data) => {
  return apiClient.post(`/users/update/${id}`, data);
};

export const editPasswordById = (data) => {
  return apiClient.post("/users/password/", data);
};

export const updateImgProfil = (data) => {
  return apiClient.post("/users/updateImg/", data);
};
