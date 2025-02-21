<template>
  <main class="pt-8 pl-8 pr-8 max-w-[1400px] mx-auto">
    <div
      class="mb-5 sm:mb-28 flex justify-center items-center flex-col sm:flex-row gap-5 relative"
    >
      <div v-if="user">
        <img
          class="w-[150px] h-[150px] rounded-full border border-white p-1 bg-white"
          :src="`${apiUrl}/uploadsFile/profil/${user.image}`"
          alt="Image"
        />
      </div>
      <div>
        <p class="text-2xl text-center sm:text-left mb-5">
          {{ user.username }}
        </p>
        <p class="text-justify max-w-[500px]">
          {{ user.content }}
        </p>
      </div>
      <button
        v-if="authStore.user && user && authStore.user.id !== user.id"
        class="absolute top-36 p-2 text-white rounded-md left-[70%]"
        :class="{
          'bg-primaryRed': !isFollowing,
          'bg-gray-500': isFollowing,
        }"
        @click="followUser"
      >
        {{ isFollowing ? "Suivi(e)" : "Suivre" }}
      </button>
    </div>
    <div class="flex justify-evenly gap-5-5">
      <p
        class="text-center p-2 rounded-md cursor-pointer transition-colors"
        @click="setActiveSection('modules')"
        :class="{
          'bg-gray-800 dark:bg-gray-700 text-white':
            activeSection === 'modules',
          'bg-gray-100 dark:bg-black text-black dark:text-white':
            activeSection !== 'modules',
        }"
      >
        <i class="ri-layout-grid-2-fill"></i>
        <span> Modules</span>
      </p>
      <p
        class="text-center p-2 rounded-md cursor-pointer transition-colors"
        @click="setActiveSection('favoris')"
        :class="{
          'bg-gray-800 dark:bg-gray-700 text-white':
            activeSection === 'favoris',
          'bg-gray-100 dark:bg-black text-black dark:text-white':
            activeSection !== 'favoris',
        }"
      >
        <i class="ri-heart-add-2-fill"></i>
        <span> Favoris</span>
      </p>
    </div>
    <div v-if="activeSection === 'modules'">
      <div class="flex flex-wrap justify-center gap-5 p-3">
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
              <p class="mt-4 lg:mt-6 text-sm lg:text-base">
                {{ module.content }}
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div v-if="activeSection === 'favoris'">
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
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getInfosUserByUsername } from "../api/module";
import { follow } from "../api/user";
import { useAuthStore } from "../stores/authStore";

const route = useRoute();
const authStore = useAuthStore();

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const user = ref({});
const modules = ref([]);
const moduleFav = ref([]);
const isFollowing = ref(false);

const username = route.params.username;

const activeSection = ref("modules");

const setActiveSection = (section) => {
  activeSection.value = section;
};

const getInfos = async () => {
  try {
    const response = await getInfosUserByUsername(username);
    user.value = response.data.userData.user;
    modules.value = response.data.userData.ModuleUser;
    moduleFav.value = response.data.userData.FavorisUser;
    isFollowing.value = response.data.userData.user.isFollow;
  } catch (error) {
    console.error(error);
  }
};

const followUser = async () => {
  try {
    await follow(user.value.id);
    isFollowing.value = !isFollowing.value;

    authStore.setUser({
      ...authStore.user,
      abonnes: authStore.user.abonnes,
      suivies: isFollowing.value
        ? authStore.user.suivies + 1
        : authStore.user.suivies - 1,
    });
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getInfos();
});
</script>

<style scoped>
.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}
</style>
