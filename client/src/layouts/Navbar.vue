<template>
  <div
    class="w-full dark:bg-gray-800 backdrop-blur border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
    @keydown.esc="closeModal('searchBar')"
    tabindex="0"
  >
    <nav
      class="max-w-[1400px] mx-auto flex items-center justify-between relative p-paddingMd dark:bg-gray-800 dark:text-white"
    >
      <div class="left-content flex items-center gap-[10px]">
        <RouterLink
          to="/"
          class="relative inline-block w-[50px] h-[50px] group"
        >
          <img
            v-if="!isDark"
            class="absolute top-0 left-0 w-[50px] h-[50px] infinite-rotate"
            src="../assets/images/logo-abend-clair-hearthless.png"
            alt="Anneaux clairs"
          />
          <img
            v-else
            class="absolute top-0 left-0 w-[50px] h-[50px] infinite-rotate"
            src="../assets/images/logo-abend-dark-hearthless.png"
            alt="Anneaux sombres"
          />
          <img
            class="absolute top-0 left-0 w-[50px] h-[50px]"
            src="../assets/images/logo-abend-haloless.png"
            alt="Cœur"
          />
        </RouterLink>
        <RouterLink to="/" class="hidden font-medium sm:block"
          >Abnd.io</RouterLink
        >
      </div>
      <div
        v-if="isAuthenticated"
        class="hidden sm:flex md:items-center"
        @click="toggleModal('searchBar')"
      >
        <div
          class="relative group cursor-pointer rounded-md dark:border dark:border-black dark:hover:outline dark:hover:outline-1 dark:hover:outline-white hover:outline-1 hover:outline-primaryRed hover:outline"
        >
          <i
            class="ri-search-2-line text-xl text-gray-500 absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
          ></i>
          <input
            type="text"
            placeholder="Rechercher"
            class="w-[300px] h-[35px] pl-9 pr-10 rounded-md border border-gray-200 dark:border-0 dark:text-white bg-white dark:bg-gray-900 placeholder:font-medium pointer-events-none"
          />
          <div
            class="absolute top-1/2 transform -translate-y-1/2 right-2 border border-gray-300 dark:border-gray-700 rounded-md p-1"
          >
            <kbd
              class="block text-customdarkGray tracking-tighter text-xs font-bold"
              >{{ osShortcut }}</kbd
            >
          </div>
        </div>
      </div>
      <modalSearchBar
        v-if="modals.searchBar"
        @close="closeModal('searchBar')"
      />
      <div class="flex items-center gap-2 sm:gap-3">
        <i
          class="sm:hidden ri-search-2-line text-xl cursor-pointer"
          @click="toggleModal('searchBar')"
        ></i>
        <RouterLink
          to="/module"
          v-if="isAuthenticated"
          class="hidden sm:block hover:text-primaryRed font-medium"
        >
          <i class="ri-layout-2-fill text-xl"></i>
        </RouterLink>
        <RouterLink
          to="/favorites"
          v-if="isAuthenticated"
          class="hidden sm:block hover:text-primaryRed font-medium"
        >
          <i class="heart-animation ri-heart-fill text-xl text-primaryRed"></i>
        </RouterLink>
        <i
          v-if="!isDark"
          class="ri-moon-fill text-xl cursor-pointer hover:text-primaryRed"
          @click="darkModeActivation"
        ></i>
        <i
          v-if="isDark"
          class="ri-sun-fill text-xl cursor-pointer hover:text-primaryRed"
          @click="darkModeActivation"
        ></i>
        <div
          v-if="isAuthenticated"
          class="flex gap-2 items-center cursor-pointer"
          @click="toggleModal('menu')"
          @click.stop
        >
          <img
            v-if="user && user.image"
            class="hidden sm:block w-[45px] h-[45px] rounded-full shadow-md"
            :src="`${apiUrl}/uploadsFile/profil/${user.image}`"
            alt="Image de profil"
          />
        </div>
        <RouterLink
          class="hover:text-primaryRed hidden sm:block font-medium"
          to="/login"
          v-if="!isAuthenticated"
          >Connexion</RouterLink
        >
        <i
          class="ri-menu-line text-3xl sm:hidden cursor-pointer"
          @click="toggleMobileMenu"
        ></i>
      </div>
      <div
        v-if="modals.menu"
        ref="menuRef"
        class="absolute right-[1%] top-[85%] p-2 bg-white z-40 mt-1 rounded-md border border-black dark:border-white dark:bg-[#1F2937]"
      >
        <div class="relative">
          <div
            class="flex items-center"
            :class="{ 'mb-2': isAuthenticated && !isAdmin }"
          >
            <RouterLink
              to="/profile"
              class="flex items-center gap-1 text-primaryBlue text-sm dark:text-white hover:text-primaryRed dark:hover:text-primaryRed"
              @click="toggleModal"
            >
              <i class="ri-user-line text-gray-400 text-xl"></i>
              Profil
            </RouterLink>
          </div>
          <div class="flex items-center">
            <RouterLink
              class="flex items-center gap-1 mb-2 text-primaryBlue text-sm dark:text-white hover:text-primaryRed dark:hover:text-primaryRed"
              v-if="isAuthenticated && isAdmin"
              to="/dashboard"
              @click="toggleModal"
              ><i class="ri-dashboard-fill text-gray-400 text-xl"></i
              >Dashboard</RouterLink
            >
          </div>
          <button
            class="flex items-center gap-1 border-t group"
            @click="
              () => {
                closeModal('menu');
                logOut();
              }
            "
          >
            <i class="ri-logout-box-line text-gray-400 text-xl mt-2"></i>
            <span
              class="text-primaryBlue text-sm dark:text-white group-hover:text-primaryRed mt-2"
            >
              Déconnexion
            </span>
          </button>
        </div>
      </div>
    </nav>
  </div>
  <MobileMenu :isOpen="isMobileMenuOpen" :closeMenu="closeMobileMenu" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { useUser } from "../composables/useUser";
import { isDark, toggleDarkMode } from "../utils/darkMode.js";
import modalSearchBar from "../components/modal/modalSearchBar.vue";
import "remixicon/fonts/remixicon.css";
import { useModal } from "../composables/useModal.js";
import MobileMenu from "../components/MenuMobile.vue";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const router = useRouter();
const authStore = useAuthStore();
const { getInfosProfile } = useUser();
const { modals, toggleModal, closeModal } = useModal();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);
const user = computed(() => authStore.user);

const isMobileMenuOpen = ref(false);
const osShortcut = ref("Ctrl K");
const menuRef = ref(null);

const closeClickOutside = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    closeModal("menu");
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false;
};

const loadUserProfile = async () => {
  if (!authStore.isAuthenticated || !authStore.user?.id) return;
  try {
    await getInfosProfile(authStore.user.id);
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

onMounted(() => {
  const userAgent = navigator.userAgent;
  document.addEventListener("click", closeClickOutside);

  if (userAgent.includes("Macintosh")) {
    osShortcut.value = "Cmd K";
  } else if (userAgent.includes("Windows NT")) {
    osShortcut.value = "Ctrl K";
  }

  authStore.initializeAuth();
  if (authStore.isAuthenticated) {
    loadUserProfile();
  }
});
</script>

<style scoped>
.heart-animation {
  display: inline-block;
  animation: breath 2s infinite ease-in-out;
}

@keyframes breath {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
}

.group:hover .infinite-rotate {
  animation: rotate 2s infinite linear;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
