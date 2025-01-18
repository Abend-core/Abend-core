<template>
  <main class="p-[20px]">
    <div class="w-full bg-[#F4F6FA] rounded-md p-[20px]">
      <div class="flex gap-5 mb-3 text-white">
        <p
          class="bg-black p-1 rounded-md cursor-pointer"
          @click="setActiveSection('manageUsers')"
        >
          Gérer les utilisateurs
        </p>
        <p
          class="bg-black p-1 rounded-md cursor-pointer"
          @click="setActiveSection('manageModules')"
        >
          Gérer les modules
        </p>
      </div>
      <div class="mb-5">
        <div class="bg-white rounded-md p-[12px]">
          <h1 class="font-bold">Gestion des utilisateurs et des modules</h1>
          <p class="text-[#4954ecde] mt-1">Administrateur Dashboard</p>
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
import tableModule from "../components/tableModule.vue";
import tableUser from "../components/tableUser.vue";

const activeSection = ref("manageUsers");
const setActiveSection = (section) => {
  activeSection.value = section;
};
</script>

<style scoped></style>
