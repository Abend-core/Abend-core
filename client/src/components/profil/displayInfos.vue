<template>
  <div
    class="bg-white rounded-md md:p-paddingMd mt-5 mb-5 md:mt-3 md:mb-3 dark:bg-gray-800 dark:text-white xl:text-left"
  >
    <h1 class="font-bold">Mes informations personnelles</h1>
    <p class="text-primaryRed mt-1">Profil Dashboard</p>
  </div>
  <div
    class="bg-white p-paddingMd flex flex-col items-center dark:bg-gray-800 dark:text-white"
  >
    <i class="ri-account-pin-circle-fill text-6xl mb-3"></i>
    <p class="mb-4 mt-[-12px] text-2xl">{{ user.username }}</p>
    <div class="flex items-center gap-3 w-[210px]">
      <i class="ri-mail-fill text-3xl"></i>
      <p>
        {{ user.mail }}
      </p>
    </div>
    <div class="flex items-center gap-3 w-[210px]">
      <i class="ri-time-fill text-3xl"></i>
      <p>{{ formatDateTime(user.createdAt) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUser } from "../../composables/useUser";
import { formatDateTime } from "../../utils/date";
import { useAuthStore } from "../../stores/authStore";

const { getInfosProfile } = useUser();

const authStore = useAuthStore();

const user = computed(() => authStore.user);
</script>
