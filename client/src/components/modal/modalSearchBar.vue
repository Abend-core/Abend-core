<template>
  <div
    class="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 h-screen"
  >
    <div class="w-full h-screen p-4" @click.self="$emit('close')">
      <div
        class="bg-white rounded-lg max-w-[700px] border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white mt-[-5px] sm:mt-[120px] mx-auto mb-0"
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
        <div
          class="p-4 dark:bg-gray-800 max-h-[700px] overflow-y-auto scrollbar-custom"
        >
          <div
            v-if="
              modulesByName.length === 0 &&
              modulesByCreator.length === 0 &&
              modulesByTags.length === 0
            "
          >
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
          <div v-if="modulesByName.length > 0" class="mb-6">
            <p class="text-lg font-semibold mb-3 dark:text-white">
              Par nom du module
            </p>
            <a
              v-for="module in modulesByName"
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
                :alt="module.name"
              />
              <div>
                <p
                  class="font-bold text-gray-900 dark:text-white"
                  v-html="highlightName(module.name)"
                ></p>
                <p
                  class="text-sm text-gray-500 dark:text-gray-400"
                  v-html="highlightText(module.User.username)"
                ></p>
              </div>
              <div
                v-if="module.tags"
                class="absolute bottom-3 left-[50%] transform -translate-x-1/2 flex gap-1 mt-2"
              >
                <span
                  v-for="tag in module.tags.split(',')"
                  :key="tag"
                  class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-md text-xs"
                  v-html="plainText(tag)"
                ></span>
              </div>
              <i
                class="ri-arrow-right-line absolute right-3 text-gray-400 dark:text-gray-300 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
              ></i>
            </a>
          </div>
          <div v-if="modulesByCreator.length > 0" class="mb-6">
            <p class="text-lg font-semibold mb-3 dark:text-white">
              Par créateur
            </p>
            <router-link
              v-for="module in modulesByCreator"
              :key="module.id"
              class="flex items-center relative gap-4 p-3 bg-white mb-3 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 group"
              :to="`/user/${module.User.username}`"
              @click="$emit('close')"
            >
              <i
                class="ri-file-user-fill text-3xl text-gray-400 dark:text-gray-300"
              ></i>
              <img
                class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-800"
                :src="`${apiUrl}/uploadsFile/module/${module.image}`"
                :alt="module.name"
              />
              <div>
                <p
                  class="font-bold text-gray-900 dark:text-white"
                  v-html="highlightText(module.name)"
                ></p>
                <p
                  class="text-sm text-gray-500 dark:text-gray-400"
                  v-html="highlightCreator(module.User.username)"
                ></p>
              </div>
              <div
                v-if="module.tags"
                class="absolute bottom-3 left-[50%] transform -translate-x-1/2 flex gap-1 mt-2"
              >
                <span
                  v-for="tag in module.tags.split(',')"
                  :key="tag"
                  class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-md text-xs"
                  v-html="plainText(tag)"
                ></span>
              </div>
              <i
                class="ri-arrow-right-line absolute right-3 text-gray-400 dark:text-gray-300 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
              ></i>
            </router-link>
          </div>
          <div v-if="modulesByTags.length > 0">
            <p class="text-lg font-semibold mb-3 dark:text-white">Par tags</p>
            <router-link
              v-for="module in modulesByTags"
              :key="module.id"
              class="flex items-center relative gap-4 p-3 bg-white mb-3 dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 group"
              :to="`/modules/tag/${encodeURIComponent(
                getMatchingTag(module.tags)
              )}`"
              @click="$emit('close')"
            >
              <i
                class="ri-hashtag text-3xl text-gray-400 dark:text-gray-300"
              ></i>
              <img
                class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-800"
                :src="`${apiUrl}/uploadsFile/module/${module.image}`"
                :alt="module.name"
              />
              <div>
                <p
                  class="font-bold text-gray-900 dark:text-white"
                  v-html="plainText(module.name)"
                ></p>
                <p
                  class="text-sm text-gray-500 dark:text-gray-400"
                  v-html="plainText(module.User.username)"
                ></p>
              </div>
              <div
                v-if="module.tags"
                class="absolute bottom-3 left-[50%] transform -translate-x-1/2 flex gap-1 mt-2"
              >
                <span
                  v-for="tag in module.tags.split(',')"
                  :key="tag"
                  class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-md text-xs"
                  v-html="highlightTag(tag, module.tags)"
                ></span>
              </div>
              <i
                class="ri-arrow-right-line absolute right-3 text-gray-400 dark:text-gray-300 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
              ></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { findAllModules } from "../../api/module";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const searchInput = ref(null);
const modulesByName = ref([]);
const modulesByCreator = ref([]);
const modulesByTags = ref([]);
const inputValueSearchBarModule = ref("");
const allModules = ref([]);

const displayAllModules = async () => {
  try {
    const response = await findAllModules();
    if (response && response.data.module) {
      allModules.value = response.data.module;
    }
  } catch (error) {
    console.error(error);
  }
};

const filterSearchModule = () => {
  const searchTerm = inputValueSearchBarModule.value.trim().toLowerCase();

  if (!searchTerm) {
    modulesByName.value = [];
    modulesByCreator.value = [];
    modulesByTags.value = [];
    return;
  }

  modulesByName.value = allModules.value.filter((module) =>
    module.name.toLowerCase().includes(searchTerm)
  );

  modulesByCreator.value = allModules.value.filter((module) =>
    module.User.username.toLowerCase().includes(searchTerm)
  );

  modulesByTags.value = allModules.value.filter((module) =>
    module.tags
      ?.toLowerCase()
      .split(",")
      .some((tag) => tag.trim().includes(searchTerm))
  );
};

const highlightName = (text) => {
  const searchTerm = inputValueSearchBarModule.value.trim();
  if (!searchTerm || !modulesByName.value.length) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(
    regex,
    `<span class="text-primaryRed underline">$1</span>`
  );
};

const highlightCreator = (text) => {
  const searchTerm = inputValueSearchBarModule.value.trim();
  if (!searchTerm || !modulesByCreator.value.length) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(
    regex,
    `<span class="text-primaryRed underline">$1</span>`
  );
};

const highlightTag = (text, moduleTags) => {
  const searchTerm = inputValueSearchBarModule.value.trim().toLowerCase();
  if (!searchTerm || !modulesByTags.value.length) return text;
  const matchingTag = getMatchingTag(moduleTags).toLowerCase();
  if (text.toLowerCase() === matchingTag) {
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(
      regex,
      `<span class="text-primaryRed underline">$1</span>`
    );
  }
  return text;
};

const plainText = (text) => {
  return text;
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

const getMatchingTag = (tags) => {
  const searchTerm = inputValueSearchBarModule.value.trim().toLowerCase();
  const tagArray = tags.split(",");
  const matchingTag = tagArray.find((tag) =>
    tag.toLowerCase().includes(searchTerm)
  );
  return matchingTag ? matchingTag.trim() : tagArray[0].trim();
};

onMounted(() => {
  displayAllModules();
  if (searchInput.value) {
    searchInput.value.focus();
  }
});

watch(inputValueSearchBarModule, () => {
  filterSearchModule();
});
</script>

<style scoped>
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #d9dce1;
  border-radius: 10px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background-color: #2d3748;
  border-radius: 10px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: #d9dce1;
}
</style>
