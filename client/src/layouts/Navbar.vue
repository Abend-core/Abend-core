<template>
  <nav
    class="flex items-center relative p-[12px] dark:bg-gray-800 dark:text-white border-b border-gray-200"
  >
    <div class="left-content flex items-center gap-[10px]">
      <RouterLink to="/">
        <img
          v-if="!isDark"
          class="w-[50px] h-[50px]"
          src="../assets/images/abend-core-logo.png"
          alt="Logo principal"
        />
        <img
          v-else
          class="w-[50px] h-[50px]"
          src="../assets/images/abend-core-logo-dark.png"
          alt="Logo principal"
        />
      </RouterLink>
      <RouterLink to="/" class="hidden sm:block">Abend-core</RouterLink>
    </div>
    <div
      class="right-content flex items-center flex-1 justify-end gap-[10px] sm:gap-[20px]"
    >
      <i
        v-if="!isDark"
        class="ri-sun-fill text-[20px] cursor-pointer"
        @click="darkModeActivation"
      ></i>
      <i
        v-if="isDark"
        class="ri-moon-fill text-[20px] cursor-pointer"
        @click="darkModeActivation"
      ></i>
      <RouterLink class="hover:text-[#F82B30] font-medium" to="/"
        >Accueil</RouterLink
      >
      <RouterLink
        class="hover:text-[#F82B30] font-medium"
        to="/connexion"
        v-if="!isAuthenticated"
        >Connexion</RouterLink
      >
      <!-- <RouterLink
        class="hover:text-[#F82B30] font-medium"
        to="/favoris"
        v-if="isAuthenticated"
        >Favoris</RouterLink
      > -->
      <RouterLink
        class="hover:text-[#F82B30] font-medium"
        v-if="isAuthenticated && isAdmin"
        to="/dashboard"
        >Dashboard</RouterLink
      >
      <div v-if="isAuthenticated" class="relative">
        <div
          class="flex gap-2 items-center cursor-pointer"
          @click="displayMenu"
        >
          <img
            class="w-[45px] h-[45px] rounded-full"
            :src="`http://localhost:5000/uploadsFile/profil/${user.image}`"
            alt="Photo de profil"
          />
          <div class="flex flex-col">
            <span class="text-[10px]">PROFIL</span>
            <span class="text-m">{{ user.username }}</span>
          </div>
        </div>
        <div
          v-if="isMenuProfilOpen"
          class="absolute right-0 w-[125px] h-[120px] p-2 bg-white z-10 mt-1 rounded-md border border-black dark:border-white dark:bg-[#1F2937]"
        >
          <div class="flex items-center gap-1">
            <RouterLink
              to="/profil"
              class="text-[#111827] text-[14px] dark:text-white hover:text-[#F82B30] dark:hover:text-[#F82B30]"
              @click="closeMenu"
            >
              <i class="ri-user-line text-gray-400 text-[20px]"></i>
              Profil
            </RouterLink>
          </div>
          <div class="flex items-center gap-1 mb-2">
            <RouterLink
              to="/module"
              class="text-[#111827] text-[14px] dark:text-white hover:text-[#F82B30] dark:hover:text-[#F82B30]"
              @click="closeMenu"
            >
              <i
                class="ri-layout-horizontal-line text-gray-400 text-[20px]"
              ></i>
              Module
            </RouterLink>
          </div>
          <!-- <div class="flex items-center gap-1 mb-3">
            <RouterLink
              to="/favoris"
              class="text-[#111827] text-[14px] dark:text-white hover:text-[#F82B30] dark:hover:text-[#F82B30]"
              @click="closeMenu"
            >
              <i class="ri-heart-add-2-fill text-gray-400 text-[20px]"></i>
              Favoris
            </RouterLink>
          </div> -->
          <div>
            <button
              class="absolute left-0 right-0 flex items-center gap-1 border-t px-2 group"
              @click="
                () => {
                  closeMenu();
                  logOut();
                }
              "
            >
              <i class="ri-logout-box-line text-gray-400 text-[20px] mt-2"></i>
              <span
                class="text-[#111827] text-[14px] dark:text-white group-hover:text-[#F82B30] mt-2"
              >
                Déconnexion
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { isDark, toggleDarkMode } from "../utils/darkMode.js";
import { getUserById } from "../api/user";
import "remixicon/fonts/remixicon.css";

const authStore = useAuthStore();
const router = useRouter();
const isMenuProfilOpen = ref(false);

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);
const user = computed(() => authStore.user);

const getInfosProfil = async () => {
  if (!authStore.isAuthenticated || !authStore.user?.id) return;
  try {
    const response = await getUserById(authStore.user.id);
    authStore.setUser(response.data.user);
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
  }
};

const darkModeActivation = () => {
  toggleDarkMode();
};

const logOut = () => {
  authStore.logout();
  router.push("/");
};

const displayMenu = () => {
  isMenuProfilOpen.value = !isMenuProfilOpen.value;
};
const closeMenu = () => {
  isMenuProfilOpen.value = false;
};

onMounted(() => {
  authStore.initializeAuth();
  if (authStore.isAuthenticated) {
    getInfosProfil();
  }
});
</script>
