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
            @change="filterSearch"
          />
          <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
            <img
              class="h-5 w-5 cursor-pointer"
              src="../assets/images/dashboard-icon/search-bar-icon.png"
            />
          </span>
        </div>
        <div class="dashboard-selected-user flex gap-3">
          <p class="text-[#746a6ade]">{{ countUser }} selected</p>
        </div>
        <img
          class="cursor-pointer"
          src="../assets/images/dashboard-icon/bin-icon.png"
          @click="deleteUser"
        />
        <div class="dashboard-add-user ml-auto">
          <button
            @click="displayModal"
            class="flex gap-1 bg-[#4954ecde] p-[6px] rounded-md text-white"
          >
            <span>+</span>
            <p>Ajoutez un utilisateur</p>
          </button>
        </div>
      </div>
      <div
        v-if="isModalVisible"
        class="dashboard-add-user bg-white mb-6 p-3 rounded-md relative"
      >
        <p class="font-bold mb-3">Ajoutez un utilisateur</p>
        <div
          class="close-dashboard-add-user absolute top-0 right-3 cursor-pointer"
          @click="displayModal"
        >
          <p class="text-[22px]">&times;</p>
        </div>
        <div class="add-user-input flex items-center gap-3">
          <p>Nom</p>
          <input
            id="add-user-input-nom"
            name="add_user_input_nom"
            type="text"
            class="pl-3 py-2 border rounded-md w-[250px]"
            v-model="dataAddUser.nom.value"
          />
          <p>Prénom</p>
          <input
            id="add-user-input-prenom"
            name="add_user_input_prenom"
            type="text"
            class="pl-3 py-2 border rounded-md w-[250px]"
            v-model="dataAddUser.prenom.value"
          />
          <p>Email</p>
          <input
            id="add-user-input-email"
            name="add_user_input_email"
            type="text"
            class="pl-3 py-2 border rounded-md w-[250px]"
            v-model="dataAddUser.email.value"
          />
          <p>Identifiant</p>
          <input
            id="add-user-input-identifiant"
            name="add_user_input_identifiant"
            type="text"
            class="pl-3 py-2 border rounded-md w-[250px]"
            v-model="dataAddUser.identifiant.value"
          />
          <select
            id="add-user-select-role"
            name="add_user_select_role"
            v-model="dataAddUser.role.value"
          >
            <option value="" disabled>Choisir le rôle</option>
            <option value="admin">Administrateur</option>
            <option value="user">Utilisateur</option>
          </select>
          <div class="add-user-search-btn">
            <button
              class="bg-[#4954ecde] p-[6px] rounded-md text-white"
              type="submit"
              @click="addUserFn"
            >
              Créer
            </button>
          </div>
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
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, watch } from "vue";
import { findAll, deleteUser, filter, addUser } from "../api/user";
import { formatDate, formatDateTime } from "../utils/date";

//Tableau d'utilisateur, initialisÃ© Ã  vide
const users = ref([]);

//Valeur de l'input de la search bar
const inputValueSearchBar = ref("");
//Fonction qui permet de filtrer les utilisateurs
const filterSearch = async () => {
  //On vide le tableau des users
  users.value = [];
  try {
    //On fait appel Ã  l'API qui a une mÃ©thode "filter" qui demande un paramÃ¨tre, la valeur de l'input de la search bar
    const response = await filter({ search: inputValueSearchBar.value });
    //S'il y a une rÃ©ponse et qu'elle correspond aux donnÃ©es des utilisateurs, on attribue ces valeurs au tableau des users
    if (response && response.data.user) {
      users.value = response.data.user;
    }
  } catch (error) {
    console.error(error);
  }
};
//Permet de rendre la recherche dynamique, pas besoin de bouton submit, la fonction filterSearch est appelÃ©e Ã  chaque input de l'utilisateur
watch(inputValueSearchBar, () => {
  filterSearch();
});

//Fonction qui permet d'afficher tous les utilisateurs
const allUsers = async () => {
  try {
    //On fait appel Ã  l'API qui a une mÃ©thode "findAll"
    const response = await findAll();
    //On associe le tableau vide users aux valeurs qu'on rÃ©cupÃ¨re grÃ¢ce Ã  la mÃ©thode findAll
    users.value = response.data.user;
  } catch (error) {
    console.error(error);
  }
};

//Variable utilisÃ© pour compter le nombre de checkbox sÃ©lectionnÃ©, initialisÃ© Ã  0
const countUser = ref(0);
//Fonction qui permet de mettre Ã  jour la valeur de countUser selon les checkbox sÃ©lectionnÃ©es
const updateUserCount = (event) => {
  countUser.value += event.target.checked ? 1 : -1;
};

//Fonction qui permettra de sÃ©lectionner tous les utilisateurs
const selectAllUsers = (event) => {
  console.log(event.target.checked);
};

//Variable qui initialise la modal Ã  false pour ne pas la voir par dÃ©faut
const isModalVisible = ref(false);
//Fonction qui permet d'afficher et d'enlever la modal quand on appuie sur le bouton
const displayModal = () => {
  isModalVisible.value = !isModalVisible.value;
};

const supprUser = async () => {
  try {
  } catch (error) {}
};

//Objet qui rÃ©pertorie l'ensemble des donnÃ©es utiles pour crÃ©er un utilisateur
let dataAddUser = {
  nom: ref(""),
  prenom: ref(""),
  email: ref(""),
  identifiant: ref(""),
  role: ref(""),
};

//Fonction qui permet de crÃ©er un utilisateur
// const addUserFn = () => {
//   console.log("Nom :", dataAddUser.nom.value);
//   console.log("PrÃ©nom :", dataAddUser.prenom.value);
//   console.log("Email :", dataAddUser.email.value);
//   console.log("Identifiant :", dataAddUser.identifiant.value);
//   console.log("RÃ´le :", dataAddUser.role.value);
//   const addUser = async () => {
//     try {
//       const response = await findAll();
//       users.value = response.data.user;
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   addUser();
// };

//Appel de la fonction allUsers pour qu'elle soit fonctionnelle
allUsers();
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
