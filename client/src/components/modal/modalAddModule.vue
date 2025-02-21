<template>
  <div
    class="text-white mt-4 rounded-md p-4 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
    v-if="errorMessage"
  >
    <p>{{ errorMessage }}</p>
  </div>
  <div class="flex justify-center md:justify-end mb-4 mt-4">
    <button
      @click="displayModalModule"
      class="flex gap-1 bg-primaryRed p-paddingSm rounded-md text-white border border-black"
    >
      <span>+</span>
      <p>Ajoutez un module</p>
    </button>
  </div>
  <div
    v-if="isModalVisibleModule"
    class="bg-white p-7 rounded-md relative max-w-full mx-auto dark:bg-gray-700 dark:text-white dark:border dark:border-black"
  >
    <p class="font-bold mb-3 text-left">Ajoutez un module</p>
    <div
      class="absolute top-0 right-3 cursor-pointer"
      @click="displayModalModule"
    >
      <p class="text-2xl">&times;</p>
    </div>
    <form @submit.prevent="addModulesDashboard">
      <div
        class="grid gap-4 sm:flex sm:flex-col lg:flex-row lg:flex-wrap lg:items-end"
      >
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-module-input-nom" class="mb-1">Nom</label>
          <input
            id="add-module-input-nom"
            name="module_input_nom"
            type="text"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataModule.name.value"
            required
          />
        </div>
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full relative">
          <label for="add-module-input-lien" class="mb-1">Lien</label>
          <input
            id="add-module-input-lien"
            name="add_module_input_lien"
            type="url"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataModule.link.value"
            required
          />
          <p class="absolute text-[#8592A4] top-full">https://abnd.io</p>
        </div>
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-module-input-content" class="mb-1 mt-4"
            >Description</label
          >
          <input
            id="add-module-input-content"
            name="add_module_input_content"
            type="text"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataModule.content.value"
            required
          />
        </div>
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-module-input-tag" class="mb-1 mt-4">Tag(s)</label>
          <div class="relative">
            <input
              id="add-module-input-tag"
              type="text"
              v-model="tagInput"
              class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
              @input="toggleIconVisibility"
              @focus="displayTagList"
              @blur="hideTagList"
            />
            <i
              v-if="isIconVisible"
              @click="validateTag"
              class="ri-check-double-fill absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-primaryRed"
            ></i>
            <div
              class="absolute w-full mt-2 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg"
              v-if="isTagListVisible"
              @mousedown.prevent
            >
              <p
                class="text-base font-semibold text-gray-700 dark:text-white mb-3"
              >
                Liste des tags
              </p>
              <div
                class="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-custom"
              >
                <div
                  v-for="tag in tags"
                  :key="tag.id"
                  class="flex items-center"
                >
                  <span
                    @click="addTag(tag.name)"
                    class="px-3 py-1 bg-primaryRed text-white text-xs font-medium rounded-full cursor-pointer hover:bg-red-600"
                  >
                    {{ tag.name }}
                    <span
                      class="ml-1 px-1.5 py-0.5 bg-red-700 rounded-full text-[10px]"
                    >
                      {{ tag.uses }}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-module-input-image" class="mb-1">Image</label>
          <input
            id="add-module-input-image"
            name="add_module_input_image"
            class="pl-3 py-2 border rounded-md w-full sm:w-full md:w-full lg:w-[195px] xl:[w-195px]"
            type="file"
            accept="image/png, image/jpeg"
            @change="handleFileChange"
            required
          />
        </div>
        <input type="hidden" v-model="dataModule.image" />
        <div class="flex justify-center lg:mt-0 sm:mt-4">
          <button
            class="bg-primaryRed px-6 py-2 rounded-md text-white border border-black"
            type="submit"
          >
            Créer
          </button>
        </div>
      </div>
      <div class="mt-6 flex gap-2">
        <div
          v-for="(tag, index) in selectedTags"
          :key="index"
          class="flex gap-1 bg-primaryRed text-white px-3 py-1 rounded-full text-xs"
        >
          <p>{{ tag }}</p>
          <span @click="removeTag(index)" class="cursor-pointer">&times;</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addModules, allTags } from "../../api/module.js";

const emit = defineEmits(["refresh-modules", "refresh-modulesById"]);

const id = sessionStorage.getItem("id");

const isModalVisibleModule = ref(false);
const imageURL = ref(null);
const selectedImageFile = ref(null);
const isIconVisible = ref(false);
const selectedTags = ref([]);
const tagInput = ref("");
const errorMessage = ref("");
const isTagListVisible = ref(false);
const tags = ref([]);

const displayTagList = async () => {
  displayTags();
  isTagListVisible.value = true;
};

const hideTagList = () => {
  setTimeout(() => {
    isTagListVisible.value = false;
  }, 100);
};

const displayTags = async () => {
  try {
    const response = await allTags();
    tags.value = response.data.tags;
  } catch (error) {
    console.error(error);
  }
};

let dataModule = {
  name: ref(""),
  link: ref(""),
  content: ref(""),
  image: ref(""),
};

const toggleIconVisibility = () => {
  isIconVisible.value = tagInput.value.trim().length > 0;
};

const validateTag = () => {
  const tag = tagInput.value.trim();

  if (selectedTags.value.length >= 3) {
    errorMessage.value = "Vous ne pouvez pas ajouter plus de 3 tags.";
    tagInput.value = "";
    return;
  }

  const isTagAlreadyUsed = tags.value.some((t) => t.name === tag);

  if (isTagAlreadyUsed) {
    errorMessage.value =
      "Ce tag existe déjà. Veuillez en choisir un autre ou le sélectionner dans la liste.";
    tagInput.value = "";
  } else if (selectedTags.value.includes(tag)) {
    errorMessage.value = "Ce tag a déjà été ajouté.";
    tagInput.value = "";
  } else {
    addTag(tag);
    tagInput.value = "";
    isIconVisible.value = false;
    errorMessage.value = "";
  }
};

const addTag = (tag) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag);
    errorMessage.value = "";
  }
};

const removeTag = (index) => {
  selectedTags.value.splice(index, 1);
};

const displayModalModule = () => {
  isModalVisibleModule.value = !isModalVisibleModule.value;
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    selectedImageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageURL.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const addModulesDashboard = async () => {
  try {
    const formData = new FormData();
    formData.append("image", selectedImageFile.value);
    formData.append("name", dataModule.name.value);
    formData.append("link", dataModule.link.value);
    formData.append("content", dataModule.content.value);
    formData.append("user_id", id);
    formData.append("tag1", selectedTags.value[0] || "");
    formData.append("tag2", selectedTags.value[1] || "");
    formData.append("tag3", selectedTags.value[2] || "");

    await addModules(formData);

    displayModalModule();

    dataModule.name.value = "";
    dataModule.link.value = "";
    dataModule.content.value = "";
    selectedTags.value = [];
    dataModule.image.value = "";
    imageURL.value = null;
    selectedImageFile.value = null;

    emit("refresh-modules");
    emit("refresh-modulesById");
  } catch (error) {
    errorMessage.value =
      error.response.data.erreur ||
      "Une erreur est survenue lors de la création du module.";
  }
};
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
