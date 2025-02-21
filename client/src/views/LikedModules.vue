<template>
  <main class="p-3 mt-2 sm:pl-5 max-w-[1400px] mx-auto">
    <p
      class="text-2xl uppercase tracking-tighter mb-6 font-bold underlined-title"
    >
      Favoris
    </p>
    <div v-if="modulesToDisplay.length === 0" class="mb-6">
      <p class="text-gray-500 dark:text-gray-400 font-medium">
        Vous n’avez pas encore ajouté de modules en favoris.
      </p>
    </div>
    <div class="flex items-center flex-wrap gap-10">
      <div class="flex" v-for="module in modulesToDisplay" :key="module.id">
        <a
          :href="module.link"
          class="module-card w-[300px] h-[150px] lg:w-[375px] lg:h-[200px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
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
                v-if="module.User.isAdmin"
                class="ri-verified-badge-fill text-xl lg:text-2xl text-white cursor-pointer"
              ></i>
            </div>
            <div>
              <p class="mt-4 lg:mt-6 text-sm lg:text-base">
                {{ module.content }}
              </p>
            </div>
            <p
              class="absolute bottom-2 lg:bottom-4 text-[10px] lg:text-xs"
              :class="{
                underline:
                  authStore.user && authStore.user.id === module.User.id,
              }"
            >
              {{ module.User.username }}
            </p>
            <i
              v-if="module.isLike"
              class="ri-heart-fill absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer text-red-500 z-10"
              @click="toggleLikeModule(module.id, $event)"
            ></i>
            <i
              v-else
              class="ri-heart-line absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer z-10"
              @click="toggleLikeModule(module.id, $event)"
            ></i>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { displayLikedModules } from "../api/like";
import { toggleLike } from "../api/like";
import { useLikeStore } from "../stores/likeStore";
import { useAuthStore } from "../stores/authStore";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const likeStore = useLikeStore();
const authStore = useAuthStore();

const modules = ref([]);

const allModulesLiked = async () => {
  try {
    const response = await displayLikedModules();
    modules.value = response.data.modules;
  } catch (error) {
    console.error(error);
  }
};

const modulesToDisplay = computed(() => {
  return modules.value.filter((module) => module.isLike);
});

const toggleLikeModule = async (idModule, event) => {
  event.preventDefault();
  const moduleToUpdate = modules.value.find((module) => module.id === idModule);
  if (moduleToUpdate) {
    moduleToUpdate.isLike = !moduleToUpdate.isLike;
  }
  try {
    await likeStore.toggleLike(idModule);
    await toggleLike(idModule);
  } catch (error) {
    console.error("Erreur lors du like :", error);
  }
};
onMounted(() => {
  allModulesLiked();
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
