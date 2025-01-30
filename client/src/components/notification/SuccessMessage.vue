<template>
  <div
    v-if="successMessage"
    class="text-white rounded-[6px] p-4 mt-3 mb-3 bg-gradient-to-r from-[#4b9945] to-[#4b9945] border border-black"
  >
    <div>
      <svg
        aria-hidden="true"
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        class="float-right cursor-pointer dark:fill-white"
        fill="#c2040466"
        @click="clearSuccess"
      >
        <path
          d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
        ></path>
      </svg>
      <div class="text-[14px] text-white">
        {{ successMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useSuccessStore } from "../../stores/successStore";

const successStore = useSuccessStore();

const successMessage = computed(() => successStore.successMessage);
const clearSuccess = successStore.clearSuccess;
</script>
