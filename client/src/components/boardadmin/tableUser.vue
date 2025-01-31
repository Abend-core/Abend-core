<template>
  <div
    class="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center gap-5 mb-5"
  >
    <div class="relative">
      <input
        class="pl-10 py-2 border rounded-md w-[300px] dark:text-white dark:bg-gray-900"
        type="text"
        placeholder="Rechercher..."
        v-model="inputValueSearchBar"
        @change="filterSearchUser"
      />
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <i class="ri-search-line text-xl text-customlightGray"></i>
      </span>
    </div>
    <div class="flex gap-3">
      <p class="text-customGray dark:text-gray-400">{{ countUser }} selected</p>
    </div>
    <i
      class="ri-delete-bin-4-fill text-3xl text-customlightGray cursor-pointer"
      @click="deleteUserTable"
    ></i>
  </div>
  <modal-add-user @refresh-users="allUsers" />
  <div
    class="bg-white p-6 rounded-md max-h-[800px] overflow-auto mb-5 dark:bg-gray-800 dark:text-white"
  >
    <table class="w-full">
      <thead>
        <tr class="text-left border-b border-customWhite">
          <th class="p-3">
            <input
              id="checkbox-dashboad-table-allUsers"
              name="checkbox_dashboad_table_allUsers"
              type="checkbox"
              class="select-users cursor-pointer"
              @change="selectAllUsers"
            />
          </th>
          <th class="p-3">Email</th>
          <th class="p-3">Identifiant</th>
          <th class="p-3">Date de création</th>
          <th class="p-3">Photo de profil</th>
          <th class="p-3">Rôle</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="user in users"
          :key="user.id"
          class="hover:bg-customWhite dark:hover:text-black dark:hover:bg-gray-500"
        >
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
          <td class="p-3">{{ user.mail }}</td>
          <td class="p-3">{{ user.username }}</td>
          <td class="p-3">{{ formatDateTime(user.createdAt) }}</td>
          <td class="p-3">
            <img
              class="w-[50px] h-[50px] rounded-2xl"
              :src="`${apiUrl}/uploadsFile/profil/${user.image}`"
              alt=""
            />
          </td>
          <td class="p-3">
            {{ user.isAdmin ? "Administrateur" : "Utilisateur" }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { findAll, deleteUser, filter, addUser } from "../../api/user";
import { formatDateTime } from "../../utils/date";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

let users = ref([]);
let idUsers = [];
let countUser = ref(0);
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

const allUsers = async () => {
  try {
    const response = await findAll();
    users.value = response.data.user;
  } catch (error) {
    console.error(error);
  }
};

const updateUserCountUser = (event) => {
  countUser.value += event.target.checked ? 1 : -1;
};

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

allUsers();
</script>
