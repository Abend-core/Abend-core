<template>
  <nav
    class="flex items-center p-[20px] dark:bg-gray-800 dark:text-white border-b border-gray-200"
  >
    <div class="left-content flex items-center gap-[10px]">
      <RouterLink to="/">
        <img
          class="w-[50px] h-[50px]"
          src="../assets/images/abend-core-logo.png"
          alt="Main Icon"
        />
      </RouterLink>
      <RouterLink to="/">Abend-core</RouterLink>
    </div>
    <div class="right-content flex items-center flex-1 justify-end gap-[20px]">
      <i
        v-if="!isDark"
        class="ri-sun-fill text-[20px] cursor-pointer"
        @click="toggleDarkMode"
      ></i>
      <i
        v-if="isDark"
        class="ri-moon-fill text-[20px] cursor-pointer"
        @click="toggleDarkMode"
      ></i>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/connexion" v-if="!isAuthenticated">Connexion</RouterLink>
      <RouterLink v-if="isAuthenticated && isAdmin" to="/dashboard">
        Dashboard
      </RouterLink>
      <RouterLink to="/profil" v-if="isAuthenticated">Profil</RouterLink>
      <button v-if="isAuthenticated" @click="logOut">Déconnexion</button>
    </div>
  </nav>
</template>

<script>
import { clearSessionData } from "../utils/session";
import { useDark, useToggle } from "@vueuse/core";
import "remixicon/fonts/remixicon.css";

export default {
  emits: ["login", "logout"],
  // ces props permettent de recevoir la valeur de l'authentification de son parent Layout.vue
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const isDark = useDark();
    const toggleDarkMode = useToggle(isDark);

    const darkModeActivation = () => {
      toggleDarkMode();
    };

    return {
      isDark,
      toggleDarkMode: darkModeActivation,
    };
  },
  methods: {
    logOut() {
      clearSessionData();
      this.$emit("logout");
      this.$router.push("/");
    },
  },
};
</script>
