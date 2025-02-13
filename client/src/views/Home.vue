<template>
  <main class="p-2 max-w-[1400px] mx-auto">
    <div class="flex items-center justify-center flex-wrap gap-10 mt-16 mb-16">
      <div class="flex" v-for="module in modulesToDisplay" :key="module.id">
        <a
          :href="module.link"
          class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] rounded-2xl relative bg-[#141A22] text-white"
          :style="{
            border: `1px solid black`,
          }"
          target="_blank"
          @click="countVisit(module.id)"
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
            <router-link
              class="absolute bottom-2 lg:bottom-4 text-[10px] lg:text-xs hover:text-primaryRed"
              :class="{
                underline:
                  authStore.user && authStore.user.id === module.User.id,
              }"
              :to="`/user/${module.User.username}`"
            >
              {{ module.User.username }}
            </router-link>
            <div
              v-if="
                authStore.isAuthenticated &&
                authStore.user.id !== module.User.id
              "
            >
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
              <i
                v-if="module.isReport"
                class="ri-alarm-warning-fill absolute bottom-3 right-9 lg:right-10 text-xl lg:text-2xl cursor-pointer text-red-500 z-10"
                @click="toggleReportModule(module.id, $event)"
              ></i>
              <i
                v-else
                class="ri-alarm-warning-fill absolute bottom-3 right-9 lg:right-10 text-xl lg:text-2xl cursor-pointer z-10"
                @click="toggleReportModule(module.id, $event)"
              ></i>
            </div>
          </div>
        </a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, watch, onMounted } from "vue";
import { toggleLike } from "../api/like";
import { toggleReport } from "../api/report";
import { countVisitor } from "../api/module";
import { useAuthStore } from "../stores/authStore";
import { useModuleStore } from "../stores/moduleStore";
import { useLikeStore } from "../stores/likeStore";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const authStore = useAuthStore();
const moduleStore = useModuleStore();
const likeStore = useLikeStore();

const modulesToDisplay = computed(() => {
  const modules = authStore.isAuthenticated
    ? moduleStore.modules
    : moduleStore.modulesAdmin;

  return modules.filter((module) => module.isShow === true);
});

const toggleLikeModule = async (idModule, event) => {
  event.preventDefault();
  try {
    await toggleLike(idModule);

    const module = moduleStore.modules.find((m) => m.id === idModule);
    module.isLike = !module.isLike;
  } catch (error) {
    console.error("Erreur lors du like :", error);
  }
};

const toggleReportModule = async (idModule, event) => {
  event.preventDefault();
  try {
    await toggleReport(idModule);

    const module = moduleStore.modules.find((m) => m.id === idModule);
    module.isReport = !module.isReport;
  } catch (error) {
    console.error("Erreur lors du like :", error);
  }
};

const countVisit = async (idModule) => {
  try {
    await countVisitor(idModule);
  } catch (error) {
    console.error(error);
  }
};

watch(
  () => authStore.isAuthenticated,
  (isAuthenticated) => {
    if (isAuthenticated) {
      moduleStore.allModules().then(() => {
        likeStore.setEtatLike(moduleStore.modules);
      });
    } else {
      moduleStore.allModulesAdmin();
    }
  }
);

onMounted(() => {
  if (authStore.isAuthenticated) {
    moduleStore.allModules().then(() => {
      likeStore.setEtatLike(moduleStore.modules);
    });
  } else {
    moduleStore.allModulesAdmin();
  }
});
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
