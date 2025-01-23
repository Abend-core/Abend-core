<template>
  <nav
    class="flex items-center p-[12px] dark:bg-gray-800 dark:text-white border-b border-gray-200"
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
        @click="darkModeActivation"
      ></i>
      <i
        v-if="isDark"
        class="ri-moon-fill text-[20px] cursor-pointer"
        @click="darkModeActivation"
      ></i>
      <RouterLink class="hover:text-[#F82B30] font-bold" to="/"
        >Accueil</RouterLink
      >
      <RouterLink
        class="hover:text-[#F82B30] font-bold"
        to="/connexion"
        v-if="!isAuthenticated"
        >Connexion</RouterLink
      >
      <RouterLink
        class="hover:text-[#F82B30]"
        v-if="isAuthenticated && isAdmin"
        to="/dashboard"
        >Dashboard</RouterLink
      >
      <RouterLink to="/profil" v-if="isAuthenticated">
        <div class="flex gap-2 items-center">
          <img
            class="w-[45px] h-[45px] rounded-full"
            :src="`http://localhost:5000/uploadsFile/profil/${user.image}`"
            alt=""
          />
          <div class="flex flex-col">
            <span class="text-[10px]">PROFIL</span>
            <span class="text-m">{{ user.username }}</span>
          </div>
        </div>
      </RouterLink>
      <button v-if="isAuthenticated" @click="logOut">
        <i class="ri-logout-box-line text-[25px]"></i>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { clearSessionData } from "../utils/session";
import { useDark, useToggle } from "@vueuse/core";
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import { getUserById } from "../api/user";
import "remixicon/fonts/remixicon.css";

const user = ref({});
const id = sessionStorage.getItem("id");

const getInfosProfil = async () => {
  try {
    const response = await getUserById(id);
    user.value = response.data.user;
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
getInfosProfil();

const props = defineProps({
  isAuthenticated: Boolean,
  isAdmin: Boolean,
});

const router = useRouter();
const emit = defineEmits(["login", "logout"]);

const isDark = useDark();
const toggleDarkMode = useToggle(isDark);

const darkModeActivation = () => {
  toggleDarkMode();
};

const logOut = () => {
  clearSessionData();
  emit("logout");
  router.push("/");
};
</script>
