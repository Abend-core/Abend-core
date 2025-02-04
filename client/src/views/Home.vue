<template>
  <main class="p-2 max-w-[1400px] mx-auto">
    <div class="flex items-center justify-center flex-wrap gap-10 mt-16 mb-16">
      <div class="flex" v-for="module in modules" :key="module.id">
        <a
          :href="module.link"
          class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] rounded-2xl relative bg-[#141A22] text-white"
          :style="{
            border: `1px solid black`,
          }"
          target="_blank"
        >
          <img
            class="absolute w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] right-3 top-3 rounded-full border-[2px] border-white p-[2px] box-border"
            :src="`${apiUrl}/uploadsFile/module/${module.image}`"
            alt="Photo du module"
            loading="lazy"
          />
          <div class="p-3 h-full">
            <div class="flex items-center gap-2">
              <p class="text-base lg:text-xl font-bold">{{ module.name }}</p>
              <i
                class="ri-verified-badge-fill text-xl lg:text-2xl text-white cursor-pointer"
              ></i>
            </div>
            <div>
              <p class="mt-4 lg:mt-6 text-sm lg:text-base">
                {{ module.content }}
              </p>
            </div>
            <p class="absolute bottom-2 lg:bottom-4 text-[10px] lg:text-xs">
              {{ module.User.username }}
            </p>
            <i
              v-if="getEtatLike(module.id)"
              class="ri-heart-fill absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer text-red-500 z-10"
              @click="toggleLike(module.id, $event)"
            ></i>
            <i
              v-else
              class="ri-heart-line absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer z-10"
              @click="toggleLike(module.id, $event)"
            ></i>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { findAllModulesVisible } from "../api/module";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const modules = ref([]);
const etatLike = ref({});

const allModules = async () => {
  try {
    const response = await findAllModulesVisible();
    modules.value = response.data.module;
  } catch (error) {
    console.error(error);
  }
};

const getEtatLike = (idModule) => {
  return etatLike.value[idModule];
};

const toggleLike = (idModule, event) => {
  etatLike.value[idModule] = !etatLike.value[idModule];
  event.stopPropagation();
  event.preventDefault();
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

.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}
</style>
