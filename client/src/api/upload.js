import apiClient from "../api/axios";

export const uploadImageModule = (data) => {
  return apiClient.post("/upload/module", data);
};

export const uploadImageDashbaord = (data) => {
  return apiClient.post("/upload/module", data);
};
