import axios from "axios";

// Centre de contrôle de la bibliothèque Axios

// Récupération de l'url selon l'environnement (dev ou prod)
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Création d'une variable accessible partout par le client
const apiClient = axios.create({
  baseURL: apiUrl,
});

// Intercepteur de requête : ajoute le token d'authentification et le rôle de l'utilisateur à chaque requête
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
