<template>
  <transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div class="w-full h-full bg-white dark:bg-gray-900 p-5 shadow-lg">
        <button class="text-xl absolute right-4 top-5" @click="closeMenu">
          <i class="ri-close-line text-xl text-black dark:text-white"></i>
        </button>
        <nav class="flex flex-col items-center mt-10 space-y-4">
          <RouterLink
            to="/"
            class="text-lg font-medium text-black dark:text-white"
            @click="closeMenu"
          >
            <LogoSwitch width="65px" height="65px" />
          </RouterLink>
          <RouterLink
            to="/profile"
            v-if="isAuthenticated"
            class="text-lg font-medium text-black dark:text-white"
            @click="closeMenu"
          >
            <i class="ri-user-fill"></i>
            Profil
          </RouterLink>
          <RouterLink
            to="/module"
            v-if="isAuthenticated"
            class="text-lg font-medium text-black dark:text-white"
            @click="closeMenu"
          >
            <i class="ri-layout-2-fill"></i>
            Gérer mes modules
          </RouterLink>
          <RouterLink
            to="/favorites"
            v-if="isAuthenticated"
            class="text-lg font-medium text-black dark:text-white"
            @click="closeMenu"
            ><i class="ri-heart-fill text-primaryRed"></i>
            Favoris
          </RouterLink>
          <RouterLink
            to="/dashboard"
            v-if="isAuthenticated && isAdmin"
            class="text-lg font-medium text-black dark:text-white"
            @click="closeMenu"
          >
            <i class="ri-dashboard-fill"></i>
            Dashboard
          </RouterLink>
          <button
            v-if="isAuthenticated"
            class="text-lg font-medium text-black dark:text-white"
            @click="logout"
          >
            <i class="ri-door-open-fill"></i>
            Déconnexion
          </button>
          <RouterLink
            to="/login"
            v-if="!isAuthenticated"
            class="text-lg font-medium text-black dark:text-white"
            @click="closeMenu"
          >
            <i class="ri-door-fill"></i> Connexion
          </RouterLink>
          <RouterLink
            to="/registration"
            v-if="!isAuthenticated"
            class="text-lg font-medium text-black dark:text-white"
            @click="closeMenu"
          >
            <i class="ri-draft-fill"></i> Inscription
          </RouterLink>
        </nav>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useRouter } from "vue-router";
import LogoSwitch from "../components/LogoSwitch.vue";

const props = defineProps({
  isOpen: Boolean,
  closeMenu: Function,
});

const authStore = useAuthStore();
const router = useRouter();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const isAdmin = computed(() => authStore.isAdmin);

const logout = () => {
  authStore.logout();
  router.push("/");
  props.closeMenu();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
