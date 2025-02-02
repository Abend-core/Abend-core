import { ref } from "vue";
import { loginUser, getUserInfos } from "../api/auth";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import { startTokenTimer } from "../utils/timerToken";

export const useAuth = () => {
  const authStore = useAuthStore();
  const router = useRouter();
  const errorMessage = ref("");

  const login = async (mail, password) => {
    try {
      const data = { mail, password };
      const response = await loginUser(data);
      const { token, UUID: id } = response.data;
      authStore.storeSessionData(token, id);

      startTokenTimer(token, router, authStore);

      return id;
    } catch (error) {
      errorMessage.value = error.response?.data?.message || error.message;
      throw error;
    }
  };

  const userInfos = async (id) => {
    try {
      const response = await getUserInfos(id);
      const userData = response.data.user;
      sessionStorage.setItem("isAdmin", JSON.stringify(userData.isAdmin));
      return userData;
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw error;
    }
  };

  return {
    login,
    userInfos,
    errorMessage,
  };
};
