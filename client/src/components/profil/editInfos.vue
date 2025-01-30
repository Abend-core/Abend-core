<template>
  <SuccessMessage />
  <ErrorMessage />
  <div
    class="flex flex-col xl:flex-row lg:justify-center lg:flex-col lg:items-center xl:items-start"
  >
    <div class="w-full lg:w-[50%]">
      <div
        class="bg-white rounded-md p-[12px] mt-3 mb-3 dark:bg-gray-800 dark:text-white"
      >
        <h1 class="font-bold">Gérer mes informations</h1>
        <p class="text-[#F82B30] mt-1">Profil Dashboard</p>
      </div>

      <div
        class="flex flex-col gap-[22px] p-[12px] bg-white rounded-md dark:bg-gray-800 dark:text-white"
      >
        <div class="flex flex-col lg:flex-row lg:items-center w-full gap-2">
          <p class="lg:w-[150px] lg:mr-[200px] w-full">Email</p>
          <input
            class="w-full lg:w-[450px] dark:text-white dark:bg-gray-900"
            type="text"
            placeholder="Email"
            v-model="emailProfil"
            @input="etatButton"
          />
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center w-full gap-2">
          <p class="lg:w-[150px] lg:mr-[200px] w-full">Identifiant</p>
          <input
            class="w-full lg:w-[450px] dark:text-white dark:bg-gray-900"
            type="text"
            placeholder="Identifiant"
            v-model="identifiantProfil"
            @input="etatButton"
          />
        </div>
        <button
          class="bg-[#F82B30] p-[6px] rounded-md text-white border border-black w-fit"
          @click="updateUserProfile"
          :disabled="buttonDisabled"
        >
          Modifier mes informations
        </button>
      </div>
    </div>
    <div class="w-full lg:w-[50%]">
      <div
        class="bg-white rounded-md mt-3 p-[12px] dark:bg-gray-800 dark:text-white"
      >
        <p class="font-bold">Gérer mon mot de passe</p>
        <p class="text-[#F82B30] mt-1">Modification Dashboard</p>
      </div>
      <div
        class="flex flex-col gap-[22px] bg-white rounded-md mt-3 p-[12px] dark:bg-gray-800 dark:text-white"
      >
        <div class="flex flex-col lg:flex-row lg:items-center w-full gap-2">
          <p class="lg:w-[150px] lg:mr-[200px] w-full whitespace-nowrap">
            Ancien mot de passe
          </p>
          <input
            class="w-full lg:w-[450px] dark:text-white dark:bg-gray-900"
            type="password"
            placeholder="Ancien mot de passe"
            v-model="oldPassword"
            @input="etatPasswordButton"
          />
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center w-full gap-2">
          <p class="lg:w-[150px] lg:mr-[200px] w-full whitespace-nowrap">
            Nouveau mot de passe
          </p>
          <input
            class="w-full lg:w-[450px] dark:text-white dark:bg-gray-900"
            type="password"
            placeholder="Nouveau mot de passe"
            v-model="newPassword"
            @input="etatPasswordButton"
          />
        </div>

        <div
          class="relative flex flex-col lg:flex-row lg:items-center w-full gap-2"
        >
          <p class="lg:w-[150px] lg:mr-[200px] w-full whitespace-nowrap">
            Répéter le mot de passe
          </p>
          <input
            class="w-full lg:w-[450px] dark:text-white dark:bg-gray-900 mb-3"
            type="password"
            placeholder="Répéter le mot de passe"
            v-model="confirmNewPassword"
            @input="etatPasswordButton"
          />
        </div>
        <button
          class="bg-[#F82B30] p-[6px] rounded-md text-white border border-black w-fit"
          @click="updatePassword"
          :disabled="passwordButtonDisabled"
        >
          Modifier mon mot de passe
        </button>
        <div class="flex justify-end">
          <button
            class="p-[6px] rounded-md text-[#F82B30] border border-[#F82B30] w-fit"
            @click="openModalConfirmDeleteUser"
          >
            Supprimer mon compte
          </button>
          <modal-confirm-delete
            v-if="isModalConfirmDeleteVisible"
            @close-modal="closeModalConfirmDeleteUser"
            @confirm-delete="deleteAccount"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  getUserById,
  editUserById,
  editPasswordById,
  deleteUser,
} from "../../api/user";
import modalConfirmDelete from "../modal/modalConfirmDelete.vue";
import ErrorMessage from "../../components/notification/ErrorMessage.vue";
import SuccessMessage from "../../components/notification/SuccessMessage.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import { useErrorStore } from "../../stores/errorStore";
import { useSuccessStore } from "../../stores/successStore";

const authStore = useAuthStore();
const { setSuccess } = useSuccessStore();
const { setError } = useErrorStore();

const router = useRouter();

const id = sessionStorage.getItem("id");

const user = ref({});
const emailProfil = ref("");
const identifiantProfil = ref("");

const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");

const buttonDisabled = ref(true);
const passwordButtonDisabled = ref(true);

const initialEmail = emailProfil.value;
const initialIdentifiant = identifiantProfil.value;

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
    const responseUpdated = await editUserById(id, updatedData);
    authStore.setUser(responseUpdated.data.user);
    setSuccess("Profil mis à jour avec succès !");
    buttonDisabled.value = true;
  } catch (error) {
    console.error(error);
  }
};

const etatButton = () => {
  buttonDisabled.value =
    emailProfil.value === initialEmail &&
    identifiantProfil.value === initialIdentifiant;
};

const etatPasswordButton = () => {
  passwordButtonDisabled.value =
    !oldPassword.value || !newPassword.value || !confirmNewPassword.value;
};

const updatePassword = async () => {
  const passwordData = {
    id: id,
    password: oldPassword.value,
    newPassword: newPassword.value,
    confirmPassword: confirmNewPassword.value,
  };

  try {
    await editPasswordById(passwordData);
    setSuccess("Mot de passe modifié avec succès !");
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
  } catch (error) {
    setError(error.response?.data?.message || error.message);
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
    passwordButtonDisabled.value = true;
  }
};

const isModalConfirmDeleteVisible = ref(false);
const openModalConfirmDeleteUser = () => {
  isModalConfirmDeleteVisible.value = true;
};

const closeModalConfirmDeleteUser = () => {
  isModalConfirmDeleteVisible.value = false;
};

const deleteAccount = async () => {
  try {
    await deleteUser(id);
    closeModalConfirmDeleteUser();
    authStore.logout();
    router.push("/");
  } catch (error) {
    console.log(error);
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
