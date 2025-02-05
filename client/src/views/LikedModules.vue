<template>
  <div class="flex" v-for="module in modules" :key="module.id"></div>
</template>

<script setup>
import { ref } from "vue";
import { displayLikedModules } from "../api/like";

const modules = ref([]);

const allModulesLiked = async () => {
  try {
    const response = await displayLikedModules();
    modules.value = response.data.modules;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

allModulesLiked();
</script>
