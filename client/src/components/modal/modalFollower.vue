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
          <p>Blabla les abonnés</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
