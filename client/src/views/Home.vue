<template>
  <main class="p-5 mt-6 max-w-[1400px] mx-auto">
    <div v-if="myModules.length > 0" class="mb-8">
      <p
        class="text-xl lg:text-2xl font-bold mb-6 tracking-tighter dark:text-white underlined-title"
      >
        MES MODULES
      </p>
      <ModuleList :modules="myModules" @openModal="openModalMoreInfos" />
    </div>
    <div class="mb-8">
      <p
        class="text-xl lg:text-2xl font-bold mb-6 tracking-tighter dark:text-white underlined-title"
      >
        LES PLUS VISITÉS
      </p>
      <ModuleList
        :modules="mostVisitedModules"
        @openModal="openModalMoreInfos"
      />
    </div>
    <div>
      <p
        class="text-xl lg:text-2xl font-bold mb-6 tracking-tighter dark:text-white underlined-title"
      >
        TOUS LES MODULES
      </p>
      <ModuleList :modules="otherModules" @openModal="openModalMoreInfos" />
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
