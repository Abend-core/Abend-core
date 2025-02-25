<template>
  <main class="p-5 max-w-[1400px] mx-auto">
    <p
      class="text-2xl font-bold tracking-tighter uppercase mb-6 dark:text-white underlined-title"
    >
      Modules avec le tag "<span class="text-primaryRed">{{ tag }}</span
      >"
    </p>
    <div v-if="filteredModules.length === 0">
      <p class="text-gray-500 dark:text-gray-400 font-medium">
        Aucun module trouvé pour ce tag.
      </p>
    </div>
    <ModuleList :modules="filteredModules" @openModal="openModalMoreInfos" />
    <modal-more-infos
      v-if="modals.moreInfoModal"
      @close="closeModal('moreInfoModal')"
      :id-module="selectedModuleId"
    />
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useModuleStore } from "../stores/moduleStore";
import { useModal } from "../composables/useModal";
import ModuleList from "../components/ModuleList.vue";
import modalMoreInfos from "../components/modal/modalMoreInfos.vue";

const route = useRoute();
const moduleStore = useModuleStore();
const { modals, toggleModal, closeModal } = useModal();
const selectedModuleId = ref(null);

const tag = computed(() => route.params.tag);

const filteredModules = computed(() => {
  return moduleStore.modules.filter(
    (module) =>
      module.isShow === true && module.tags && module.tags.includes(tag.value)
  );
});

const openModalMoreInfos = (idModule) => {
  selectedModuleId.value = idModule;
  toggleModal("moreInfoModal");
};

onMounted(() => {
  if (moduleStore.modules.length === 0) {
    moduleStore.allModules();
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
