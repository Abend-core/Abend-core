import { defineStore } from "pinia";
import { ref } from "vue";

export const useSuccessStore = defineStore("successStore", () => {
  const successMessage = ref("");

  const setSuccess = (message) => {
    successMessage.value = message;
  };

  const clearSuccess = () => {
    successMessage.value = "";
  };

  return { successMessage, setSuccess, clearSuccess };
});
