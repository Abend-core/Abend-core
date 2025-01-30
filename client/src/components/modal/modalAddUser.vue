<template>
  <div class="flex justify-end mb-3">
    <button
      @click="displayModalUser"
      class="flex gap-1 bg-[#F82B30] p-[6px] rounded-md text-white border border-black"
    >
      <span>+</span>
      <p>Ajoutez un utilisateur</p>
    </button>
  </div>
  <div
    v-if="isModalVisibleUser"
    class="bg-white mb-6 p-6 rounded-md relative max-w-[100%] mx-auto dark:bg-gray-800 dark:text-white dark:border-2 dark:border-black"
  >
    <p class="font-bold mb-3 text-left">Ajoutez un utilisateur</p>
    <div
      class="absolute top-0 right-3 cursor-pointer"
      @click="displayModalUser"
    >
      <p class="text-[22px]">&times;</p>
    </div>
    <div
      class="grid gap-4 sm:flex sm:flex-col lg:flex-row lg:flex-wrap lg:items-end"
    >
      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-user-input-email" class="mb-1">Email</label>
        <input
          id="add-user-input-email"
          name="add_user_input_email"
          type="text"
          class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
          v-model="dataAddUser.mail.value"
        />
      </div>
      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-user-input-identifiant" class="mb-1">Identifiant</label>
        <input
          id="add-user-input-identifiant"
          name="add_user_input_identifiant"
          type="text"
          class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
          v-model="dataAddUser.username.value"
        />
      </div>
      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-user-select-role" class="mb-1">Rôle</label>
        <select
          id="add-user-select-role"
          name="add_user_select_role"
          class="pl-3 py-2 border rounded-md w-full sm:w-full md:w-full lg:w-[195px] xl:[w-195px] dark:text-white dark:bg-gray-900"
          v-model="dataAddUser.isAdmin.value"
        >
          <option value="" disabled>Choisir le rôle</option>
          <option value="true">Administrateur</option>
          <option value="false">Utilisateur</option>
        </select>
      </div>

      <div class="flex justify-center lg:mt-0 sm:mt-4">
        <button
          class="bg-[#F82B30] px-6 py-2 rounded-md text-white border border-black"
          type="submit"
          @click="addUserFonction"
        >
          Créer
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["refresh-users"]);

const isModalVisibleUser = ref(false);
const displayModalUser = () => {
  isModalVisibleUser.value = !isModalVisibleUser.value;
};

let dataAddUser = {
  mail: ref(""),
  username: ref(""),
  password: "password",
  isAdmin: ref(""),
};

const addUserFonction = async () => {
  try {
    await addUser({
      mail: dataAddUser.mail.value,
      username: dataAddUser.username.value,
      password: dataAddUser.password,
      isAdmin: dataAddUser.isAdmin.value,
    });
    dataAddUser.mail.value = "";
    dataAddUser.username.value = "";
    allUsers();
  } catch (error) {
    console.error(error);
  }
};
</script>
