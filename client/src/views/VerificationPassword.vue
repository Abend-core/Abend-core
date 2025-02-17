<template>
  <main>
    <div class="m-auto w-[320px] mt-20">
      <LogoSwitch />
      <div>
        <h1 class="text-2xl text-center mb-2">Modifier son mot de passe</h1>
      </div>
      <div class="pl-4 pr-4 pt-2">
        <NotificationMessage />
      </div>
      <div class="p-4">
        <form action="" class="flex flex-col" @submit.prevent="handleLogin">
          <label class="mb-1" for="email-login">Nouveau mot de passe</label>
          <input
            type="text"
            id="newPassword"
            v-model="newPassword"
            class="mb-4 bg-white text-black dark:text-white dark:bg-gray-900"
            required
          />
          <div class="position-relative relative">
            <label class="mb-1" for="password"
              >Confirmation du mot de passe</label
            >
            <input
              type="password"
              id="confirmNewPassword"
              v-model="confirmNewPassword"
              class="bg-white text-black dark:text-white dark:bg-gray-900"
              required
            />
            <button
              class="w-full mt-4 bg-customGreen text-white font-bold border border-black"
              type="submit"
            >
              Réinitialiser
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import NotificationMessage from "../components/notification/NotificationMessage.vue";
import LogoSwitch from "../components/LogoSwitch.vue";

const newPassword = ref("");
const confirmNewPassword = ref("");
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
