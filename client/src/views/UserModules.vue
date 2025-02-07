<template>
  <div class="flex items-center justify-center flex-col pt-5">
    <img
      class="w-[100px] h-[100px] rounded-full border border-white p-1 bg-white"
      :src="`${apiUrl}/uploadsFile/profil/${user.image}`"
      alt="Image"
    />
    <p class="text-2xl mb-5">{{ user.username }}</p>
  </div>
  <p class="text-center">Modules</p>
  <div class="flex flex-wrap justify-center gap-3 p-3">
    <div class="flex" v-for="module in modules" :key="module.id">
      <a
        :href="module.link"
        class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] rounded-2xl relative bg-[#141A22] text-white"
        :style="{
          border: `1px solid black`,
        }"
        target="_blank"
      >
        <img
          class="absolute w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] right-3 top-3 rounded-full border-[2px] border-white p-[2px] box-border"
          :src="`${apiUrl}/uploadsFile/module/${module.image}`"
          alt="Photo du module"
          loading="lazy"
        />
        <div class="p-3 h-full">
          <div class="flex items-center gap-2">
            <p class="text-base lg:text-xl font-bold">{{ module.name }}</p>
          </div>
          <div>
            <p class="mt-4 lg:mt-6 text-sm lg:text-base">
              {{ module.content }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
  <p class="text-center">Favoris</p>
  <div class="flex flex-wrap justify-center gap-3 p-3">
    <div class="flex" v-for="module in moduleFav" :key="module.id">
      <a
        :href="module.link"
        class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] rounded-2xl relative bg-[#141A22] text-white"
        :style="{
          border: `1px solid black`,
        }"
        target="_blank"
      >
        <img
          class="absolute w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] right-3 top-3 rounded-full border-[2px] border-white p-[2px] box-border"
          :src="`${apiUrl}/uploadsFile/module/${module.image}`"
          alt="Photo du module"
          loading="lazy"
        />
        <div class="p-3 h-full">
          <div class="flex items-center gap-2">
            <p class="text-base lg:text-xl font-bold">{{ module.name }}</p>
          </div>
          <div>
            <p class="mt-4 lg:mt-6 text-sm lg:text-base">
              {{ module.content }}
            </p>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { getInfosUserByUsername } from "../api/module";

const route = useRoute();

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const user = ref([]);
const modules = ref([]);
const moduleFav = ref([]);

const username = route.params.username;

const getInfos = async () => {
  try {
    const response = await getInfosUserByUsername(username);
    user.value = response.data.userData.user;
    modules.value = response.data.userData.ModuleUser;
    moduleFav.value = response.data.userData.FavorisUser;
  } catch (error) {
    console.error("Erreur :", error);
  }
};

getInfos();
</script>
