<template>
  <div>
    <NotificationMessage />
    <p>Validation du compte</p>
    <button @click="validation">Vérifier mon compte</button>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { validationUser } from "../api/auth.js";
import NotificationMessage from "../components/notification/NotificationMessage.vue";
import { useNotificationStore } from "../stores/notificationStore.js";

const { route, router } = useRoute();

const { setNotification } = useNotificationStore();

const token = route.params.token;

const validation = async () => {
  try {
    await validationUser(token);
    setNotification("Compte validé !", "success");
    setInterval(() => {
      router.push("/login");
    }, 3000);
  } catch (error) {
    console.log(error);
  }
};
</script>
