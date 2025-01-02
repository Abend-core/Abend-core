import apiClient from "../api/axios";

export const findAll = () => {
  return apiClient.get("/users");
};

export const filter = (data) => {
  return apiClient.post("/users/filtre", data);
};
