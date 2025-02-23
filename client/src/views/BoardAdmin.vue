<template>
  <main class="max-w-[1400px] mx-auto p-5">
    <div
      class="w-full bg-customWhite rounded-md p-5 dark:bg-gray-800 dark:text-white"
    >
      <div class="flex gap-5 mb-5 text-white">
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
        <p
          class="text-center bg-black p-1 rounded-md cursor-pointer"
          @click="setActiveSection('manageReports')"
        >
          <i class="ri-alarm-warning-fill"></i>
          Gérer les signalements
        </p>
      </div>
      <div v-if="activeSection === 'manageUsers'">
        <table-user />
      </div>
      <div v-if="activeSection === 'manageModules'">
        <table-module />
      </div>
      <div v-if="activeSection === 'manageReports'">
        <table-report />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import tableModule from "../components/boardAdmin/tableModule.vue";
import tableUser from "../components/boardAdmin/tableUser.vue";
import tableReport from "../components/boardAdmin/tableReport.vue";

const activeSection = ref("manageUsers");

const setActiveSection = (section) => {
  activeSection.value = section;
};
</script>

<style scoped></style>
