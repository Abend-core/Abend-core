import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("errorStore", () => {
  const errorMessage = ref("");

  const setError = (message) => {
    errorMessage.value = message;
  };

  const clearError = () => {
    errorMessage.value = "";
  };

  return { errorMessage, setError, clearError };
});
