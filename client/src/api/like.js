import apiClient from "../api/axios";

export const toggleLike = (data) => {
  return apiClient.post("/modules/liked", data);
};
