<template>
  <main class="p-[20px]">
    <div class="dashboard w-full bg-[#F4F6FA] rounded-md p-[20px]">
      <div class="dashboard-header mb-5">
        <div class="dashboard-header-content bg-white rounded-md p-[12px]">
          <h1 class="font-bold">Gestion des utilisateurs</h1>
          <p class="text-[#4954ecde] mt-1">Admin Dashboard</p>
        </div>
      </div>
      <div class="dashboard-top-content flex items-center gap-5 mb-5">
        <div class="dashboard-search-bar relative">
          <input
            class="search-bar-input pl-10 py-2 border rounded-md w-[300px]"
            type="text"
            placeholder="Rechercher..."
            v-model="inputValueSearchBar"
          />
          <span><button @click="testInput">Envoyer</button></span>
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
            <img
              class="h-5 w-5"
              src="../assets/images/dashboard-icon/search-bar-icon.png"
            />
          </span>
        </div>
        <div class="dashboard-selected-user flex gap-3">
          <input type="checkbox" />
          <p class="text-[#746a6ade]">{{ countUser }} selected</p>
        </div>
        <img
          class="cursor-pointer"
          src="../assets/images/dashboard-icon/bin-icon.png"
        />
        <div class="dashboard-add-user ml-auto">
          <button class="bg-[#4954ecde] p-[6px] rounded-md text-white">
            <span>+</span> Ajoutez un utilisateur
          </button>
        </div>
      </div>
      <div class="dashboard-add-user bg-white mb-6 p-3 rounded-md relative">
        <p class="font-bold mb-3">Ajoutez un utilisateur</p>
        <div
          class="close-dashboard-add-user absolute top-0 right-3 cursor-pointer"
        >
          <p class="text-[22px]">&times;</p>
        </div>
        <div class="add-user-input flex items-center gap-3">
          <p>Nom</p>
          <input
            type="text"
            class="pl-3 py-2 border rounded-md w-[300px]"
            v-model="nomAddUser"
          />
          <p>Prénom</p>
          <input
            type="text"
            class="pl-3 py-2 border rounded-md w-[300px]"
            v-model="prenomAddUser"
          />
          <p>Email</p>
          <input
            type="text"
            class="pl-3 py-2 border rounded-md w-[300px]"
            v-model="emailAddUser"
          />
          <p>Identifiant</p>
          <input
            type="text"
            class="pl-3 py-2 border rounded-md w-[300px]"
            v-model="idenfiantAddUser"
          />
          <p>Rôle</p>
          <input
            type="text"
            class="pl-3 py-2 border rounded-md w-[300px]"
            v-model="roleAddUser"
          />
        </div>
        <div class="add-user-search-btn">
          <button type="submit" @click="addUser">Rechercher</button>
        </div>
      </div>
      <div
        class="dashboard-table bg-white p-6 rounded-md max-h-[800px] overflow-auto"
      >
        <table class="w-full">
          <thead>
            <tr class="text-left border-b border-[#F4F6FA]">
              <th class="p-3">
                <input
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
              <th class="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id" class="hover:bg-[#F4F6FA]">
              <td class="p-3">
                <input
                  type="checkbox"
                  class="cursor-pointer"
                  @change="updateUserCount"
                />
              </td>
              <td class="p-3">{{ user.name }}</td>
              <td class="p-3">{{ user.firstname }}</td>
              <td class="p-3">{{ user.mail }}</td>
              <td class="p-3">{{ formatDate(user.birth) }}</td>
              <td class="p-3">{{ formatDateTime(user.createdAt) }}</td>
              <td class="p-3">{{ user.login }}</td>
              <td class="p-3">{{ user.isAdmin ? "Admin" : "User" }}</td>
              <td class="p-3">Jsp</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { findAll } from "../api/user";
import { formatDate, formatDateTime } from "../utils/date";

const users = ref([]);
const countUser = ref(0);

const inputValueSearchBar = ref("");

const testInput = () => {
  users.value = "";

  const filterSearch = async () => {
    try {
      const response = await filter({ search: inputValueSearchBar.value });
      if (response && response.data.user) {
        users.value = response.data.user;
      }
      // users.value = response.data.user;
    } catch (error) {
      console.error(error);
    }
  };
  filterSearch();
};

//mettre dans un tableau ou objet
const nomAddUser = ref("");
const prenomAddUser = ref("");
const emailAddUser = ref("");
const idenfiantAddUser = ref("");
const roleAddUser = ref("");

const addUser = () => {
  console.log("Nom :", nomAddUser.value);
  console.log("Prénom :", prenomAddUser.value);
  console.log("Email :", emailAddUser.value);
  console.log("Identifiant :", idenfiantAddUser.value);
  console.log("Rôle :", roleAddUser.value);
};

const allUsers = async () => {
  try {
    const response = await findAll();
    users.value = response.data.user;
  } catch (error) {
    console.error(error);
  }
};

const filter = async () => {
  try {
  } catch (error) {
    console.error(error);
  }
};

const updateUserCount = (event) => {
  countUser.value += event.target.checked ? 1 : -1;
};

allUsers();
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
