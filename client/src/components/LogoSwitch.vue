<template>
  <img
    v-if="!isDark"
    class="w-[56px] h-[56px] mx-auto mb-3"
    :src="lightLogo"
    alt="Logo principal connexion"
  />
  <img
    v-else
    class="w-[56px] h-[56px] mx-auto mb-3"
    :src="darkLogo"
    alt="Logo principal connexion"
  />
</template>

<script setup>
import lightLogo from "../assets/images/abend-core-logo.png";
import darkLogo from "../assets/images/abend-core-logo-dark.png";
import { isDark } from "../utils/darkMode.js";
</script>
