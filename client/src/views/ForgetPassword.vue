<template>
  <main>
    <div class="m-auto w-[320px] mt-[80px]">
      <div class="pl-4 pr-4 pt-2">
        <NotificationMessage />
      </div>
      <img
        v-if="!isDark"
        class="w-[56px] h-[56px] mx-auto mb-3"
        src="../assets/images/abend-core-logo.png"
        alt="Logo principal connexion"
      />
      <img
        v-else
        class="w-[56px] h-[56px] mx-auto mb-3"
        src="../assets/images/abend-core-logo-dark.png"
        alt="Logo principal connexion"
      />
      <div>
        <h1 class="text-2xl text-center mb-3">Mot de passe oublié</h1>
      </div>
      <div class="flex flex-col p-4">
        <label class="mb-1" for="email-forget-pass"> Email</label>
        <input
          type="text"
          id="email-forget-pass"
          v-model="email"
          class="mb-4 bg-white text-black dark:text-white dark:bg-gray-800"
          required
        />
        <button
          class="w-full bg-customGreen text-white font-bold border border-black"
          type="submit"
        >
          Réinitialiser
        </button>
        <div class="text-sm mt-4">
          <p>
            Je ne l'ai pas oublié.
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
import { isDark } from "../utils/darkMode.js";
import NotificationMessage from "../components/notification/NotificationMessage.vue";

const email = ref("");
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
