<template>
  <div
    class="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="w-full h-screen p-4">
      <div
        class="bg-white rounded-lg shadow-md max-w-[700px] border border-gray-700 dark:bg-gray-800 dark:text-white mt-[-5px] sm:mt-[120px] mx-auto mb-0"
      >
        <div
          class="flex items-center gap-3 p-3 relative border-b dark:border-gray-700 border-gray-200"
        >
          <i class="ri-search-2-line text-xl text-gray-500"></i>
          <input
            ref="searchInput"
            placeholder="Rechercher"
            class="w-full h-[50px] bg-inherit focus:outline-none placeholder:font-medium text-gray-400"
            type="text"
            v-model="inputValueSearchBarModule"
            @input="filterSearchModule"
          />
          <div
            @click="$emit('close')"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 border border-gray-300 dark:border-gray-700 rounded-md p-1 cursor-pointer"
          >
            <kbd
              class="block text-customdarkGray tracking-tighter text-sm font-bold"
              >esc</kbd
            >
          </div>
        </div>
        <div class="p-4 dark:bg-gray-800">
          <div v-if="modules.length === 0">
            <p
              v-if="inputValueSearchBarModule.trim().length === 0"
              class="p-9 text-center font-medium text-gray-400"
            >
              Aucune recherche récente
            </p>
            <p v-else class="p-9 text-center font-medium text-gray-400">
              Aucun résultat pour "<span class="font-bold">{{
                inputValueSearchBarModule
              }}</span
              >"
            </p>
          </div>
          <a
            v-for="module in modules"
            :key="module.id"
            class="flex items-center relative gap-4 p-3 bg-white mb-3 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 group"
            :href="module.link"
            target="_blank"
          >
            <i
              class="ri-dashboard-horizontal-fill text-3xl text-gray-400 dark:text-gray-300"
            ></i>
            <img
              class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-800"
              :src="`${apiUrl}/uploadsFile/module/${module.image}`"
              alt="module.name"
            />
            <div>
              <p
                class="font-bold text-gray-900 dark:text-white"
                v-html="highlightText(module.name)"
              ></p>
              <p class="text-sm text-gray-500 dark:text-gray-400">Jérome</p>
            </div>
            <i
              class="ri-arrow-right-line absolute right-3 text-gray-400 dark:text-gray-300 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            ></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { filterModule } from "../../api/module";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const modules = ref([]);
const inputValueSearchBarModule = ref("");
const searchInput = ref(null);

const filterSearchModule = async () => {
  const searchTerm = inputValueSearchBarModule.value.trim();

  if (!searchTerm) {
    modules.value = [];
    return;
  }

  try {
    const response = await filterModule({ search: searchTerm });

    if (response && response.data.module) {
      modules.value = response.data.module;
    } else {
      modules.value = [];
    }
  } catch (error) {
    console.error(error);
    modules.value = [];
  }
};

const highlightText = (text) => {
  const searchTerm = inputValueSearchBarModule.value.trim();
  if (!searchTerm) return text;

  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(
    regex,
    `<span class="text-primaryRed underline">$1</span>`
  );
};

watch(inputValueSearchBarModule, () => {
  filterSearchModule();
});
onMounted(() => {
  searchInput.value?.focus();
});
</script>
