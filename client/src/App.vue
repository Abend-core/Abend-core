<template>
  <div
    @keydown="handleKeydown"
    @keydown.esc="closeModal('searchBar')"
    tabindex="0"
  >
    <Layout />
    <modalSearchBar v-if="modals.searchBar" @close="closeModal('searchBar')" />
  </div>
</template>

<script setup>
import { watch, ref, onMounted } from "vue";
import Layout from "./layouts/Layout.vue";
import { useNotificationStore } from "./stores/notificationStore";
import { useRoute } from "vue-router";
import modalSearchBar from "./components/modal/modalSearchBar.vue";
import { useModal } from "./composables/useModal.js";

const route = useRoute();
const { clearNotification } = useNotificationStore();
const { modals, closeModal, searchBarOpenKey } = useModal();

const os = ref("Windows");
onMounted(() => {
  const userAgent = navigator.userAgent;
  if (userAgent.includes("Macintosh")) {
    os.value = "Mac";
  } else if (userAgent.includes("Windows NT")) {
    os.value = "Windows";
  }
});

const handleKeydown = (event) => {
  if (
    os.value === "Windows" &&
    event.ctrlKey &&
    event.key.toLowerCase() === "k"
  ) {
    searchBarOpenKey(event);
  } else if (
    os.value === "Mac" &&
    event.metaKey &&
    event.key.toLowerCase() === "k"
  ) {
    searchBarOpenKey(event);
  }
};

watch(
  () => route.path,
  () => {
    clearNotification();
  }
);
</script>
