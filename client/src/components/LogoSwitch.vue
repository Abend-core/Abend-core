<template>
  <img
    v-if="!isDark"
    class="w-[65px] h-[65px] mx-auto mb-3"
    :src="lightLogo"
    alt="Logo principal connexion"
  />
  <img
    v-else
    class="w-[65px] h-[65px] mx-auto mb-3"
    :src="darkLogo"
    alt="Logo principal connexion"
  />
</template>

<script setup>
import lightLogo from "../assets/images/logo-abend.png";
import darkLogo from "../assets/images/logo-abend-dark.png";
import { isDark } from "../utils/darkMode.js";
</script>
