<template>
  <main class="p-[20px]">
    <div class="dashboard w-full h-[900px] bg-[#f0eeee94] rounded-md p-[20px]">
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
            <img class="h-5 w-5" src="../assets/images/search-bar-icon.png" />
          </span>
        </div>
        <div class="dashboard-selected-user flex gap-3">
          <input type="checkbox" />
          <p class="text-[#746a6ade]">2 selected</p>
        </div>
        <div class="dashboard-add-user ml-auto">
          <button class="bg-[#4954ecde] p-[6px] rounded-md text-white">
            <span>+</span> Ajoutez un utilisateur
          </button>
        </div>
      </div>
      <div class="dashboard-table h-[700px] bg-white p-[12px] rounded-md">
        <table class="w-full">
          <thead>
            <tr class="text-left">
              <th><input type="checkbox" /></th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Date d'anniversaire</th>
              <th>Date de création</th>
              <th>Identifiant</th>
              <th>Rôle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td><input type="checkbox" /></td>
              <td>{{ user.name }}</td>
              <td>{{ user.firstname }}</td>
              <td>{{ user.mail }}</td>
              <td>{{ user.birth }}</td>
              <td>{{ user.createdAt }}</td>
              <td>{{ user.login }}</td>
              <td>{{ user.isAdmin ? "Admin" : "User" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
import { findAll } from "../api/user";

export default {
  data() {
    return {
      users: [],
    };
  },
  methods: {
    allUsers() {
      findAll()
        .then((response) => {
          console.log(response.data);
          this.users = response.data.user;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  mounted() {
    this.allUsers();
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
