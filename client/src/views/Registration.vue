<template>
  <main>
    <div class="m-auto w-[360px] mt-[80px]">
      <img
        v-if="!isDark"
        class="w-[56px] h-[56px] mx-auto mb-[12px]"
        src="../assets/images/abend-core-logo.png"
        alt="Logo principal connexion"
      />
      <img
        v-else
        class="w-[56px] h-[56px] mx-auto mb-[12px]"
        src="../assets/images/abend-core-logo-dark.png"
        alt="Logo principal connexion"
      />
      <div>
        <h1 class="text-2xl text-center mb-[10px]">S'inscrire à Abend-core</h1>
      </div>
      <div class="pl-[16px] pr-[16px] pt-[8px]">
        <NotificationMessage />
      </div>
      <div class="p-[16px]">
        <form class="flex flex-col" @submit.prevent="registration">
          <label for="email"> Email </label>
          <input
            class="dark:text-white dark:bg-gray-900"
            type="email"
            id="email"
            v-model="email"
            required
          />
          <label for="password"> Mot de passe </label>
          <input
            type="password"
            id="password"
            class="input-password mb-[6px] dark:text-white dark:bg-gray-900"
            v-model="password"
            minlength="8"
            required
          />
          <label for="login"> Identifiant </label>
          <input
            class="dark:text-white dark:bg-gray-900"
            type="text"
            id="login"
            v-model="loginRegister"
            required
          />
          <button
            class="w-full mt-[6px] bg-customGreen text-white font-bold border border-black"
            type="submit"
          >
            Rejoindre Abend-core !
          </button>
        </form>
        <div class="text-[14px] mt-[16px]">
          <p>
            Déjà inscrit?
            <router-link class="underline" to="/connexion"
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
import { useNotificationStore } from "../stores/notificationStore.js";
import { isDark } from "../utils/darkMode.js";

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
    isLog: false,
  };

  try {
    await registrateUser(data);
    router.push("/connexion");
  } catch (error) {
    setNotification(error.response?.data?.errors[0], "error");
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

label {
  margin-bottom: 4px;
}

input:not(.input-password) {
  margin-bottom: 6px;
}

input,
button {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 6px;
}
</style>
