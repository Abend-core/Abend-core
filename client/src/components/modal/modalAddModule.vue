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
      class="px-2 py-2 mb-3 bg-primaryRed text-white rounded-md text-sm lg:text-base font-medium hover:bg-red-700 transition-colors"
    >
      Créer un module
    </button>
  </div>
  <div
    v-if="isModalVisibleModule"
    class="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50 h-full overflow-auto"
  >
    <div class="w-full h-auto p-4" @click.self="displayModalModule">
      <div
        class="relative bg-white rounded-lg max-w-[1200px] border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white mt-12 mx-auto"
      >
        <p
          class="text-xl font-bold pt-4 uppercase tracking-tighter left-[50%] transform -translate-x-1/2 underlined-title"
        >
          Créer un nouveau module
        </p>
        <div
          class="mx-4 text-white mt-4 rounded-md p-4 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
          v-if="errorMessageModal"
        >
          <p>{{ errorMessageModal }}</p>
        </div>
        <div
          class="absolute top-0 right-3 cursor-pointer"
          @click="displayModalModule"
        >
          <p class="text-2xl">&times;</p>
        </div>
        <div
          class="w-full flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
        >
          <form
            id="formAddModule"
            @submit.prevent="addModulesDashboard"
            class="w-full lg:w-[50%]"
          >
            <div
              class="pl-5 pr-5 pb-8 sm:pb-5 pt-4 sm:pt-2 grid gap-4 sm:flex sm:flex-col lg:justify-center sm:items-center"
            >
              <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
                <label for="add-module-input-image" class="mb-1">Image</label>
                <input
                  id="add-module-input-image"
                  name="add_module_input_image"
                  class="hidden"
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="handleFileChange"
                  required
                />
                <label
                  for="add-module-input-image"
                  class="border bg-white dark:bg-gray-900 w-full lg:w-[400px] text-black dark:text-white py-2 px-4 rounded-md cursor-pointer"
                >
                  Choisir un fichier
                </label>
              </div>
              <input type="hidden" v-model="dataModule.image" />
              <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
                <label for="add-module-input-nom" class="mb-1">Nom</label>
                <input
                  id="add-module-input-nom"
                  name="module_input_nom"
                  type="text"
                  class="pl-3 py-2 border rounded-md w-full lg:w-[400px] dark:text-white dark:bg-gray-900"
                  v-model="dataModule.name.value"
                  @input="onInputName"
                  maxlength="26"
                  required
                />
              </div>
              <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
                <label for="add-module-input-content" class="mb-1"
                  >Description</label
                >
                <textarea
                  id="add-module-input-content"
                  name="add_module_input_content"
                  type="text"
                  class="scrollbar-custom pl-3 py-2 border rounded-md w-full lg:w-[400px] h-[80px] dark:text-white dark:bg-gray-900"
                  v-model="dataModule.content.value"
                  @input="onInputDescription"
                  maxlength="120"
                  required
                />
              </div>
              <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
                <div class="flex gap-2 items-center mt-[-10px] relative">
                  <label for="add-module-input-tag" class="mb-1 mt-3"
                    >Tag(s)</label
                  >
                  <div
                    v-for="(tag, index) in selectedTags"
                    :key="index"
                    class="flex gap-1 bg-primaryRed text-white px-3 py-1 rounded-full text-xs"
                  >
                    <p>{{ tag }}</p>
                    <span @click="removeTag(index)" class="cursor-pointer"
                      >&times;</span
                    >
                  </div>
                </div>
                <div class="relative">
                  <input
                    id="add-module-input-tag"
                    type="text"
                    v-model="tagInput"
                    class="pl-3 py-2 border rounded-md w-full lg:w-[400px] dark:text-white dark:bg-gray-900"
                    autocomplete="off"
                    @input="toggleIconVisibility"
                    @focus="displayTagList"
                    @blur="hideTagList"
                  />
                  <i
                    v-if="isIconVisible"
                    @click="validateTag"
                    class="ri-check-double-fill absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer text-primaryRed"
                  ></i>
                  <p
                    class="absolute bottom-[-20px] right-2 text-[#8592A4] text-xs"
                  >
                    7 caractères max.
                  </p>
                  <div
                    class="absolute w-full mt-2 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg z-[99]"
                    v-if="isTagListVisible && selectedTags.length < 3"
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
              <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full relative">
                <label for="add-module-input-lien" class="mb-1">Lien</label>
                <input
                  id="add-module-input-lien"
                  name="add_module_input_lien"
                  type="url"
                  class="pl-3 py-2 border rounded-md w-full lg:w-[400px] dark:text-white dark:bg-gray-900"
                  v-model="dataModule.link.value"
                  required
                />
                <p class="absolute text-[#8592A4] top-full">https://abnd.io</p>
              </div>
            </div>
          </form>
          <div
            class="w-full h-full sm:w-[50%] flex justify-center pt-0 pr-3 pl-3 sm:pr-0 sm:pl-0"
          >
            <div
              class="module-card relative w-[350px] h-[200px] lg:w-[375px] lg:h-[200px] mb-2 shadow-md rounded-2xl bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
            >
              <div class="px-4 py-3 h-full">
                <div class="flex items-center gap-2 relative">
                  <img
                    v-if="imageURL"
                    :src="imageURL"
                    alt="Image du module"
                    class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border dark:border-gray-600"
                  />
                  <p class="text-base lg:text-xl font-bold">
                    {{ dataModule.name }}
                  </p>
                </div>
                <div>
                  <p class="mt-2 lg:mt-4 text-sm lg:text-base">
                    {{ dataModule.content }}
                  </p>
                </div>
                <p
                  class="absolute bottom-3 underline text-[10px] lg:text-xs hover:text-primaryRed transition-colors cursor-pointer"
                >
                  {{ username }}
                </p>
                <div
                  class="flex gap-1 absolute bottom-3 left-[50%] transform -translate-x-1/2"
                >
                  <div
                    v-for="(tag, index) in selectedTags"
                    :key="index"
                    class="flex gap-1"
                  >
                    <p
                      class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-full text-xs hover:bg-gray-400 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      {{ tag }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end p-3">
          <button
            class="bg-primaryRed px-6 py-2 rounded-md text-white border border-red-500"
            type="submit"
            form="formAddModule"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addModules, allTags } from "../../api/module.js";
import { useAuthStore } from "../../stores/authStore.js";

const authStore = useAuthStore();
const username = ref(authStore.user.username);

const emit = defineEmits(["refresh-modules", "refresh-modulesById"]);

const id = sessionStorage.getItem("id");

const isModalVisibleModule = ref(false);
const imageURL = ref(null);
const selectedImageFile = ref(null);
const isIconVisible = ref(false);
const selectedTags = ref([]);
const tagInput = ref("");
const errorMessage = ref("");
const errorMessageModal = ref("");
const isTagListVisible = ref(false);
const tags = ref([]);

const onInputName = (e) => {
  dataModule.name.value = e.target.value;
};

const onInputDescription = (e) => {
  dataModule.content.value = e.target.value;
};

const displayTagList = async () => {
  if (selectedTags.value.length < 3) {
    await displayTags();
    isTagListVisible.value = true;
  } else {
    isTagListVisible.value = false;
  }
};
const hideTagList = () => {
  isTagListVisible.value = false;
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
    errorMessageModal.value = "Vous ne pouvez pas ajouter plus de 3 tags.";
    tagInput.value = "";
    return;
  }

  const isTagAlreadyUsed = tags.value.some((t) => t.name === tag);

  if (isTagAlreadyUsed) {
    errorMessageModal.value =
      "Ce tag existe déjà. Veuillez en choisir un autre ou le sélectionner dans la liste.";
    tagInput.value = "";
  } else if (selectedTags.value.includes(tag)) {
    errorMessageModal.value = "Ce tag a déjà été ajouté.";
    tagInput.value = "";
  } else {
    addTag(tag);
    tagInput.value = "";
    isIconVisible.value = false;
    errorMessageModal.value = "";
  }
};

const addTag = (tag) => {
  if (!selectedTags.value.includes(tag)) {
    selectedTags.value.push(tag);
    errorMessageModal.value = "";
  }
};

const removeTag = (index) => {
  selectedTags.value.splice(index, 1);
};

const displayModalModule = () => {
  isModalVisibleModule.value = !isModalVisibleModule.value;
  if (!isModalVisibleModule.value) {
    resetForm();
  }
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

const resetForm = () => {
  dataModule.name.value = "";
  dataModule.link.value = "";
  dataModule.content.value = "";
  dataModule.image.value = "";
  selectedTags.value = [];
  imageURL.value = null;
  selectedImageFile.value = null;
  tagInput.value = "";
  isIconVisible.value = false;
  errorMessageModal.value = "";
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
    errorMessageModal.value = "";

    emit("refresh-modules");
    emit("refresh-modulesById");
  } catch (error) {
    errorMessageModal.value =
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

.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}
</style>
