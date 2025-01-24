<template>
  <main class="p-2">
    <div
      class="flex items-center justify-center flex-wrap gap-10 mt-[60px] mb-[60px]"
    >
      <div class="flex" v-for="module in modules" :key="module.id">
        <a
          :href="module.link"
          class="max-w-[400px] h-[200px] rounded-2xl relative bg-[#141A22] text-white"
          :style="{
            border: `1px solid black`,
          }"
          target="_blank"
        >
          <img
            class="absolute w-[50px] h-[50px] right-3 top-3 rounded-full border-[2px] border-white p-[2px] box-border"
            :src="`${apiUrl}/uploadsFile/module/${module.image}`"
            alt=""
          />
          <div class="p-3 h-full">
            <p class="text-xl font-bold">{{ module.name }}</p>
            <p class="mt-6">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Distinctio, enim.
            </p>
            <p class="absolute bottom-4 text-sm">
              {{ formatDate(module.createdAt) }}
            </p>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { findAllModules } from "../api/module";
import { formatDate } from "../utils/date";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

const modules = ref([]);
const allModules = async () => {
  try {
    const response = await findAllModules();
    modules.value = response.data.module;
  } catch (error) {
    console.error(error);
  }
};

allModules();
</script>

<style scoped>
input {
  border: 1px solid #d1d9e0;
  display: block;
  width: 100%;
}

input,
button {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 6px;
}
</style>
