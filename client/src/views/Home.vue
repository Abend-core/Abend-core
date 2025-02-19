<template>
  <main class="p-2 max-w-[1400px] mx-auto">
    <div class="flex items-center justify-center flex-wrap gap-10 mt-16 mb-16">
      <div class="flex" v-for="module in modulesToDisplay" :key="module.id">
        <a
          :href="module.link"
          class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
          target="_blank"
          @click="countVisit(module.id)"
        >
          <div class="px-4 py-3 h-full">
            <div class="flex items-center gap-2 relative">
              <img
                class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border"
                :src="`${apiUrl}/uploadsFile/module/${module.image}`"
                alt="Photo du module"
                loading="lazy"
              />
              <p class="text-base lg:text-xl font-bold">{{ module.name }}</p>
              <i
                v-if="module.User.isAdmin"
                class="ri-verified-badge-fill text-black text-xl lg:text-2xl dark:text-white cursor-pointer"
              ></i>
              <div v-if="authStore.isAuthenticated">
                <i
                  class="ri-more-fill absolute right-2 top-0"
                  @click="openModalMoreInfos($event, module.id)"
                ></i>
              </div>
            </div>
            <div>
              <p class="mt-2 lg:mt-4 text-sm lg:text-base">
                {{ module.content }}
              </p>
            </div>
            <div v-if="module.tags" class="flex gap-1 mt-2">
              <span
                v-for="tag in module.tags.split(',')"
                :key="tag"
                class="px-2 py-1 bg-primaryRed text-white rounded-md text-xs"
              >
                {{ tag }}
              </span>
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
            </div>
          </div>
        </a>
      </div>
    </div>
    <modal-more-infos
      v-if="modals.moreInfoModal"
      @close="closeModal('moreInfoModal')"
      :id-module="selectedModuleId"
    />
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import { toggleLike } from "../api/like";
import { countVisitor } from "../api/module";
import { useAuthStore } from "../stores/authStore";
import { useModuleStore } from "../stores/moduleStore";
import { useLikeStore } from "../stores/likeStore";
import { useModal } from "../composables/useModal";
import modalMoreInfos from "../components/modal/modalMoreInfos.vue";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const authStore = useAuthStore();
const moduleStore = useModuleStore();
const likeStore = useLikeStore();

const { modals, toggleModal, closeModal } = useModal();
const selectedModuleId = ref(null);

const modulesToDisplay = computed(() => {
  const modules = authStore.isAuthenticated
    ? moduleStore.modules
    : moduleStore.modulesAdmin;

  return modules.filter((module) => module.isShow === true);
});

const openModalMoreInfos = (event, idModule) => {
  event.preventDefault();
  event.stopPropagation();
  selectedModuleId.value = idModule;
  toggleModal("moreInfoModal");
};

const toggleLikeModule = async (idModule, event) => {
  event.preventDefault();
  event.stopPropagation();
  try {
    await toggleLike(idModule);

    const module = moduleStore.modules.find((m) => m.id === idModule);
    module.isLike = !module.isLike;
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
