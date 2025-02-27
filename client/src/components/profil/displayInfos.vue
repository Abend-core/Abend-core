<template>
  <div class="max-w-[1400px] mx-auto">
    <div class="dark:bg-gray-800 rounded-md">
      <h1
        class="text-2xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white underlined-title"
      >
        Mes informations personnelles
      </h1>
    </div>
    <div
      v-if="user && user.username"
      class="dark:bg-gray-800 rounded-md p-3 sm:p-6 flex flex-col items-center"
    >
      <div class="flex flex-col items-center mb-6">
        <i class="ri-account-pin-circle-fill text-5xl"></i>
        <p class="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">
          {{ user.username }}
        </p>
      </div>
      <div class="w-full max-w-md space-y-4">
        <div
          class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
        >
          <i class="ri-mail-fill text-2xl text-gray-500 dark:text-gray-400"></i>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p class="text-gray-900 dark:text-white">{{ user.mail }}</p>
          </div>
        </div>
        <div
          class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md"
        >
          <i class="ri-time-fill text-2xl text-gray-500 dark:text-gray-400"></i>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Inscrit le</p>
            <p class="text-gray-900 dark:text-white">
              {{ formatDateTime(user.createdAt) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { formatDateTime } from "../../utils/date";
import { useAuthStore } from "../../stores/authStore";

const authStore = useAuthStore();
const user = computed(() => authStore.user);
</script>

<style scoped>
.underlined-title {
  position: relative;
  display: inline-block;
}

.underlined-title:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30%;
  height: 6px;
  background-color: #f82b30;
}
</style>
