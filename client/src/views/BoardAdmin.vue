<template>
  <main class="p-[20px]">
    <div
      class="w-full bg-[#F4F6FA] rounded-md p-[20px] dark:bg-gray-800 dark:text-white"
    >
      <div class="flex gap-5 mb-3 text-white">
        <p
          class="text-center bg-black p-1 rounded-md cursor-pointer"
          @click="setActiveSection('manageUsers')"
        >
          <i class="ri-group-3-fill mr-2"></i>Gérer les utilisateurs
        </p>
        <p
          class="text-center bg-black p-1 rounded-md cursor-pointer"
          @click="setActiveSection('manageModules')"
        >
          <i class="ri-layout-horizontal-line"></i>
          Gérer les modules
        </p>
      </div>
      <div class="mb-3">
        <div
          class="bg-white rounded-md p-[12px] dark:bg-gray-800 dark:text-white"
        >
          <h1 class="font-bold">Gestion des utilisateurs et des modules</h1>
          <p class="text-[#F82B30] mt-1">Administrateur Dashboard</p>
        </div>
      </div>
      <div v-if="activeSection === 'manageUsers'">
        <table-user />
      </div>

      <div v-if="activeSection === 'manageModules'">
        <table-module />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import tableModule from "../components/boardAdmin/tableModule.vue";
import tableUser from "../components/boardAdmin/tableUser.vue";

const activeSection = ref("manageUsers");
const setActiveSection = (section) => {
  activeSection.value = section;
};
</script>

<style scoped></style>
