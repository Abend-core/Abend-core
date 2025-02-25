<template>
  <div class="bg-white dark:bg-gray-800 py-0 mb-28">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <p
          class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-gray-200 text-center sm:text-5xl lg:text-balance cursor-pointer hover:text-primaryRed dark:hover:text-primaryRed transition-colors"
          @click="toggleModulesAdmin"
        >
          En savoir plus...
        </p>
      </div>
    </div>
  </div>
  <div class="bg-white dark:bg-gray-800 py-0">
    <div class="mx-auto max-w-7xl px-6 mt-[-50px] sm:mt-0 lg:px-8 mb-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <p
          class="mt-2 text-4xl font-semibold tracking-tighter uppercase text-pretty text-gray-900 dark:text-gray-200 sm:text-5xl lg:text-center underlined-title"
          v-if="isModulesAdminVisible"
        >
          Modules des créateurs
        </p>
      </div>
      <div class="mt-10">
        <TransitionGroup
          name="fade"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-10 justify-items-center"
        >
          <a
            v-for="(module, index) in filteredModules"
            :key="index"
            class="module-card w-[300px] h-[170px] lg:w-[400px] lg:h-[220px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
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
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { findAllModulesAdmin } from "../../api/module.js";
import { isDark } from "../../utils/darkMode.js";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const modulesAdmin = ref([]);
const isModulesAdminVisible = ref(false);
const isDataLoaded = ref(false);

const displayModulesAdmin = async () => {
  try {
    const response = await findAllModulesAdmin();
    modulesAdmin.value = response.data.modules;
    isDataLoaded.value = true;
  } catch (error) {
    console.error("Erreur lors du chargement des modules admin:", error);
  }
};

const toggleModulesAdmin = () => {
  if (!isDataLoaded.value) {
    displayModulesAdmin();
  }
  isModulesAdminVisible.value = !isModulesAdminVisible.value;
};

const filteredModules = computed(() => {
  return isModulesAdminVisible.value ? modulesAdmin.value : [];
});
</script>

<style scoped>
.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.underlined-title {
  position: relative;
  display: inline-block;
}

.underlined-title:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 40%;
  height: 6px;
  background-color: #f82b30;
}
</style>
