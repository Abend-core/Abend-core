<template>
  <main class="pt-8 pl-8 pr-8 max-w-[1400px] mx-auto">
    <div
      class="mb-5 sm:mb-28 flex items-center flex-col sm:flex-row gap-5 relative"
    >
      <div v-if="user">
        <img
          class="w-[200px] h-[200px] rounded-full border border-white p-1 bg-white shadow-lg"
          :src="`${apiUrl}/uploadsFile/profil/${user.image}`"
          alt="Image"
        />
      </div>
      <div>
        <p class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {{ user.username }}
        </p>
        <div class="flex gap-6 text-gray-600 mt-2 dark:text-gray-300">
          <p class="cursor-pointer hover:text-primaryRed transition-colors">
            <span class="font-semibold">{{ followersCount }}</span>
            abonnés
          </p>
          <p class="cursor-pointer hover:text-primaryRed transition-colors">
            <span class="font-semibold">{{ suivisCount }}</span>
            suivi(e)s
          </p>
        </div>
        <p class="text-gray-500 dark:text-gray-400 mt-3 italic max-w-md">
          "{{ user.content }}""
        </p>
      </div>
      <button
        v-if="authStore.user && user && authStore.user.id !== user.id"
        class="absolute top-[220px] sm:top-42 p-2 text-white rounded-md left-[75%]"
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
    <Transition name="fade" mode="out-in">
      <div v-if="activeSection === 'modules'" key="modules">
        <div class="flex flex-wrap justify-center gap-5 p-3">
          <div class="flex" v-for="module in modules" :key="module.id">
            <a
              :href="module.link"
              class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
              target="_blank"
            >
              <div class="px-4 py-3 h-full">
                <div class="flex items-center gap-2 relative">
                  <img
                    class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border"
                    :src="`${apiUrl}/uploadsFile/module/${module.image}`"
                    alt="Photo du module"
                    loading="lazy"
                  />
                  <p class="text-base lg:text-xl font-bold">
                    {{ module.name }}
                  </p>
                  <i
                    v-if="module.User.isAdmin"
                    class="ri-verified-badge-fill text-black text-xl lg:text-2xl dark:text-white cursor-pointer"
                  ></i>
                </div>
                <div>
                  <p class="mt-2 lg:mt-4 text-sm lg:text-base">
                    {{ module.content }}
                  </p>
                </div>
                <div
                  v-if="module.tags"
                  class="absolute bottom-3 left-[50%] transform -translate-x-1/2 flex gap-1 mt-2"
                >
                  <span
                    v-for="tag in module.tags.split(',')"
                    :key="tag"
                    class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-md text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
      <div v-else-if="activeSection === 'favoris'" key="favoris">
        <div class="flex flex-wrap justify-center gap-3 p-3">
          <div class="flex" v-for="module in moduleFav" :key="module.id">
            <a
              :href="module.link"
              class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
              target="_blank"
            >
              <div class="px-4 py-3 h-full">
                <div class="flex items-center gap-2 relative">
                  <img
                    class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border"
                    :src="`${apiUrl}/uploadsFile/module/${module.image}`"
                    alt="Photo du module"
                    loading="lazy"
                  />
                  <p class="text-base lg:text-xl font-bold">
                    {{ module.name }}
                  </p>
                  <i
                    v-if="module.User.isAdmin"
                    class="ri-verified-badge-fill text-black text-xl lg:text-2xl dark:text-white cursor-pointer"
                  ></i>
                </div>
                <div>
                  <p class="mt-2 lg:mt-4 text-sm lg:text-base">
                    {{ module.content }}
                  </p>
                </div>
                <div
                  v-if="module.tags"
                  class="absolute bottom-3 left-[50%] transform -translate-x-1/2 flex gap-1 mt-2"
                >
                  <span
                    v-for="tag in module.tags.split(',')"
                    :key="tag"
                    class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-md text-xs"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getInfosUserByUsername } from "../api/module";
import { follow } from "../api/user";
import { useAuthStore } from "../stores/authStore";
import { displayNetworkById } from "../api/user.js";

const route = useRoute();
const authStore = useAuthStore();

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const user = ref({});
const modules = ref([]);
const moduleFav = ref([]);
const isFollowing = ref(false);
const suivisCount = ref([]);
const followersCount = ref([]);

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

const displayCounterNetwork = async () => {
  try {
    const response = await displayNetworkById(username);
    suivisCount.value = response.data.network.followingCount;
    followersCount.value = response.data.network.followerCount;
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
  displayCounterNetwork();
});
</script>

<style scoped>
.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
