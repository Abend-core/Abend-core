<template>
  <NotificationMessage />
  <div
    class="flex flex-col xl:flex-row lg:justify-center lg:flex-col lg:items-center xl:items-start"
  >
    <div class="w-full lg:w-[50%]">
      <div
        class="bg-white rounded-md p-paddingMd mt-3 mb-3 dark:bg-gray-800 dark:text-white"
      >
        <h1 class="font-bold">Gérer mes informations</h1>
        <p class="text-primaryRed mt-1">Profil Dashboard</p>
      </div>

      <div
        class="flex flex-col gap-[22px] p-paddingMd bg-white rounded-md dark:bg-gray-800 dark:text-white"
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
          class="bg-primaryRed p-paddingSm rounded-md text-white border border-black w-fit"
          @click="updateUserProfile"
          :disabled="buttonDisabled"
        >
          Modifier mes informations
        </button>
      </div>
    </div>
    <div class="w-full lg:w-[50%]">
      <div
        class="bg-white rounded-md mt-3 p-paddingMd dark:bg-gray-800 dark:text-white"
      >
        <p class="font-bold">Gérer mon mot de passe</p>
        <p class="text-primaryRed mt-1">Modification Dashboard</p>
      </div>
      <div
        class="flex flex-col gap-[22px] bg-white rounded-md mt-3 p-paddingMd dark:bg-gray-800 dark:text-white"
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
          class="bg-primaryRed p-paddingSm rounded-md text-white border border-black w-fit"
          @click="updatePassword"
          :disabled="passwordButtonDisabled"
        >
          Modifier mon mot de passe
        </button>
        <div class="flex justify-end">
          <button
            class="p-paddingSm rounded-md text-primaryRed border border-primaryRed w-fit"
            @click="toggleModalConfirmDeleteUser"
          >
            Supprimer mon compte
          </button>
          <modal-confirm-delete
            v-if="isModalConfirmDeleteVisible"
            @close-modal="toggleModalConfirmDeleteUser"
            @confirm-delete="deleteAccount"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  getUserById,
  editUserById,
  editPasswordById,
  deleteUser,
} from "../../api/user";
import modalConfirmDelete from "../modal/modalConfirmDelete.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import NotificationMessage from "../../components/notification/NotificationMessage.vue";
import { useNotificationStore } from "../../stores/notificationStore.js";
import { useUser } from "../../composables/useUser.js";

const authStore = useAuthStore();
const { setNotification } = useNotificationStore();
const { getInfosProfil } = useUser();

const router = useRouter();

const id = sessionStorage.getItem("id");

const user = ref({});
const emailProfil = ref("");
const identifiantProfil = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const isModalConfirmDeleteVisible = ref(false);

const buttonDisabled = ref(true);
const passwordButtonDisabled = ref(true);

const initialEmail = emailProfil.value;
const initialIdentifiant = identifiantProfil.value;

const loadUserProfile = async () => {
  await getInfosProfil(id);

  user.value = authStore.user;
  emailProfil.value = user.value.mail;
  identifiantProfil.value = user.value.username;
};

const updateUserProfile = async () => {
  const updatedData = {
    mail: emailProfil.value,
    username: identifiantProfil.value,
  };

  try {
    const responseUpdated = await editUserById(id, updatedData);
    authStore.setUser(responseUpdated.data.user);
    setNotification("Profil mis à jour avec succès !", "success");
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
    setNotification("Mot de passe modifié avec succès !", "success");
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
  } catch (error) {
    setNotification(error.response?.data?.message, "error");
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
    passwordButtonDisabled.value = true;
  }
};

const toggleModalConfirmDeleteUser = () => {
  isModalConfirmDeleteVisible.value = !isModalConfirmDeleteVisible.value;
};

const deleteAccount = async () => {
  try {
    await deleteUser(id);
    closeModalConfirmDeleteUser();
    authStore.setUser(null);
    authStore.logout();
    router.push("/");
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  loadUserProfile();
});
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
