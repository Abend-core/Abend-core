<template>
  <div
    class="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center gap-5 mb-5"
  >
    <div class="relative">
      <input
        class="pl-10 py-2 border rounded-md w-[300px]"
        type="text"
        placeholder="Rechercher..."
        v-model="inputValueSearchBarModule"
        @change="filterSearchModule"
      />
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <img
          class="h-5 w-5 cursor-pointer"
          src="../assets/images/dashboard-icon/search-bar-icon.png"
        />
      </span>
    </div>
    <div class="flex gap-3">
      <p class="text-[#746a6ade]">{{ countModule }} selected</p>
    </div>
    <img
      class="cursor-pointer"
      src="../assets/images/dashboard-icon/bin-icon.png"
      @click="deleteModuleTable"
    />

    <div class="ml-0 sm:ml-0 md:ml-auto lg:ml-auto xl:ml-auto">
      <button
        @click="displayModalModule"
        class="flex gap-1 bg-[#4954ecde] p-[6px] rounded-md text-white border border-black"
      >
        <span>+</span>
        <p>Ajoutez un module</p>
      </button>
    </div>
  </div>

  <div
    v-if="isModalVisibleModule"
    class="bg-white mb-6 p-6 rounded-md relative max-w-[100%] mx-auto"
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
          class="pl-3 py-2 border rounded-md w-full"
          v-model="dataModule.name.value"
        />
      </div>

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-module-input-prenom" class="mb-1">Lien</label>
        <input
          id="add-module-input-lien"
          name="add_module_input_lien"
          type="url"
          class="pl-3 py-2 border rounded-md w-full"
          v-model="dataModule.link.value"
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

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-module-input-couleur" class="mb-1">Couleur</label>
        <input
          id="add-module-input-couleur"
          name="add_module_input_couleur"
          type="color"
          v-model="dataModule.color.value"
        />
      </div>

      <input type="hidden" v-model="dataModule.isShow.value" />
      <input type="hidden" v-model="dataModule.image" />

      <div class="flex justify-center lg:mt-0 sm:mt-4">
        <button
          class="bg-[#4954ecde] px-6 py-2 rounded-md text-white border border-black"
          type="submit"
          @click="addModulesDashboard"
        >
          Créer
        </button>
      </div>
    </div>
  </div>
  <div class="bg-white p-6 rounded-md max-h-[800px] overflow-auto mb-5">
    <table class="w-full">
      <thead>
        <tr class="text-left border-b border-[#F4F6FA]">
          <th class="p-3">
            <input
              id="checkbox-dashboad-table-allUsers"
              name="checkbox_dashboad_table_allUsers"
              type="checkbox"
              class="select-users cursor-pointer"
            />
          </th>
          <th class="p-3">Nom</th>
          <th class="p-3">Lien</th>
          <th class="p-3">Couleur</th>
          <th class="p-3">Image</th>
          <th class="p-3">Date de création</th>
          <th class="p-3">Visibilité</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="module in modules"
          :key="module.id"
          class="hover:bg-[#F4F6FA]"
        >
          <td class="p-3">
            <input
              id="checkbox-dashboard-table-oneUser"
              name="checkbox_dashboard_table_oneUser"
              type="checkbox"
              class="cursor-pointer"
              @change="updateUserCountModule"
              @click="selectAllModules"
              :value="module.id"
            />
          </td>
          <td class="p-3">{{ module.name }}</td>
          <td class="p-3">{{ module.link }}</td>
          <td class="p-3">
            <p
              class="w-fit p-1 rounded-2xl"
              :style="{ backgroundColor: `${module.color}` }"
            >
              {{ module.color }}
            </p>
          </td>
          <td class="p-3">
            <img
              :src="`http://localhost:5000/uploadsFile/module/${module.image}`"
              alt="Module image"
              class="w-[50px] h-[50px] rounded-2xl"
            />
          </td>
          <td class="p-3">{{ formatDateTime(module.createdAt) }}</td>
          <td class="p-3">{{ module.isShow }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { formatDateTime } from "../../utils/date";
import {
  findAllModules,
  addModules,
  deleteModule,
  filterModule,
} from "../../api/module";
import { uploadImageDashbaord } from "../../api/upload";

const modules = ref([]);
const allModules = async () => {
  try {
    const response = await findAllModules();
    modules.value = response.data.module;
  } catch (error) {
    console.error(error);
  }
};

allModules();

let countModule = ref(0);
const updateUserCountModule = (event) => {
  countModule.value += event.target.checked ? 1 : -1;
};

const isModalVisibleModule = ref(false);
const displayModalModule = () => {
  isModalVisibleModule.value = !isModalVisibleModule.value;
};

let idModules = [];

const selectAllModules = (event) => {
  const idModule = event.target.value;
  const checked = event.target.checked;
  if (checked) {
    idModules.push(idModule);
  } else {
    for (let i = 0; i < idModules.length; i++) {
      if (idModules[i] === idModule) {
        idModules.splice(i, 1);
      }
    }
  }
};
const deleteModuleTable = async () => {
  for (let i = 0; i < idModules.length; i++) {
    try {
      await deleteModule(idModules[i]);
    } catch (error) {
      console.error(error);
    }
  }
  countModule.value = 0;
  idModules = [];
  allModules();
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

let dataModule = {
  name: ref(""),
  link: ref(""),
  color: ref("#000000"),
  image: ref(""),
  isShow: ref(true),
};
const id = sessionStorage.getItem("id");

const addModulesDashboard = async () => {
  try {
    let imagePath = null;

    if (selectedImageFile.value) {
      const formData = new FormData();
      formData.append("image", selectedImageFile.value);

      const uploadResponse = await uploadImageDashbaord(formData);
      imagePath = uploadResponse.data.filePath;
    }

    await addModules({
      name: dataModule.name.value,
      link: dataModule.link.value,
      color: dataModule.color.value,
      image: imagePath || "",
      isShow: dataModule.isShow.value ? 1 : 0,
      user_id: id,
    });

    dataModule.name.value = "";
    dataModule.link.value = "";
    dataModule.color.value = "#000000";
    dataModule.image.value = "";
    imageURL.value = null;
    selectedImageFile.value = null;

    allModules();
  } catch (error) {
    console.error("Error adding module:", error);
  }
};

const inputValueSearchBarModule = ref("");
const filterSearchModule = async () => {
  modules.value = [];
  try {
    const response = await filterModule({
      search: inputValueSearchBarModule.value,
    });
    if (response && response.data.module) {
      idModules = [];
      countModule.value = 0;
      modules.value = response.data.module;
    }
  } catch (error) {
    console.error(error);
  }
};

watch(inputValueSearchBarModule, () => {
  filterSearchModule();
});
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
