<template>
  <div class="bg-white rounded-md p-[12px] mt-3 mb-3">
    <h1 class="font-bold">Gérer mes modules</h1>
    <p class="text-[#4954ecde] mt-1">Profil Dashboard</p>
  </div>
  <div class="flex justify-end mt-3 mb-3">
    <button
      @click="displayModalModule"
      class="flex gap-1 bg-[#4954ecde] p-[6px] rounded-md text-white border border-black"
    >
      <span>+</span>
      <p>Ajoutez un module</p>
    </button>
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
    <table v-if="modules.length > 0" class="w-full">
      <thead>
        <tr class="text-left border-b border-[#F4F6FA]">
          <th class="p-3">Nom</th>
          <th class="p-3">Lien</th>
          <th class="p-3">Couleur</th>
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
          class="hover:bg-[#F4F6FA]"
        >
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
          <td class="p-3">{{ module.isShow ? "Visible" : "Invisible" }}</td>
          <td class="p-3">
            <div class="flex gap-3">
              <img
                class="cursor-pointer w-[24px] h-[24px]"
                src="../../assets/images/profil-icon/icon-profil-5.png"
                alt=""
              />
              <img
                class="cursor-pointer w-[24px] h-[24px]"
                src="../../assets/images/profil-icon/icon-profil-6.png"
                alt=""
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getModuleById } from "../../api/module";
import { formatDateTime } from "../../utils/date";
import { addModules } from "../../api/module";
import { uploadImageDashbaord } from "../../api/upload";

const id = sessionStorage.getItem("id");

const modules = ref([]);
let errorMessage = ref("");

const getModulesById = async () => {
  try {
    const response = await getModuleById(id);
    if (response.data.modules.length === 0) {
      errorMessage.value = "Vous n'avez pas encore créé de module.";
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
  color: ref("#000000"),
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
    errorMessage.value = "";

    getModulesById();
  } catch (error) {
    console.error("Error adding module:", error);
  }
};

getModulesById();
</script>
