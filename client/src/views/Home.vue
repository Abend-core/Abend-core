<template>
  <div>
    <!-- <img
          class="blur-sm w-full h-full object-cover"
          src="../assets/images/abend-core-logo.png"
          alt="Logo"
    /> -->

    <div
      class="flex items-center justify-center gap-10 mt-[50px]"
      v-for="module in modules"
      :key="module.id"
    >
      <a
        :href="module.link"
        class="carre"
        :style="{ backgroundColor: module.color }"
      ></a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { findAllModules } from "../api/module";

const modules = ref([]);
const getModules = async () => {
  try {
    const response = await findAllModules();
    modules.value = response.data.module;
  } catch (error) {
    console.error(error);
  }
};

getModules();
</script>

<style scoped>
.carre {
  width: 112px;
  height: 112px;
}
</style>
