<template>
  <div
    class="bg-white rounded-md p-[12px] mt-3 mb-3 dark:bg-gray-800 dark:text-white"
  >
    <h1 class="font-bold">Mes informations personnelles</h1>
    <p class="text-[#4954ecde] mt-1">Profil Dashboard</p>
  </div>
  <div
    class="bg-white p-[12px] flex flex-col items-center dark:bg-gray-800 dark:text-white"
  >
    <div>
      <img
        class="w-[64px] h-[64px] mx-auto"
        src="../../assets/images/profil-icon/icon-profil-2.png"
        alt=""
      />
      <div class="flex gap-2">
        <p class="text-2xl">{{ user.firstname }}</p>
        <p class="text-2xl">{{ user.name }}</p>
      </div>
      <p class="text-gray-400 mb-4">{{ user.login }}</p>
    </div>
    <div class="flex items-center gap-3 w-[300px]">
      <img
        class="w-[45px] h-[45px]"
        src="../../assets/images/profil-icon/icon-profil-3.png"
        alt=""
      />
      <p>
        {{ user.mail }}
      </p>
    </div>
    <div class="flex items-center gap-3 w-[300px]">
      <img
        class="w-[45px] h-[45px]"
        src="../../assets/images/profil-icon/icon-profil-4.png"
        alt=""
      />
      <p>{{ formatDate(user.birth) }}</p>
    </div>
    <div class="flex items-center gap-3 w-[300px]">
      <img
        class="w-[45px] h-[45px]"
        src="../../assets/images/profil-icon/icon-profil-1.png"
        alt=""
      />
      <p>{{ formatDateTime(user.createdAt) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getUserById } from "../../api/user";
import { formatDate, formatDateTime } from "../../utils/date";

defineEmits(["login", "logout"]);

const id = sessionStorage.getItem("id");
const user = ref({});

const prenomProfil = ref("");
const nomProfil = ref("");
const emailProfil = ref("");
const birthProfil = ref("");
const identifiantProfil = ref("");

const getInfosProfil = async () => {
  try {
    const response = await getUserById(id);
    user.value = response.data.user;

    prenomProfil.value = user.value.firstname;
    nomProfil.value = user.value.name;
    emailProfil.value = user.value.mail;
    birthProfil.value = user.value.birth;
    identifiantProfil.value = user.value.login;
  } catch (error) {
    console.error(error);
  }
};

getInfosProfil();
</script>
