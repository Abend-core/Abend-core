<template>
  <div
    class="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center gap-5 mb-5"
  >
    <div class="relative">
      <input
        class="pl-10 py-2 border rounded-md w-[300px]"
        type="text"
        placeholder="Rechercher..."
        v-model="inputValueSearchBar"
        @change="filterSearchUser"
      />
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <img
          class="h-5 w-5 cursor-pointer"
          src="../assets/images/dashboard-icon/search-bar-icon.png"
        />
      </span>
    </div>
    <div class="flex gap-3">
      <p class="text-[#746a6ade]">{{ countUser }} selected</p>
    </div>
    <img
      class="cursor-pointer"
      src="../assets/images/dashboard-icon/bin-icon.png"
      @click="deleteUserTable"
    />

    <div class="ml-0 sm:ml-0 md:ml-auto lg:ml-auto xl:ml-auto">
      <button
        @click="displayModalUser"
        class="flex gap-1 bg-[#4954ecde] p-[6px] rounded-md text-white border border-black"
      >
        <span>+</span>
        <p>Ajoutez un utilisateur</p>
      </button>
    </div>
  </div>

  <div
    v-if="isModalVisibleUser"
    class="bg-white mb-6 p-6 rounded-md relative max-w-[100%] mx-auto"
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
        <label for="add-user-input-nom" class="mb-1">Nom</label>
        <input
          id="add-user-input-nom"
          name="add_user_input_nom"
          type="text"
          class="pl-3 py-2 border rounded-md w-full"
          v-model="dataAddUser.name.value"
        />
      </div>

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-user-input-prenom" class="mb-1">Prénom</label>
        <input
          id="add-user-input-prenom"
          name="add_user_input_prenom"
          type="text"
          class="pl-3 py-2 border rounded-md w-full"
          v-model="dataAddUser.firstname.value"
        />
      </div>

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-user-input-email" class="mb-1">Email</label>
        <input
          id="add-user-input-email"
          name="add_user_input_email"
          type="text"
          class="pl-3 py-2 border rounded-md w-full"
          v-model="dataAddUser.mail.value"
        />
      </div>

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-user-input-date-naissance" class="mb-1"
          >Date de naissance</label
        >
        <input
          id="add-user-input-date-naissance"
          name="add_user_input_date_naissance"
          type="date"
          class="pl-3 py-2 border rounded-md w-full sm:w-full md:w-full lg:w-[195px] xl:[w-195px]"
          v-model="dataAddUser.birth.value"
        />
      </div>

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-user-input-identifiant" class="mb-1">Identifiant</label>
        <input
          id="add-user-input-identifiant"
          name="add_user_input_identifiant"
          type="text"
          class="pl-3 py-2 border rounded-md w-full"
          v-model="dataAddUser.login.value"
        />
      </div>

      <div class="flex flex-col lg:w-auto lg:mr-4 sm:w-full">
        <label for="add-user-select-role" class="mb-1">Rôle</label>
        <select
          id="add-user-select-role"
          name="add_user_select_role"
          class="pl-3 py-2 border rounded-md w-full sm:w-full md:w-full lg:w-[195px] xl:[w-195px]"
          v-model="dataAddUser.isAdmin.value"
        >
          <option value="" disabled>Choisir le rôle</option>
          <option value="true">Administrateur</option>
          <option value="false">Utilisateur</option>
        </select>
      </div>

      <div class="flex justify-center lg:mt-0 sm:mt-4">
        <button
          class="bg-[#4954ecde] px-6 py-2 rounded-md text-white border border-black"
          type="submit"
          @click="addUserFonction"
        >
          Créer
        </button>
      </div>
    </div>
  </div>
  <div class="bg-white p-6 rounded-md max-h-[800px] overflow-auto mb-5">
    <table class="w-full">
      <thead>
        <tr class="text-left border-b border-[#F4F6FA]">
          <th class="p-3">
            <input
              id="checkbox-dashboad-table-allUsers"
              name="checkbox_dashboad_table_allUsers"
              type="checkbox"
              class="select-users cursor-pointer"
              @change="selectAllUsers"
            />
          </th>
          <th class="p-3">Nom</th>
          <th class="p-3">Prénom</th>
          <th class="p-3">Email</th>
          <th class="p-3">Date d'anniversaire</th>
          <th class="p-3">Date de création</th>
          <th class="p-3">Identifiant</th>
          <th class="p-3">Rôle</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="hover:bg-[#F4F6FA]">
          <td class="p-3">
            <input
              id="checkbox-dashboard-table-oneUser"
              name="checkbox_dashboard_table_oneUser"
              type="checkbox"
              class="cursor-pointer"
              @click="selectAllUsers"
              @change="updateUserCountUser"
              :value="user.id"
            />
          </td>
          <td class="p-3">{{ user.name }}</td>
          <td class="p-3">{{ user.firstname }}</td>
          <td class="p-3">{{ user.mail }}</td>
          <td class="p-3">{{ formatDate(user.birth) }}</td>
          <td class="p-3">{{ formatDateTime(user.createdAt) }}</td>
          <td class="p-3">{{ user.login }}</td>
          <td class="p-3">{{ user.isAdmin ? "Admin" : "User" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { findAll, deleteUser, filter, addUser } from "../../api/user";
import { formatDate, formatDateTime } from "../../utils/date";

const inputValueSearchBar = ref("");
const filterSearchUser = async () => {
  users.value = [];
  try {
    const response = await filter({ search: inputValueSearchBar.value });
    if (response && response.data.user) {
      idUsers = [];
      countUser.value = 0;
      users.value = response.data.user;
    }
  } catch (error) {
    console.error(error);
  }
};

watch(inputValueSearchBar, () => {
  filterSearchUser();
});

let users = ref([]);
const allUsers = async () => {
  try {
    const response = await findAll();
    users.value = response.data.user;
  } catch (error) {
    console.error(error);
  }
};

let countUser = ref(0);
const updateUserCountUser = (event) => {
  countUser.value += event.target.checked ? 1 : -1;
};

let idUsers = [];
const selectAllUsers = (event) => {
  const idUser = event.target.value;
  const checked = event.target.checked;
  if (checked) {
    idUsers.push(idUser);
  } else {
    for (let i = 0; i < idUsers.length; i++) {
      if (idUsers[i] === idUser) {
        idUsers.splice(i, 1);
      }
    }
  }
};

const isModalVisibleUser = ref(false);
const displayModalUser = () => {
  isModalVisibleUser.value = !isModalVisibleUser.value;
};

const deleteUserTable = async () => {
  for (let i = 0; i < idUsers.length; i++) {
    try {
      await deleteUser(idUsers[i]);
    } catch (error) {
      console.error(error);
    }
  }
  countUser.value = 0;
  idUsers = [];
  allUsers();
};

let dataAddUser = {
  name: ref(""),
  firstname: ref(""),
  mail: ref(""),
  birth: ref(""),
  login: ref(""),
  password: "password",
  isAdmin: ref(""),
};

const addUserFonction = async () => {
  try {
    await addUser({
      name: dataAddUser.name.value,
      firstname: dataAddUser.firstname.value,
      mail: dataAddUser.mail.value,
      birth: dataAddUser.birth.value,
      login: dataAddUser.login.value,
      password: dataAddUser.password,
      isAdmin: dataAddUser.isAdmin.value,
    });
    dataAddUser.name.value = "";
    dataAddUser.firstname.value = "";
    dataAddUser.mail.value = "";
    dataAddUser.birth.value = "";
    dataAddUser.login.value = "";
    allUsers();
  } catch (error) {
    console.error(error);
  }
};

allUsers();
</script>
