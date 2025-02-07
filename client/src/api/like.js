import apiClient from "../api/axios";

export const toggleLike = (idModule) => {
  return apiClient.post(`/modules/liked/${idModule}`);
};

export const displayLikedModules = () => {
  return apiClient.get("/modules/liked");
};
