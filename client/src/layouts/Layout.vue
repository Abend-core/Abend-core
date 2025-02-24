<template>
  <div class="flex flex-col min-h-screen bg-white dark:bg-gray-800">
    <Header />
    <TransitionGroup
      name="fade"
      tag="div"
      class="flex-1 dark:bg-gray-800 dark:text-white"
    >
      <router-view key="$route.path" />
    </TransitionGroup>
    <Footer v-if="!hideFooter" />
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Header from "../layouts/Header.vue";
import Footer from "../layouts/Footer.vue";

const route = useRoute();

const hideFooter = computed(() => {
  return route.meta.hideFooter === true;
});
</script>

<style scoped>
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
</style>
