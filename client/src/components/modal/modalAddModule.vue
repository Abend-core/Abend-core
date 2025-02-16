<template>
  <div class="flex justify-center md:justify-end mb-4 mt-4">
    <button
      @click="displayModalModule"
      class="flex gap-1 bg-primaryRed p-paddingSm rounded-md text-white border border-black"
    >
      <span>+</span>
      <p>Ajoutez un module</p>
    </button>
  </div>
  <NotificationMessage />
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
          <p class="absolute text-[#8592A4] top-full">https://abend-core.org</p>
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
          <label for="add-module-input-tag" class="mb-1 mt-4">Tag</label>
          <div class="relative">
            <input
              id="add-module-input-tag"
              name="add_module_input_tag"
              type="text"
              class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900 relative"
              v-model="dataModule.tagsInput.value"
              @focus="displayTagList"
              @blur="hideTagList"
              @input="toggleIconVisibility"
              @click="displayAllTags"
            />
            <i
              v-if="isIconVisible"
              @click="addTag"
              class="ri-check-double-fill absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
            ></i>
            <div
              class="absolute border dark:border-gray-800 border-gray-200 w-full mt-1 p-2 rounded-md bg-gray-200 dark:bg-gray-700"
              v-if="isTagListVisible"
            >
              <p class="p-2">Liste des tags</p>
              <div class="flex gap-1 p-2">
                <span
                  class="bg-primaryRed text-white px-1 py-1 rounded-md text-sm"
                  >test</span
                ><span
                  class="bg-primaryRed text-white px-1 py-1 rounded-md text-sm"
                  >test</span
                ><span
                  class="bg-primaryRed text-white px-1 py-1 rounded-md text-sm"
                  >test</span
                >
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
          v-for="(tag, key) in selectedTags"
          :key="key"
          class="flex gap-1 bg-primaryRed text-white p-1 rounded-md text-xs"
        >
          <p>
            {{ tag }}
          </p>
          <span @click="removeTag(key)" class="cursor-pointer">&times;</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addModules, allTags } from "../../api/module.js";
import NotificationMessage from "../../components/notification/NotificationMessage.vue";
import { useNotificationStore } from "../../stores/notificationStore.js";

const { setNotification } = useNotificationStore();

const emit = defineEmits(["refresh-modules", "refresh-modulesById"]);

const id = sessionStorage.getItem("id");

const isModalVisibleModule = ref(false);
const imageURL = ref(null);
const selectedImageFile = ref(null);
const isTagListVisible = ref(false);
const isIconVisible = ref(false);
const selectedTags = ref({});

let dataModule = {
  name: ref(""),
  link: ref(""),
  content: ref(""),
  tags: ref(""),
  tagsInput: ref(""),
  image: ref(""),
};

const toggleIconVisibility = () => {
  isIconVisible.value = dataModule.tagsInput.value.trim().length > 0;
};

const displayTagList = () => {
  isTagListVisible.value = true;
};

const hideTagList = () => {
  isTagListVisible.value = false;
};

const displayModalModule = () => {
  isModalVisibleModule.value = !isModalVisibleModule.value;
};

const addTag = () => {
  const newTag = dataModule.tagsInput.value.trim();
  if (newTag) {
    const tagKey = `tag${Object.keys(selectedTags.value).length + 1}`;
    selectedTags.value[tagKey] = newTag;
    dataModule.tagsInput.value = "";
    isIconVisible.value = false;
  }
};

const removeTag = (key) => {
  delete selectedTags.value[key];
};

const displayAllTags = async () => {
  try {
    const response = await allTags();
    // tags.value = response.tags.value;
  } catch (error) {
    console.error(error);
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

const addModulesDashboard = async () => {
  try {
    const formData = new FormData();
    formData.append("image", selectedImageFile.value);
    formData.append("name", dataModule.name.value);
    formData.append("link", dataModule.link.value);
    formData.append("content", dataModule.content.value);
    console.log(selectedTags.value);
    formData.append("tags", JSON.stringify(selectedTags.value));
    formData.append("user_id", id);

    await addModules(formData);

    displayModalModule();
    dataModule.name.value = "";
    dataModule.link.value = "";
    dataModule.content.value = "";
    selectedTags.value = {};
    dataModule.image.value = "";
    imageURL.value = null;
    selectedImageFile.value = null;

    emit("refresh-modules");
    emit("refresh-modulesById");
  } catch (error) {
    setNotification(error.response.data.Erreur, "error");
  }
};
</script>
