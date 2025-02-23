<template>
  <main>
    <div class="m-auto w-[320px] mt-20">
      <LogoSwitch />
      <div>
        <h1 class="text-2xl text-center mb-2">Se connecter à Abnd.io</h1>
      </div>
      <div class="pl-4 pr-4 pt-2">
        <NotificationMessage />
      </div>
      <div class="p-4">
        <form action="" class="flex flex-col" @submit.prevent="handleLogin">
          <label class="mb-1" for="email-login">Email</label>
          <input
            type="text"
            id="email-login"
            v-model="mail"
            class="mb-4 bg-white text-black dark:text-white dark:bg-gray-900"
            required
          />
          <div class="position-relative relative">
            <label class="mb-1" for="password"> Mot de passe </label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="bg-white text-black dark:text-white dark:bg-gray-900"
              required
            />
            <router-link
              class="absolute text-xs underline top-0 right-0"
              id="forgot-password"
              to="/forgetPassword"
              >Mot de passe oublié ?
            </router-link>
            <button
              class="w-full mt-4 bg-customGreen text-white font-bold border border-black"
              type="submit"
            >
              Se connecter
            </button>
          </div>
        </form>
        <div class="text-sm mt-2">
          <p>
            Nouveau sur Abnd.io?
            <router-link class="underline" to="/registration"
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
import LogoSwitch from "../components/LogoSwitch.vue";
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
    setNotification(error.response.data.Erreur, "error");
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
