<template>
  <div
    class="bg-white rounded-md p-[12px] mt-3 mb-3 dark:bg-gray-800 dark:text-white text-center xl:text-left"
  >
    <h1 class="font-bold">Mes informations personnelles</h1>
    <p class="text-primaryRed mt-1">Profil Dashboard</p>
  </div>
  <div
    class="bg-white p-[12px] flex flex-col items-center dark:bg-gray-800 dark:text-white"
  >
    <i class="ri-account-pin-circle-fill text-[64px]"></i>
    <p class="mb-4 mt-[-12px] text-2xl">{{ user.username }}</p>
    <div class="flex items-center gap-3 w-[210px]">
      <i class="ri-mail-fill text-[30px]"></i>
      <p>
        {{ user.mail }}
      </p>
    </div>
    <div class="flex items-center gap-3 w-[210px]">
      <i class="ri-time-fill text-[30px]"></i>
      <p>{{ formatDateTime(user.createdAt) }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getUserById } from "../../api/user";
import { formatDateTime } from "../../utils/date";

const id = sessionStorage.getItem("id");

const user = ref({});
const emailProfil = ref("");
const identifiantProfil = ref("");

const getInfosProfil = async () => {
  try {
    const response = await getUserById(id);
    user.value = response.data.user;

    emailProfil.value = user.value.mail;
    identifiantProfil.value = user.value.username;
  } catch (error) {
    console.error(error);
  }
};

getInfosProfil();
</script>
