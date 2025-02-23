<template>
  <div class="bg-white dark:bg-gray-800 py-24 lg:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="text-center">
        <h2 class="text-base/7 font-semibold text-primaryRed">
          Des chiffres qui parlent
        </h2>
        <p
          class="mt-2 text-4xl font-semibold tracking-tighter uppercase underlined-title text-pretty text-gray-900 dark:text-gray-200 sm:text-5xl lg:text-balance"
        >
          Nos statistiques clés
        </p>
        <p class="mt-4 text-lg/8 text-gray-600 dark:text-gray-400">
          Une communauté vibrante, des outils puissants et une activité qui
          témoigne de notre impact.
        </p>
      </div>
      <dl
        class="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 mt-20"
      >
        <div class="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt class="text-base/7 text-gray-600 dark:text-gray-400">
            Modules déployés
          </dt>
          <dd
            class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
          >
            {{ stats.nbModule }}
          </dd>
        </div>
        <div class="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt class="text-base/7 text-gray-600 dark:text-gray-400">
            Utilisateurs actifs
          </dt>
          <dd
            class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
          >
            {{ stats.nbUser }}
          </dd>
        </div>
        <div class="mx-auto flex max-w-xs flex-col gap-y-4">
          <dt class="text-base/7 text-gray-600 dark:text-gray-400">
            Interactions enregistrées
          </dt>
          <dd
            class="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
          >
            {{ stats.nbVisite }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { displayStats } from "../../api/module.js";

const stats = ref([]);

const statsData = async () => {
  try {
    const response = await displayStats();
    stats.value = response.data.stats;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  statsData();
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
