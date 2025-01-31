<template>
  <Layout />
</template>

<script setup>
import Layout from "./layouts/Layout.vue";
import { useNotificationStore } from "./stores/notificationStore";
import { useRoute } from "vue-router";
import { watch } from "vue";

const route = useRoute();
const { clearNotification } = useNotificationStore();

//à chaque fois que route.path change (c'est-à-dire quand l'utilisateur change de page), la fonction est exécutée,
// donc efface la notification
watch(
  () => route.path,
  () => {
    clearNotification();
  }
);
</script>
