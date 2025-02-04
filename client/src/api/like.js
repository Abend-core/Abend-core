import apiClient from "../api/axios";

export const toggleLike = (idModule) => {
  console.log(idModule);
  return apiClient.post(`/modules/liked/${idModule}`);
};
