<template>
  <img
    v-if="!isDark"
    class="mx-auto mb-3"
    :style="{ width, height }"
    :src="lightLogo"
    alt="Logo principal connexion"
  />
  <img
    v-else
    class="mx-auto mb-3"
    :style="{ width, height }"
    :src="darkLogo"
    alt="Logo principal connexion"
  />
</template>

<script setup>
import lightLogo from "../assets/images/logo-abend.png";
import darkLogo from "../assets/images/logo-abend-dark.png";
import { isDark } from "../utils/darkMode.js";

defineProps({
  width: {
    type: String,
  },
  height: {
    type: String,
  },
});
</script>
