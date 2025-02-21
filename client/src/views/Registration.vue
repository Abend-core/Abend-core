<template>
  <main>
    <div class="m-auto w-[360px] mt-20">
      <LogoSwitch />
      <div>
        <h1 class="text-2xl text-center mb-2">S'inscrire à Abnd.io</h1>
      </div>
      <div class="pl-4 pr-4 pt-2">
        <NotificationMessage />
      </div>
      <div class="p-4">
        <form class="flex flex-col" @submit.prevent="registration">
          <label class="mb-1" for="email-registration">Email </label>
          <input
            class="dark:text-white dark:bg-gray-900 mb-3"
            type="email"
            id="email-registration"
            v-model="email"
            required
          />
          <label class="mb-1" for="password"> Mot de passe </label>
          <input
            type="password"
            id="password"
            class="input-password mb-3 dark:text-white dark:bg-gray-900"
            v-model="password"
            required
          />
          <label class="mb-1" for="login"> Identifiant </label>
          <input
            class="dark:text-white dark:bg-gray-900"
            type="text"
            id="login"
            v-model="loginRegister"
            required
          />
          <button
            class="w-full mt-4 bg-customGreen text-white font-bold border border-black"
            type="submit"
          >
            Rejoindre Abnd.io !
          </button>
        </form>
        <div class="text-sm mt-2">
          <p>
            Déjà inscrit?
            <router-link class="underline" to="/login"
              >Se connecter</router-link
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
import { registrateUser } from "../api/auth";
import NotificationMessage from "../components/notification/NotificationMessage.vue";
import LogoSwitch from "../components/LogoSwitch.vue";
import { useNotificationStore } from "../stores/notificationStore.js";

const router = useRouter();

const { setNotification } = useNotificationStore();

const email = ref("");
const password = ref("");
const loginRegister = ref("");

const registration = async () => {
  const data = {
    mail: email.value,
    username: loginRegister.value,
    password: password.value,
    isAdmin: false,
  };

  try {
    await registrateUser(data);
    setNotification(
      "Veuillez vérifier votre compte. Pensez à surveiller vos courriers indésirables.",
      "warning"
    );
    email.value = "";
    password.value = "";
    loginRegister.value = "";
  } catch (error) {
    setNotification(error.response.data.Erreur, "error");
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
