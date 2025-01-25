<template>
  <main class="p-4">
    <div
      class="bg-white rounded-md p-[12px] mt-3 mb-3 dark:bg-gray-800 dark:text-white"
    >
      <h1 class="font-bold">Gérer mes modules</h1>
      <p class="text-[#F82B30] mt-1">Module Dashboard</p>
    </div>
    <div class="flex justify-end mt-3 mb-3">
      <button
        @click="displayModalModule"
        class="flex gap-1 bg-[#F82B30] p-[6px] rounded-md text-white border border-black"
      >
        <span>+</span>
        <p>Ajoutez un module</p>
      </button>
    </div>
    <div
      v-if="isModalVisibleModule"
      class="bg-white mb-6 p-7 rounded-md relative max-w-[100%] mx-auto dark:bg-gray-800 dark:text-white dark:border-2 dark:border-gray-900"
    >
      <p class="font-bold mb-3 text-left">Ajoutez un module</p>
      <div
        class="absolute top-0 right-3 cursor-pointer"
        @click="displayModalModule"
      >
        <p class="text-[22px]">&times;</p>
      </div>
      <div
        class="grid gap-4 sm:flex sm:flex-col lg:flex-row lg:flex-wrap lg:items-end"
      >
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-user-input-nom" class="mb-1">Nom</label>
          <input
            id="add-module-input-nom"
            name="module_input_nom"
            type="text"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataModule.name.value"
          />
        </div>

        <div class="relative flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-module-input-prenom" class="mb-1">Lien</label>
          <input
            id="add-module-input-lien"
            name="add_module_input_lien"
            type="url"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataModule.link.value"
          />
          <p class="absolute text-[#8592A4] bottom-[-25px]">
            https://abend-core.org
          </p>
        </div>

        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-user-input-content" class="mb-1">Description</label>
          <input
            id="add-module-input-content"
            name="module_input_content"
            type="text"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataModule.content.value"
          />
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
          />
        </div>

        <input type="hidden" v-model="dataModule.isShow.value" />
        <input type="hidden" v-model="dataModule.image" />

        <div class="flex justify-center lg:mt-0 sm:mt-4">
          <button
            class="bg-[#F82B30] px-6 py-2 rounded-md text-white border border-black"
            type="submit"
            @click="addModulesDashboard"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
    <div class="bg-white rounded-md max-h-[800px] overflow-auto mb-5">
      <div
        v-if="errorMessage"
        class="text-white rounded-[6px] p-4 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
      >
        <div>
          <div class="text-[14px] text-[#1f2328]">
            {{ errorMessage }}
          </div>
        </div>
      </div>
      <table
        v-if="modules.length > 0"
        class="w-full dark:text-white dark:bg-gray-800"
      >
        <thead>
          <tr class="text-left border-b border-[#F4F6FA]">
            <th class="p-3">Nom</th>
            <th class="p-3">Lien</th>
            <th class="p-3">Description</th>
            <th class="p-3">Image</th>
            <th class="p-3">Date de création</th>
            <th class="p-3">Visibilité</th>
            <th class="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="module in modules"
            :key="module.id"
            class="hover:bg-[#F4F6FA] dark:hover:text-black dark:hover:bg-gray-500"
          >
            <td class="p-3">{{ module.name }}</td>
            <td class="p-3">{{ module.link }}</td>
            <td class="p-3">{{ module.content }}</td>
            <td class="p-3">
              <img
                :src="`${apiUrl}/uploadsFile/module/${module.image}`"
                alt="Module image"
                class="w-[50px] h-[50px] rounded-2xl"
              />
            </td>
            <td class="p-3">{{ formatDateTime(module.createdAt) }}</td>
            <td class="p-3">
              <label class="switch">
                <input
                  type="checkbox"
                  v-model="module.isShow"
                  @change="toggleVisibility(module.id, module.isShow)"
                />
                <span class="slider round"></span>
              </label>
            </td>
            <td class="p-3">
              <div class="flex gap-3">
                <i
                  class="ri-delete-bin-4-fill text-[24px] cursor-pointer"
                  @click="deleteModuleTable(module.id)"
                ></i>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { getModuleById, updateModuleById } from "../api/module";
import { formatDateTime } from "../utils/date";
import { addModules } from "../api/module";
import { uploadImageDashboard } from "../api/upload";
import { deleteModule } from "../api/module";
const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

defineProps({
  isAuthenticated: Boolean,
  isAdmin: Boolean,
});
defineEmits(["login"]);

const id = sessionStorage.getItem("id");

const modules = ref([]);
let errorMessage = ref("");

const getModulesById = async () => {
  try {
    const response = await getModuleById(id);
    if (response.data.modules.length === 0) {
      errorMessage.value = "Vous n'avez pas encore créé de module !";
      modules.value = [];
    } else {
      modules.value = response.data.modules;
    }
  } catch (error) {
    errorMessage.value =
      "Une erreur s'est produite lors de la récupération des modules.";
    console.error(error);
  }
};

const isModalVisibleModule = ref(false);
const displayModalModule = () => {
  isModalVisibleModule.value = !isModalVisibleModule.value;
};

let dataModule = {
  name: ref(""),
  link: ref(""),
  content: ref(""),
  image: ref(""),
  isShow: ref(true),
};

const imageURL = ref(null);
const selectedImageFile = ref(null);

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
    formData.append("name", dataModule.name.value);
    formData.append("link", dataModule.link.value);
    formData.append("content", dataModule.content.value);
    formData.append("image", selectedImageFile.value);
    formData.append("isShow", dataModule.isShow.value);
    formData.append("user_id", id);

    const result = await addModules(formData);

    dataModule.name.value = "";
    dataModule.link.value = "";
    dataModule.content.value = "";
    dataModule.image.value = "";
    imageURL.value = null;
    selectedImageFile.value = null;
    errorMessage.value = "";
    getModulesById();
  } catch (error) {
    errorMessage.value = error.response.data.message;
    setTimeout(() => (errorMessage.value = ""), 5000);
  }
};

const deleteModuleTable = async (idModule) => {
  try {
    await deleteModule(idModule);
    await getModulesById();
  } catch (error) {
    console.error("Erreur lors de la suppression du module :", error);
  }
};

const toggleVisibility = async (idModule, data) => {
  try {
    const response = await updateModuleById(idModule, {
      isShow: data,
    });
  } catch (error) {
    errorMessage.value =
      "Une erreur s'est produite lors de la récupération des modules.";
    console.error(error);
  }
};

getModulesById();
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #f82b30;
}

input:focus + .slider {
  box-shadow: 0 0 1px #f82b30;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
