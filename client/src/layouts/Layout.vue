<template>
  <div class="flex flex-col bg-white dark:bg-gray-800">
    <Header />
    <div class="flex-1 dark:bg-gray-800 dark:text-white">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from "../layouts/Header.vue";
</script>
