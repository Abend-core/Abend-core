<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 h-screen"
  >
    <div class="w-full h-screen p-4">
      <div
        class="dark:bg-gray-800 bg-white rounded-lg border border-gray-200 dark:border-gray-700 sm:w-96 relative max-w-[700px] mx-auto mt-[100px] sm:mt-[120px]"
      >
        <div
          class="flex items-center gap-3 p-3 relative border-b dark:border-gray-700 border-gray-200"
        >
          <i class="ri-search-2-line text-xl text-gray-500"></i>
          <input
            ref="searchInput"
            placeholder="Rechercher"
            class="w-full bg-inherit focus:outline-none placeholder:font-medium text-gray-400"
            type="text"
          />
          <p
            @click="closeModal"
            class="block text-customdarkGray text-sm font-bold absolute right-4 top-2 cursor-pointer"
          >
            &times
          </p>
        </div>
        <div class="p-4 dark:bg-gray-800 rounded-lg">
          <div v-if="suivis && suivis.length === 0">
            <p class="text-center font-medium text-gray-400">Aucun suivi</p>
          </div>
          <a
            class="flex gap-2 items-center"
            v-for="suivi in suivis"
            :key="suivi.id"
          >
            <img
              class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-800"
              :src="`${apiUrl}/uploadsFile/profil/${suivi.image}`"
            />
            <p>{{ suivi.username }}</p>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { displayNetwork } from "../../api/user.js";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const emit = defineEmits(["close"]);

const suivis = ref([]);

const closeModal = () => {
  emit("close");
};

const displaySuivis = async () => {
  try {
    const response = await displayNetwork();
    suivis.value = response?.data?.network?.followings ?? [];
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  displaySuivis();
});
</script>
