<template>
  <main class="h-full">
    <div class="flex items-center justify-center flex-wrap gap-10 mt-[60px]">
      <div class="flex" v-for="module in modules" :key="module.id">
        <a
          :href="module.link"
          class="carre rotate-45 rounded-2xl"
          :style="{
            border: `2px solid ${module.color}`,
            backgroundColor: '#D9D9D9',
          }"
          target="_blank"
        >
          <img
            class="w-full h-full rounded-2xl"
            :src="`http://localhost:5000/uploadsFile/module/${module.image}`"
            alt=""
        /></a>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { findAllModules, addModules } from "../api/module";
import { uploadImageModule } from "../api/upload";
defineProps({
  isAuthenticated: {
    type: Boolean,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

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

const modules = ref([]);
const allModules = async () => {
  try {
    const response = await findAllModules();
    modules.value = response.data.module;
  } catch (error) {
    console.error(error);
  }
};

const isModalVisible = ref(false);
const displayAddModule = () => {
  isModalVisible.value = !isModalVisible.value;
};

let dataModule = {
  name: ref(""),
  link: ref(""),
  color: ref("#000000"),
  image: ref(""),
  isShow: ref(true),
};
const id = sessionStorage.getItem("id");

const addModulesHome = async () => {
  try {
    let imagePath = null;

    if (selectedImageFile.value) {
      const formData = new FormData();
      formData.append("image", selectedImageFile.value);

      const uploadResponse = await uploadImageModule(formData);
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
    displayAddModule();
  } catch (error) {
    console.error("Error adding module:", error);
  }
};

allModules();
</script>

<style scoped>
.carre {
  width: 112px;
  height: 112px;
}

input {
  border: 1px solid #d1d9e0;
  display: block;
  width: 100%;
}

input,
button {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 6px;
}
</style>
