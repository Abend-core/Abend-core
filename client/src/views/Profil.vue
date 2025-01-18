<template>
  <div class="h-full flex">
    <main class="bg-[#FDFDFD] w-[100%] xl:w-[100%] mr-0 relative">
      <div
        class="absolute w-full h-[225px] bg-gradient-to-r from-stone-300 to-stone-300 z-[1]"
      ></div>
      <div class="p-[100px] relative z-[2]">
        <div>
          <div
            class="flex items-center gap-0 xl:gap-6 mt-[42px] xl:flex-row flex-col"
          >
            <div>
              <img
                class="w-[200px] h-[200px] rounded-full border border-white p-1 bg-white"
                src="../assets/images/profil-img/chien-mystique.png"
                alt=""
              />
            </div>
            <div class="mt-[20px] xl:mt-[80px]">
              <div class="gap-3 flex">
                <p
                  class="mb-3 cursor-pointer"
                  @click="setActiveSection('profile')"
                >
                  Mon profil
                </p>
                <p
                  class="mb-3 cursor-pointer"
                  @click="setActiveSection('editInfo')"
                >
                  Modifier mes informations
                </p>
                <p
                  class="mb-3 cursor-pointer"
                  @click="setActiveSection('manageModules')"
                >
                  Gérer ses modules
                </p>
              </div>
              <div class="flex gap-2">
                <p class="text-[24px]">{{ user.firstname }}</p>
                <p class="text-[24px]">{{ user.name }}</p>
              </div>
              <p class="mt-2 text-[#8592A4]">
                Mets à jour tes informations personnelles
              </p>
            </div>
            <div v-if="activeSection === 'editInfo'">
              <button
                class="absolute right-6 top-[250px] bg-[#3A84F5] p-[6px] rounded-md text-white border border-black"
                @click="updateUserProfile"
              >
                Modifier
              </button>
            </div>
          </div>
          <div v-if="activeSection === 'profile'">
            <div class="bg-white mt-5 p-0 xl:p-6 rounded-md">
              <div>
                <p class="underline mb-5">Informations personnelles</p>
              </div>
              <div>
                <div class="flex gap-1">
                  <p>{{ user.firstname }}</p>
                  <p>{{ user.name }}</p>
                </div>
                <p>{{ user.mail }}</p>
                <p>{{ formatDate(user.birth) }}</p>
                <p>{{ user.login }}</p>
              </div>
            </div>
          </div>
          <p class="text-[#4b9945] text-center">{{ successMessage }}</p>
          <div v-if="activeSection === 'editInfo'">
            <div class="pl-[226px] mt-6">
              <div class="flex flex-col gap-[22px]">
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px]">Prénom</p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Prénom"
                    v-model="prenomProfil"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px]">Nom</p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Nom"
                    v-model="nomProfil"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px]">Email</p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Email"
                    v-model="emailProfil"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px]">Date de naissance</p>
                  <input
                    class="w-[450px]"
                    type="date"
                    placeholder="Date de naissance"
                    v-model="birthProfil"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px]">Identifiant</p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Identifiant"
                    v-model="identifiantProfil"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px]">Ancien mot de passe</p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Ancien mot de passe"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px]">Nouveau mot de passe</p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Nouveau mot de passe"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px]">Répéter le mot de passe</p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Répéter le mot de passe"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="activeSection === 'manageModules'">
            <div>
              <p class="text-center">Gérer ses modules</p>
            </div>
            <div
              class="bg-white p-6 rounded-md max-h-[800px] overflow-auto mb-5"
            >
              <div
                v-if="errorMessage"
                class="text-white rounded-[6px] p-4 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
              >
                <div>
                  <div class="text-[14px] text-[#1f2328]">
                    {{ errorMessage }}
                  </div>
                </div>
              </div>
              <table v-if="modules.length > 0" class="w-full">
                <thead>
                  <tr class="text-left border-b border-[#F4F6FA]">
                    <th class="p-3">Nom</th>
                    <th class="p-3">Lien</th>
                    <th class="p-3">Couleur</th>
                    <th class="p-3">Image</th>
                    <th class="p-3">Date de création</th>
                    <th class="p-3">Visibilité</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="module in modules"
                    :key="module.id"
                    class="hover:bg-[#F4F6FA]"
                  >
                    <td class="p-3">{{ module.name }}</td>
                    <td class="p-3">{{ module.link }}</td>
                    <td class="p-3">
                      <p
                        class="w-fit p-1 rounded-2xl"
                        :style="{ backgroundColor: `${module.color}` }"
                      >
                        {{ module.color }}
                      </p>
                    </td>
                    <td class="p-3">
                      <img
                        :src="`http://localhost:5000/uploadsFile/module/${module.image}`"
                        alt="Module image"
                        class="w-[50px] h-[50px] rounded-2xl"
                      />
                    </td>
                    <td class="p-3">{{ formatDateTime(module.createdAt) }}</td>
                    <td class="p-3">{{ module.isShow }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getUserById, editUserById } from "../api/user";
import { formatDate, formatDateTime } from "../utils/date";
import { getModuleById } from "../api/module";
defineEmits(["login", "logout"]);

const id = sessionStorage.getItem("id");
const user = ref([]);
const activeSection = ref("profile");
const prenomProfil = ref("");
const nomProfil = ref("");
const emailProfil = ref("");
const birthProfil = ref("");
const identifiantProfil = ref("");
const modules = ref([]);

let successMessage = ref("");
let errorMessage = ref("");

const setActiveSection = (section) => {
  activeSection.value = section;
};

const updateUserProfile = async () => {
  const updatedData = {
    firstname: prenomProfil.value,
    name: nomProfil.value,
    mail: emailProfil.value,
    birth: birthProfil.value,
    login: identifiantProfil.value,
  };

  try {
    await editUserById(id, updatedData);
    getInfosProfil();
    successMessage.value = "Profil modifié.";
  } catch (error) {
    console.error(error);
  }
};

const getInfosProfil = async () => {
  try {
    const response = await getUserById(id);
    user.value = response.data.user;

    prenomProfil.value = user.value.firstname;
    nomProfil.value = user.value.name;
    emailProfil.value = user.value.mail;
    birthProfil.value = user.value.birth;
    identifiantProfil.value = user.value.login;
  } catch (error) {
    console.error(error);
  }
};

const getModulesById = async () => {
  try {
    const response = await getModuleById(id);
    if (response.data.modules.length === 0) {
      errorMessage.value = "Vous n'avez pas encore créé de module.";
      modules.value = [];
    } else {
      modules.value = response.data.modules;
    }
  } catch (error) {
    errorMessage.value =
      "Une erreur s'est produite lors de la récupération des modules.";
    console.error(error);
  }
};

getInfosProfil();
getModulesById();
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
