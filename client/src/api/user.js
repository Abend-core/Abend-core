import apiClient from "../api/axios";

export const findAll = () => {
  return apiClient.get("/users");
};
