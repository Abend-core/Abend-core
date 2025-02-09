<template>
  <div class="flex justify-center md:justify-end mb-4 mt-4">
    <button
      @click="displayModalUser"
      class="flex gap-1 bg-primaryRed p-paddingSm rounded-md text-white border border-black"
    >
      <span>+</span>
      <p>Ajoutez un utilisateur</p>
    </button>
  </div>
  <NotificationMessage />
  <div
    v-if="isModalVisibleUser"
    class="bg-white mb-6 p-6 mt-6 rounded-md relative max-w-full mx-auto dark:bg-gray-700 dark:text-white dark:border dark:border-black"
  >
    <p class="font-bold mb-3 text-left">Ajoutez un utilisateur</p>
    <div
      class="absolute top-0 right-3 cursor-pointer"
      @click="displayModalUser"
    >
      <p class="text-2xl">&times;</p>
    </div>
    <form @submit.prevent="addUserFonction">
      <div
        class="grid gap-4 sm:flex sm:flex-col lg:flex-row lg:flex-wrap lg:items-end"
      >
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-user-input-email" class="mb-1">Email</label>
          <input
            id="add-user-input-email"
            name="add_user_input_email"
            type="email"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataAddUser.mail.value"
            required
          />
        </div>
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-user-input-identifiant" class="mb-1"
            >Identifiant</label
          >
          <input
            id="add-user-input-identifiant"
            name="add_user_input_identifiant"
            type="text"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataAddUser.username.value"
            required
          />
        </div>
        <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
          <label for="add-user-select-role" class="mb-1">Rôle</label>
          <select
            id="add-user-select-role"
            name="add_user_select_role"
            class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
            v-model="dataAddUser.isAdmin.value"
            required
          >
            <option value="" disabled>Choisir le rôle</option>
            <option value="true">Administrateur</option>
            <option value="false">Utilisateur</option>
          </select>
        </div>
        <div class="flex justify-center lg:mt-0 sm:mt-4">
          <button
            class="bg-primaryRed px-6 py-2 rounded-md text-white border border-black"
            type="submit"
          >
            Créer
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { addUser } from "../../api/user";
import NotificationMessage from "../../components/notification/NotificationMessage.vue";
import { useNotificationStore } from "../../stores/notificationStore.js";

const { setNotification, clearNotification } = useNotificationStore();

const emit = defineEmits(["refresh-users"]);

const isModalVisibleUser = ref(false);

let dataAddUser = {
  mail: ref(""),
  username: ref(""),
  password: "password1",
  isAdmin: ref(""),
};

const displayModalUser = () => {
  isModalVisibleUser.value = !isModalVisibleUser.value;
};

const addUserFonction = async () => {
  try {
    await addUser({
      mail: dataAddUser.mail.value,
      username: dataAddUser.username.value,
      password: dataAddUser.password,
      isAdmin: dataAddUser.isAdmin.value === "true",
    });
    dataAddUser.mail.value = "";
    dataAddUser.username.value = "";
    clearNotification();
    emit("refresh-users");
    displayModalUser();
  } catch (error) {
    setNotification(error.response.data.Erreur, "error");
  }
};
</script>
