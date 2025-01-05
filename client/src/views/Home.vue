<template>
  <main class="h-full relative">
    <div
      v-if="isModalVisible"
      class="absolute w-full h-full backdrop-blur-md z-10"
    ></div>
    <div class="absolute w-[100%] h-[100%]">
      <div class="p-6" v-if="isAuthenticated && isAdmin">
        <img
          class="w-[32px] h-[32px] cursor-pointer"
          src="../assets/images/home-icon/add.png"
          alt="Ajoutez un module"
          @click="displayAddModule"
        />
      </div>
      <div
        v-if="isModalVisible"
        class="w-[700px] h-[700px] bg-[#f7f5f5] absolute left-[50%] transform -translate-x-1/2 z-20 rounded-md border border-black"
      >
        <p
          class="cursor-pointer relative left-[96%] w-fit text-[22px]"
          @click="displayAddModule"
        >
          &times;
        </p>
        <div>
          <img
            class="w-[56px] h-[56px] mx-auto mb-[12px]"
            src="../assets/images/abend-core-logo.png"
          />
          <p class="text-center mb-3 text-2xl">Ajoutez un module</p>
          <div class="w-[300px] mx-auto">
            <p class="mb-1">Nom</p>
            <input class="mb-3" type="text" v-model="dataModule.name.value" />
            <p class="mb-1">Lien</p>
            <input class="mb-3" type="text" v-model="dataModule.link.value" />
            <p class="mb-1">Couleur attribuée</p>
            <input type="color" v-model="dataModule.color.value" />
            <input
              type="hidden"
              placeholder="Nom"
              v-model="dataModule.isShow.value"
            />
            <div class="flex justify-center mt-3">
              <button
                class="bg-[#4b9945] text-white font-bold border border-black"
                type="submit"
                @click="addModulesHome"
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      </div>
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
          ></a>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { findAllModules, addModules } from "../api/module";

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

const modules = ref([]);
const getModules = async () => {
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
  isShow: ref(true),
};

const addModulesHome = async () => {
  try {
    await addModules({
      name: dataModule.name.value,
      link: dataModule.link.value,
      color: dataModule.color.value,
      isShow: dataModule.isShow.value ? 1 : 0,
    });
    dataModule.name.value = "";
    dataModule.link.value = "";
    dataModule.isShow.value = "";
    getModules();
    displayAddModule();
  } catch (error) {
    console.error(error);
  }
};

getModules();
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
