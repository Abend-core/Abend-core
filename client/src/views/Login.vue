<template>
  <main>
    <div class="m-auto w-[320px] mt-[80px]">
      <LogoLogin />
      <div>
        <h1 class="text-2xl text-center mb-[10px]">
          Se connecter à Abend-core
        </h1>
      </div>
      <div class="pl-[16px] pr-[16px] pt-[8px]">
        <NotificationMessage />
      </div>
      <div class="p-[16px]">
        <form action="" class="flex flex-col" @submit.prevent="handleLogin">
          <label class="mb-[4px]" for="mail">Email</label>
          <input
            type="text"
            id="mail"
            v-model="mail"
            class="mb-[8px] bg-white text-black dark:text-white dark:bg-gray-900"
            required
          />
          <div class="position-relative relative">
            <label class="mb-[4px]" for="password"> Mot de passe </label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mb-[16px] bg-white text-black dark:text-white dark:bg-gray-900"
              required
            />
            <router-link
              class="absolute text-[12px] underline top-0 right-0"
              id="forgot-password"
              to="/forgetPassword"
              >Mot de passe oublié ?
            </router-link>
            <button
              class="w-full bg-customGreen text-white font-bold border border-black"
              type="submit"
            >
              Se connecter
            </button>
          </div>
        </form>
        <div class="text-sm mt-[16px]">
          <p>
            Nouveau sur Abend-core?
            <router-link class="underline" to="/inscription"
              >Créer un compte</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";
import LogoLogin from "../components/login/LogoLogin.vue";
import NotificationMessage from "../components/notification/NotificationMessage.vue";
import { useNotificationStore } from "../stores/notificationStore.js";
import { useAuthStore } from "../stores/authStore";

const router = useRouter();

const { login, userInfos } = useAuth();

const authStore = useAuthStore();
const { setNotification } = useNotificationStore();

const mail = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const id = await login(mail.value, password.value);
    const userData = await userInfos(id);
    authStore.setUser(userData);
    router.push("/");
  } catch (error) {
    setNotification(error.response?.data?.message, "error");
  } finally {
    mail.value = "";
    password.value = "";
  }
};
</script>

<style scoped>
label,
input {
  display: block;
  width: 100%;
}

input {
  border: 1px solid #d1d9e0;
}

input,
button {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 6px;
}
</style>
