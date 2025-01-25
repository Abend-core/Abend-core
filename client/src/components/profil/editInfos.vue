<template>
  <div
    class="bg-white rounded-md p-[12px] mt-3 mb-3 dark:bg-gray-800 dark:text-white"
  >
    <h1 class="font-bold">Gérer mes informations</h1>
    <p class="text-[#F82B30] mt-1">Profil Dashboard</p>
  </div>
  <button
    class="absolute right-6 top-[250px] bg-[#F82B30] p-[6px] rounded-md text-white border border-black"
    @click="updateUserProfile"
  >
    Modifier mes informations
  </button>
  <div
    v-if="successMessage"
    class="text-white rounded-[6px] p-4 mt-3 bg-gradient-to-r from-[#4b9945] to-[#4b9945] border border-black"
  >
    <div>
      <div class="text-[14px] text-[#1f2328]">
        {{ successMessage }}
      </div>
    </div>
  </div>
  <div
    v-if="errorMessage"
    class="text-white rounded-[6px] p-4 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
  >
    <div>
      <div class="text-[14px] text-white">
        {{ errorMessage }}
      </div>
    </div>
  </div>
  <div>
    <div
      class="flex flex-col gap-[22px] p-[12px] bg-white rounded-md dark:bg-gray-800 dark:text-white"
    >
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px]">Email</p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="text"
          placeholder="Email"
          v-model="emailProfil"
        />
      </div>
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px]">Identifiant</p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="text"
          placeholder="Identifiant"
          v-model="identifiantProfil"
        />
      </div>
    </div>
    <div
      class="bg-white rounded-md mt-3 p-[12px] dark:bg-gray-800 dark:text-white"
    >
      <p class="font-bold">Gérer mon mot de passe</p>
      <p class="text-[#F82B30] mt-1">Modification Dashboard</p>
    </div>
    <button
      class="absolute right-6 top-[475px] bg-[#F82B30] p-[6px] rounded-md text-white border border-black"
      @click="updatePassword"
    >
      Modifier mon mot de passe
    </button>
    <div
      class="flex flex-col gap-[22px] bg-white rounded-md mt-3 p-[12px] dark:bg-gray-800 dark:text-white"
    >
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px] whitespace-nowrap">
          Ancien mot de passe
        </p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="password"
          placeholder="Ancien mot de passe"
          v-model="oldPassword"
        />
      </div>
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px] whitespace-nowrap">
          Nouveau mot de passe
        </p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="password"
          placeholder="Nouveau mot de passe"
          v-model="newPassword"
        />
      </div>
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px] whitespace-nowrap">
          Répéter le mot de passe
        </p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="password"
          placeholder="Répéter le mot de passe"
          v-model="confirmNewPassword"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getUserById, editUserById, editPasswordById } from "../../api/user";

const emit = defineEmits(["profileUpdated"]);

const id = sessionStorage.getItem("id");

const user = ref({});
const emailProfil = ref("");
const identifiantProfil = ref("");

const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

let successMessage = ref("");
let errorMessage = ref("");

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

const updateUserProfile = async () => {
  const updatedData = {
    mail: emailProfil.value,
    username: identifiantProfil.value,
  };

  try {
    await editUserById(id, updatedData);
    successMessage.value = "Profil mis à jour avec succès !";
    setTimeout(() => (successMessage.value = ""), 3000);
    emit("profileUpdated");
  } catch (error) {
    console.error(error);
  }
};

const updatePassword = async () => {
  const passwordData = {
    id: id,
    password: oldPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmNewPassword.value,
  };

  try {
    const response = await editPasswordById(passwordData);
    successMessage.value = "Mot de passe modifié avec succès !";
    setTimeout(() => (successMessage.value = ""), 3000);
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
  } catch (error) {
    errorMessage.value = error.response.data.message;
    setTimeout(() => (errorMessage.value = ""), 3000);
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
  }
};

getInfosProfil();
</script>

<style scoped>
input {
  border: 1px solid #d1d9e0;
}

input {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 6px;
}
</style>
