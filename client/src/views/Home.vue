<template>
  <main class="p-3 mt-2 sm:pl-5 max-w-[1400px] mx-auto">
    <div v-if="myModules.length > 0" class="mb-4 sm:mb-8">
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
      <ModuleList :modules="myModules" @openModal="openModalMoreInfos" />
    </div>
    <div class="mb-8">
      <p
        class="text-xl lg:text-2xl uppercase font-bold mb-6 tracking-tighter dark:text-white underlined-title"
      >
        Les plus visités
      </p>
      <div>
        <ModuleList
          :modules="mostVisitedModules"
          @openModal="openModalMoreInfos"
        />
      </div>
    </div>
    <div>
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex items-center">
          <p
            class="text-xl lg:text-2xl uppercase font-bold mb-6 tracking-tighter dark:text-white underlined-title"
          >
            Tous les modules
          </p>
          <span
            class="text-sm lg:text-base font-medium text-gray-500 dark:text-gray-400"
          >
            &nbsp;({{ filteredOtherModules.length }})
          </span>
        </div>
      </div>
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
    <modal-more-infos
      v-if="modals.moreInfoModal"
      @close="closeModal('moreInfoModal')"
      :id-module="selectedModuleId"
    />
  </main>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
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
const showAllTags = ref(false);
const tagLimit = 5;

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

const otherModules = computed(() => {
  const modules = authStore.isAuthenticated
    ? moduleStore.modules
    : moduleStore.modulesAdmin;
  return modules.filter(
    (module) =>
      module.isShow === true &&
      (!authStore.user || module.User.id !== authStore.user.id)
  );
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
</style>
