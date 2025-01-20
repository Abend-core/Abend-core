<template>
  <div
    class="bg-white rounded-md p-[12px] mt-3 mb-3 dark:bg-gray-800 dark:text-white"
  >
    <h1 class="font-bold">Gérer mes informations</h1>
    <p class="text-[#4954ecde] mt-1">Profil Dashboard</p>
  </div>
  <button
    class="absolute right-6 top-[250px] bg-[#4954ecde] p-[6px] rounded-md text-white border border-black"
    @click="updateUserProfile"
  >
    Modifier mon profil
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
  <div>
    <div
      class="flex flex-col gap-[22px] p-[12px] bg-white rounded-md dark:bg-gray-800 dark:text-white"
    >
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px]">Prénom</p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="text"
          placeholder="Prénom"
          v-model="prenomProfil"
        />
      </div>
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px]">Nom</p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="text"
          placeholder="Nom"
          v-model="nomProfil"
        />
      </div>
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
        <p class="w-[150px] mr-[200px]">Date de naissance</p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="date"
          placeholder="Date de naissance"
          v-model="birthProfil"
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
      <p class="text-[#4954ecde] mt-1">Modification Dashboard</p>
    </div>
    <div
      class="flex flex-col gap-[22px] bg-white rounded-md mt-3 p-[12px] dark:bg-gray-800 dark:text-white"
    >
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px] whitespace-nowrap">
          Ancien mot de passe
        </p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="text"
          placeholder="Ancien mot de passe"
        />
      </div>
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px] whitespace-nowrap">
          Nouveau mot de passe
        </p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="text"
          placeholder="Nouveau mot de passe"
        />
      </div>
      <div class="flex items-center">
        <p class="w-[150px] mr-[200px] whitespace-nowrap">
          Répéter le mot de passe
        </p>
        <input
          class="w-[450px] dark:text-white dark:bg-gray-900"
          type="text"
          placeholder="Répéter le mot de passe"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getUserById, editUserById } from "../../api/user";

defineEmits(["login", "logout"]);

const id = sessionStorage.getItem("id");
const user = ref({});
const prenomProfil = ref("");
const nomProfil = ref("");
const emailProfil = ref("");
const birthProfil = ref("");
const identifiantProfil = ref("");

let successMessage = ref("");

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

const updateUserProfile = async () => {
  const updatedData = {
    firstname: prenomProfil.value,
    name: nomProfil.value,
    mail: emailProfil.value,
    birth: birthProfil.value,
    login: identifiantProfil.value,
  };

  try {
    await editUserById(id, updatedData);
    getInfosProfil();
    successMessage.value = "Profil mis à jour avec succès !";
  } catch (error) {
    console.error(error);
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
