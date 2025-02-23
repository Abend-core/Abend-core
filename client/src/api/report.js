import apiClient from "../api/axios";

export const toggleReport = (idModule) => {
  return apiClient.post(`/modules/reported/${idModule}`);
};

export const displayReportedModules = () => {
  return apiClient.get("/modules/reported");
};
