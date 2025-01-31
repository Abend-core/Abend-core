import apiClient from "../api/axios";

// Route pour gérer les images

// Récupération de l'image
export const uploadImageModule = (data) => {
  return apiClient.put("/modules/image", data);
};
