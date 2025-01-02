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
          />
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

const selectUsers = ref();

const allUsers = async () => {
  try {
    const response = await findAll();
    users.value = response.data.user;
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
