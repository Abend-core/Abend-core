<template>
  <div class="flex justify-end mb-3">
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
    class="bg-white mb-6 p-7 rounded-md relative max-w-[100%] mx-auto dark:bg-gray-800 dark:text-white dark:border-2 dark:border-black"
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

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-module-input-prenom" class="mb-1">Lien</label>
        <input
          id="add-module-input-lien"
          name="add_module_input_lien"
          type="url"
          class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
          v-model="dataModule.link.value"
        />
        <p class="absolute text-[#8592A4] bottom-0">https://abend-core.org</p>
      </div>

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-module-input-content" class="mb-1">Description</label>
        <input
          id="add-module-input-content"
          name="add_module_input_content"
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
</template>

<script setup>
import { ref } from "vue";
import { addModules } from "../../api/module.js";
import { uploadImageModule } from "../../api/upload.js";

const emit = defineEmits(["refresh-modules", "refresh-modulesById"]);

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

const id = sessionStorage.getItem("id");

const addModulesDashboard = async () => {
  try {
    let imagePath = null;

    const result = await addModules({
      name: dataModule.name.value,
      link: dataModule.link.value,
      content: dataModule.content.value,
      isShow: dataModule.isShow.value,
      user_id: id,
    });

    if (result.status === 200 && selectedImageFile.value) {
      const formData = new FormData();
      formData.append("id", result.data.module.id);
      formData.append("image", selectedImageFile.value);
      const uploadResponse = await uploadImageModule(formData);
    }

    dataModule.name.value = "";
    dataModule.link.value = "";
    dataModule.content.value = "";
    dataModule.image.value = "";
    imageURL.value = null;
    selectedImageFile.value = null;

    emit("refresh-modules");
    emit("refresh-modulesById");
  } catch (error) {
    console.log(error);
  }
};
</script>
