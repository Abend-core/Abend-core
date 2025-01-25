import apiClient from "../api/axios";

export const uploadImageModule = (data) => {
  console.log("Form Data envoyé :");
  data.forEach((value, key) => {
    console.log(key, value);
  });
  return apiClient.post("/modules/uploadImg", data);
};

export const uploadImageDashboard = (data) => {
  return apiClient.post("/upload/module", data);
};
