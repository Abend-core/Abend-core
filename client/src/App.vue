<template>
  <Layout />
</template>

<script setup>
import Layout from "./layouts/Layout.vue";
import { provide } from "vue";
import { isDark, toggleDarkMode } from "./store/darkMode";

provide("isDark", isDark);
provide("toggleDarkMode", toggleDarkMode);
</script>
