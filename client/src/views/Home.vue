<template>
  <main class="p-3 mt-2 sm:pl-5 max-w-[1400px] mx-auto">
    <div v-if="myModules.length > 0" class="mb-4 sm:mb-8">
      <div class="cursor-pointer text-2xl" @click="toggleMyModules">
        <i
          :class="
            isMyModulesOpen ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'
          "
        ></i>
        <p
          class="text-xl lg:text-2xl uppercase font-bold mb-6 tracking-tighter dark:text-white underlined-title"
        >
          Mes modules
        </p>
        <span
          class="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400"
        >
          ({{ myModules.length }})
        </span>
      </div>
      <transition name="fade">
        <div v-show="isMyModulesOpen">
          <ModuleList :modules="myModules" @openModal="openModalMoreInfos" />
        </div>
      </transition>
    </div>
    <div class="mb-8">
      <div class="cursor-pointer text-2xl" @click="toggleMostVisited">
        <i
          :class="
            isMostVisitedOpen ? 'ri-arrow-down-s-line' : 'ri-arrow-right-s-line'
          "
        ></i>
        <p
          class="text-xl lg:text-2xl uppercase font-bold mb-6 tracking-tighter dark:text-white underlined-title"
        >
          Les plus visités
        </p>
      </div>
      <transition name="fade">
        <div v-show="isMostVisitedOpen">
          <ModuleList
            :modules="mostVisitedModules"
            @openModal="openModalMoreInfos"
          />
        </div>
      </transition>
    </div>
    <div>
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="cursor-pointer text-2xl" @click="toggleAllModules">
          <i
            :class="
              isAllModulesOpen
                ? 'ri-arrow-down-s-line'
                : 'ri-arrow-right-s-line'
            "
          ></i>
          <p
            class="text-xl lg:text-2xl uppercase font-bold mb-6 tracking-tighter dark:text-white underlined-title"
          >
            Tous les modules
          </p>
          <span
            class="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400"
          >
            ({{ filteredOtherModules.length }})
          </span>
        </div>
      </div>
      <transition name="fade">
        <div v-show="isAllModulesOpen">
          <div
            v-if="authStore.isAuthenticated && allTags.length > 0"
            class="max-w-[1200px]"
          >
            <div class="flex flex-wrap gap-2 mb-6">
              <button
                v-for="tag in displayedTags"
                :key="tag"
                @click="toggleTag(tag)"
                :class="[
                  'px-3 py-1 rounded-full text-sm',
                  selectedTags.includes(tag)
                    ? 'bg-primaryRed text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
                ]"
              >
                {{ tag }}
              </button>
              <button
                v-if="allTags.length > tagLimit && !showAllTags"
                @click="showAllTags = true"
                class="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Voir plus <i class="ri-arrow-right-line"></i>
              </button>
              <button
                v-if="showAllTags"
                @click="showAllTags = false"
                class="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Voir moins
              </button>
            </div>
          </div>
          <ModuleList
            :modules="filteredOtherModules"
            @openModal="openModalMoreInfos"
          />
        </div>
      </transition>
    </div>

    <modal-more-infos
      v-if="modals.moreInfoModal"
      @close="closeModal('moreInfoModal')"
      :id-module="selectedModuleId"
    />

    <button v-if="showScrollTop" @click="scrollToTop" class="scroll-top-btn">
      ↑ Haut
    </button>
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useModuleStore } from "../stores/moduleStore";
import { useLikeStore } from "../stores/likeStore";
import { useModal } from "../composables/useModal";
import ModuleList from "../components/ModuleList.vue";
import modalMoreInfos from "../components/modal/modalMoreInfos.vue";

const authStore = useAuthStore();
const moduleStore = useModuleStore();
const likeStore = useLikeStore();

const { modals, toggleModal, closeModal } = useModal();
const selectedModuleId = ref(null);
const selectedTags = ref([]);
const isMyModulesOpen = ref(true);
const isMostVisitedOpen = ref(true);
const isAllModulesOpen = ref(true);
const showAllTags = ref(false);
const tagLimit = 5;
const showScrollTop = ref(false);

const toggleMyModules = () => {
  isMyModulesOpen.value = !isMyModulesOpen.value;
};

const toggleMostVisited = () => {
  isMostVisitedOpen.value = !isMostVisitedOpen.value;
};

const toggleAllModules = () => {
  isAllModulesOpen.value = !isAllModulesOpen.value;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300;
};

const allModules = computed(() => {
  return authStore.isAuthenticated
    ? moduleStore.modules
    : moduleStore.modulesAdmin;
});

const allTags = computed(() => {
  const allModules = authStore.isAuthenticated
    ? moduleStore.modules
    : moduleStore.modulesAdmin;
  const tagsSet = new Set();
  allModules.forEach((module) => {
    if (module.tags) {
      module.tags.split(",").forEach((tag) => tagsSet.add(tag.trim()));
    }
  });
  return Array.from(tagsSet).sort();
});

const displayedTags = computed(() => {
  return showAllTags.value ? allTags.value : allTags.value.slice(0, tagLimit);
});

const filterByTags = (modules) => {
  if (selectedTags.value.length === 0) return modules;
  return modules.filter((module) => {
    if (!module.tags) return false;
    const moduleTags = module.tags.split(",").map((tag) => tag.trim());
    return selectedTags.value.some((tag) => moduleTags.includes(tag));
  });
};

const myModules = computed(() => {
  const modules = authStore.isAuthenticated
    ? moduleStore.modules
    : moduleStore.modulesAdmin;
  return modules.filter(
    (module) =>
      module.isShow === true &&
      authStore.user &&
      module.User.id === authStore.user.id
  );
});

const mostVisitedModules = computed(() => {
  const modules = authStore.isAuthenticated
    ? moduleStore.modules
    : moduleStore.modulesAdmin;
  return modules
    .filter((module) => module.isShow === true)
    .sort((elmt1, elmt2) => elmt2.views - elmt1.views)
    .slice(0, 3);
});

const filteredOtherModules = computed(() => {
  const modules = allModules.value.filter((module) => module.isShow === true);
  return filterByTags(modules);
});

const toggleTag = (tag) => {
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

const openModalMoreInfos = (idModule) => {
  selectedModuleId.value = idModule;
  toggleModal("moreInfoModal");
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
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scroll-top-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #f82b30;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  font-size: 16px;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}
</style>
