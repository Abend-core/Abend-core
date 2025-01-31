import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);
  const isAuthenticated = computed(() => user.value !== null);
  const isAdmin = computed(() => user.value?.isAdmin == true);

  function setUser(userData) {
    user.value = userData || {};
    sessionStorage.setItem("user", JSON.stringify(userData));
  }

  function storeSessionData(token, id) {
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("id", id);
  }

  function logout() {
    sessionStorage.clear();
    user.value = null;
  }

  function initializeAuth() {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
    }
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    setUser,
    storeSessionData,
    logout,
    initializeAuth,
  };
});
