<template>
  <div class="container mx-auto px-4">
    <div class="mb-6">
      <NotificationMessage />
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white dark:bg-gray-800 rounded-lg">
        <div class="mb-4">
          <p
            class="text-2xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white"
          >
            Gérer mes informations
          </p>
          <p class="text-primaryRed text-sm mt-1">Profil Dashboard</p>
        </div>
        <form @submit.prevent="updateUserProfile" class="space-y-6">
          <div class="space-y-2">
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              v-model="emailProfil"
              @input="etatButton"
              placeholder="Email"
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition"
            />
          </div>
          <div class="space-y-2">
            <label
              for="identifiant"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Identifiant
            </label>
            <input
              id="identifiant"
              type="text"
              v-model="identifiantProfil"
              @input="etatButton"
              placeholder="Identifiant"
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition"
            />
          </div>
          <div class="space-y-2">
            <label
              for="description"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Description
            </label>
            <textarea
              id="description"
              v-model="descriptionProfil"
              @input="etatButton"
              placeholder="Description"
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition resize-y min-h-[100px]"
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="buttonDisabled"
            class="bg-primaryRed text-white px-3 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
          >
            Modifier mes informations
          </button>
        </form>
      </div>
      <div class="bg-white dark:bg-gray-800 rounded-lg">
        <div class="mb-4">
          <h1
            class="text-2xl font-bold uppercase tracking-tighter text-gray-900 dark:text-white"
          >
            Gérer mon mot de passe
          </h1>
          <p class="text-primaryRed text-sm mt-1">Modification Dashboard</p>
        </div>
        <form @submit.prevent="updatePassword" class="space-y-6">
          <div class="space-y-2">
            <label
              for="oldPassword"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Ancien mot de passe
            </label>
            <input
              id="oldPassword"
              type="password"
              v-model="oldPassword"
              @input="etatPasswordButton"
              placeholder="Ancien mot de passe"
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition"
            />
          </div>
          <div class="space-y-2">
            <label
              for="newPassword"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nouveau mot de passe
            </label>
            <input
              id="newPassword"
              type="password"
              v-model="newPassword"
              @input="etatPasswordButton"
              placeholder="Nouveau mot de passe"
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition"
            />
          </div>
          <div class="space-y-2">
            <label
              for="confirmNewPassword"
              class="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Répéter le mot de passe
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              v-model="confirmNewPassword"
              @input="etatPasswordButton"
              placeholder="Répéter le mot de passe"
              class="w-full px-4 py-2 border rounded-md dark:bg-gray-900 dark:text-white dark:border-gray-700 focus:ring-2 focus:ring-primaryRed focus:border-transparent transition"
            />
          </div>
          <button
            type="submit"
            :disabled="passwordButtonDisabled"
            class="bg-primaryRed text-white px-3 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
          >
            Modifier mon mot de passe
          </button>
        </form>
        <div class="mt-6 flex justify-end">
          <button
            @click="toggleModalConfirmDeleteUser"
            class="px-6 py-2 text-primaryRed border border-primaryRed rounded-md hover:bg-primaryRed hover:text-white transition-colors duration-300"
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
import { editUserById, editPasswordById, deleteUser } from "../../api/user";
import modalConfirmDelete from "../modal/modalConfirmDelete.vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/authStore";
import NotificationMessage from "../../components/notification/NotificationMessage.vue";
import { useNotificationStore } from "../../stores/notificationStore.js";
import { useUser } from "../../composables/useUser.js";

const authStore = useAuthStore();
const { setNotification } = useNotificationStore();
const { getInfosProfile } = useUser();

const router = useRouter();

const id = sessionStorage.getItem("id");

const user = ref({});
const emailProfil = ref("");
const identifiantProfil = ref("");
const descriptionProfil = ref("");
const oldPassword = ref("");
const newPassword = ref("");
const confirmNewPassword = ref("");
const isModalConfirmDeleteVisible = ref(false);

const buttonDisabled = ref(true);
const passwordButtonDisabled = ref(true);

const initialEmail = emailProfil.value;
const initialIdentifiant = identifiantProfil.value;

const toggleModalConfirmDeleteUser = () => {
  isModalConfirmDeleteVisible.value = !isModalConfirmDeleteVisible.value;
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

const loadUserProfile = async () => {
  await getInfosProfile(id);

  user.value = authStore.user;
  emailProfil.value = user.value.mail;
  identifiantProfil.value = user.value.username;
  descriptionProfil.value = user.value.content;
};

const updateUserProfile = async () => {
  try {
    let updatedData = {};

    if (emailProfil.value !== user.value.mail) {
      updatedData.mail = emailProfil.value;
      await editUserById(id, { mail: updatedData.mail });
      authStore.setUser({ ...authStore.user, mail: updatedData.mail });
    }
    if (identifiantProfil.value !== user.value.username) {
      updatedData.username = identifiantProfil.value;
      await editUserById(id, { username: updatedData.username });
      authStore.setUser({ ...authStore.user, username: updatedData.username });
    }
    if (descriptionProfil.value !== user.value.content) {
      updatedData.content = descriptionProfil.value;
      await editUserById(id, { content: updatedData.content });
      authStore.setUser({ ...authStore.user, content: updatedData.content });
    }

    setNotification("Profil mis à jour avec succès !", "success");
    loadUserProfile();
    buttonDisabled.value = true;
  } catch (error) {
    setNotification(error.response.data.Erreur, "error");
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
    await editPasswordById(passwordData);
    setNotification("Mot de passe modifié avec succès !", "success");
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
  } catch (error) {
    setNotification(error.response.data.Erreur, "error");
    oldPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
    passwordButtonDisabled.value = true;
  }
};

const deleteAccount = async () => {
  try {
    await deleteUser(id);
    toggleModalConfirmDeleteUser();
    authStore.setUser(null);
    authStore.logout();
    router.push("/");
  } catch (error) {
    setNotification(error.response.data.Erreur, "error");
  }
};

onMounted(() => {
  loadUserProfile();
});
</script>

<style scoped>
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}

.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #d9dce1;
  border-radius: 10px;
}

.scrollbar-custom::-webkit-scrollbar-track {
  background-color: #2d3748;
  border-radius: 10px;
}

.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: #d9dce1;
}
</style>
