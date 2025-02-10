<template>
  <main
    class="flex flex-col items-center py-52 min-h-screen p-paddingMd max-w-[1400px] mx-auto text-center"
  >
    <NotificationMessage />

    <div
      class="mb-6 flex items-center justify-center w-16 h-16 bg-primaryRed text-white rounded-full shadow-lg"
    >
      <i class="ri-checkbox-circle-fill text-5xl"></i>
    </div>

    <p class="text-3xl font-semibold dark:text-white mb-4 text-gray-800">
      Validation du compte
    </p>

    <p class="text-gray-600 dark:text-gray-400 mb-6 text-lg">
      Cliquez sur le bouton ci-dessous pour finaliser l’activation de votre
      compte.
    </p>

    <button
      @click="validation"
      class="px-6 py-3 bg-primaryRed text-white font-medium rounded-md"
    >
      Vérifier mon compte
    </button>
  </main>
</template>

<script setup>
import { validationUser } from "../api/auth.js";
import NotificationMessage from "../components/notification/NotificationMessage.vue";
import { useNotificationStore } from "../stores/notificationStore.js";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const { setNotification } = useNotificationStore();

const token = route.params.token;

const validation = async () => {
  try {
    await validationUser(token);
    setNotification("Compte validé !", "success");

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    console.error(error);
  }
};
</script>
