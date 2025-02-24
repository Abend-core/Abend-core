<template>
  <div class="bg-white dark:bg-gray-800 py-16 lg:py-32">
    <div class="mx-auto max-w-2xl text-center px-6">
      <h2 class="text-base/7 font-semibold text-primaryRed">
        Boostez votre productivité
      </h2>
      <p
        class="mt-2 text-4xl font-semibold tracking-tighter uppercase underlined-title text-pretty text-gray-900 dark:text-gray-200 sm:text-5xl text-left lg:text-balance"
      >
        Nos modules les plus visités
      </p>
      <p class="mt-4 text-lg/8 text-gray-600 dark:text-gray-400">
        Découvrez les outils plébiscités par nos utilisateurs pour gérer vos
        projets avec efficacité et simplicité.
      </p>
    </div>
    <div class="flex justify-center gap-5 mt-20 flex-wrap">
      <a
        v-for="(module, index) in modules"
        :key="index"
        class="module-card w-[300px] h-[175px] lg:w-[400px] lg:h-[220px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
      >
        <div class="px-4 py-3 h-full">
          <div class="flex items-center gap-2 relative">
            <img
              class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border dark:border-gray-600"
              :src="`${apiUrl}/uploadsFile/module/${module.image}`"
              alt="Photo du module"
              loading="lazy"
            />
            <p class="text-base lg:text-xl font-bold">{{ module.name }}</p>
            <i
              class="ri-verified-badge-fill text-black text-xl lg:text-2xl dark:text-white cursor-pointer"
            ></i>
            <i class="ri-more-fill absolute right-2 top-0"></i>
          </div>
          <div>
            <p class="mt-2 lg:mt-4 text-sm lg:text-base">
              {{ module.content }}
            </p>
            <div
              v-if="module.tags"
              class="absolute bottom-3 left-[50%] transform -translate-x-1/2 flex gap-1 mt-2"
            >
              <div
                v-for="tag in module.tags.split(',').map((tag) => tag.trim())"
                :key="tag"
                class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-full text-xs hover:bg-gray-400 dark:hover:bg-gray-700"
              >
                {{ tag }}
              </div>
            </div>
            <p
              class="absolute bottom-2 left-4 lg:bottom-4 text-[10px] underline lg:text-xs hover:text-primaryRed transition-colors"
            >
              {{ module.User.username }}
            </p>
            <i
              class="ri-heart-line absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer z-10"
            ></i>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { isDark } from "../../utils/darkMode.js";
import { displayMostVisited } from "../../api/module.js";

const modules = ref([]);

const mostVisitedModules = async () => {
  try {
    const response = await displayMostVisited();
    modules.value = response.data.modules;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  mostVisitedModules();
});
</script>

<style scoped>
.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}

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
