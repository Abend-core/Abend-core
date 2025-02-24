<template>
  <component :is="currentComponent" />
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore.js";
import Home from "./Home.vue";
import HomeDisconnected from "./HomeDisconnected.vue";

const authStore = useAuthStore();

const currentComponent = computed(() => {
  return authStore.isAuthenticated ? Home : HomeDisconnected;
});
</script>
