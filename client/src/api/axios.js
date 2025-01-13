import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://192.168.1.107:5000",
});

apiClient.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("authToken");
  const isAdmin = sessionStorage.getItem("isAdmin");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.role = isAdmin;
  }
  return config;
});

export default apiClient;
