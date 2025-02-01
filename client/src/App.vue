<template>
  <div
    @keydown.ctrl.k="searchBarOpenKey"
    @keydown.esc="closeModal('searchBar')"
    tabindex="0"
  >
    <Layout />
    <modalSearchBar v-if="modals.searchBar" @close="closeModal('searchBar')" />
  </div>
</template>

<script setup>
import Layout from "./layouts/Layout.vue";
import { useNotificationStore } from "./stores/notificationStore";
import { useRoute } from "vue-router";
import { watch } from "vue";
import modalSearchBar from "./components/modal/modalSearchBar.vue";
import { useModal } from "./composables/useModal.js";

const route = useRoute();

const { clearNotification } = useNotificationStore();

const { modals, closeModal, searchBarOpenKey } = useModal();

watch(
  () => route.path,
  () => {
    clearNotification();
  }
);
</script>
