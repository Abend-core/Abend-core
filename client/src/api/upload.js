import apiClient from "../api/axios";

export const uploadImageModule = (data) => {
  return apiClient.post("/upload/module", data);
};
