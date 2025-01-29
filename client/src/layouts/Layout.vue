<template>
  <div class="flex flex-col h-screen">
    <Header />
    <div class="flex-1 dark:bg-gray-800 dark:text-white">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import Header from "../layouts/Header.vue";
</script>

<style></style>
