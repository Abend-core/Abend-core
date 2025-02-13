<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 h-screen"
  >
    <div class="w-full h-screen p-4">
      <div
        class="dark:bg-gray-800 bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-96 relative max-w-[700px] mx-auto mt-[100px] sm:mt-[120px]"
      >
        <p class="text-xl font-semibold mb-4 text-gray-400 text-center">
          Followers
        </p>
        <div
          @click="closeModal"
          class="absolute right-4 top-4 border border-gray-300 dark:border-gray-700 rounded-md p-1 cursor-pointer"
        >
          <kbd
            class="block text-customdarkGray tracking-tighter text-sm font-bold"
            >esc</kbd
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from "vue";

const emit = defineEmits(["close"]);

const closeModal = () => {
  emit("close");
};
</script>
