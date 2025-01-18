<template>
  <div class="h-full flex">
    <main class="bg-[#FDFDFD] w-[100%] xl:w-[100%] mr-0 relative">
      <div class="absolute w-full h-[225px] bg-black z-[1]"></div>
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
                class="absolute right-6 top-[250px] bg-[#4954ecde] p-[6px] rounded-md text-white border border-black"
                @click="updateUserProfile"
              >
                Modifier mon profil
              </button>
            </div>
          </div>
          <div v-if="activeSection === 'profile'">
            <div>
              <div class="bg-white rounded-md p-[12px] mt-3 mb-3">
                <h1 class="font-bold">Mes informations personnelles</h1>
                <p class="text-[#4954ecde] mt-1">Profil Dashboard</p>
              </div>
              <div class="bg-white p-[12px] flex flex-col items-center">
                <div>
                  <img
                    class="w-[64px] h-[64px] mx-auto"
                    src="../assets/images/profil-icon/icon-profil-2.png"
                    alt=""
                  />
                  <div class="flex gap-2">
                    <p class="text-2xl">{{ user.firstname }}</p>
                    <p class="text-2xl">{{ user.name }}</p>
                  </div>
                  <p class="text-gray-400 mb-4">{{ user.login }}</p>
                </div>
                <div class="flex items-center gap-3 w-[300px]">
                  <img
                    class="w-[45px] h-[45px]"
                    src="../assets/images/profil-icon/icon-profil-3.png"
                    alt=""
                  />
                  <p>
                    {{ user.mail }}
                  </p>
                </div>
                <div class="flex items-center gap-3 w-[300px]">
                  <img
                    class="w-[45px] h-[45px]"
                    src="../assets/images/profil-icon/icon-profil-4.png"
                    alt=""
                  />
                  <p>{{ formatDate(user.birth) }}</p>
                </div>
                <div class="flex items-center gap-3 w-[300px]">
                  <img
                    class="w-[45px] h-[45px]"
                    src="../assets/images/profil-icon/icon-profil-1.png"
                    alt=""
                  />
                  <p>{{ formatDateTime(user.createdAt) }}</p>
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="successMessage"
            class="text-white rounded-[6px] p-4 mt-3 bg-gradient-to-r from-[#4b9945] to-[#4b9945] border border-black"
          >
            <div>
              <div class="text-[14px] text-[#1f2328]">
                {{ successMessage }}
              </div>
            </div>
          </div>
          <div v-if="activeSection === 'editInfo'">
            <div class="bg-white rounded-md p-[12px] mt-3 mb-3">
              <h1 class="font-bold">Gérer ses informations</h1>
              <p class="text-[#4954ecde] mt-1">Profil Dashboard</p>
            </div>
            <div>
              <div
                class="flex flex-col gap-[22px] p-[12px] bg-white rounded-md"
              >
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
              </div>
              <div class="bg-white rounded-md mt-3 p-[12px]">
                <p class="font-bold">Gérer son mot de passe</p>
                <p class="text-[#4954ecde] mt-1">Modification Dashboard</p>
              </div>
              <div
                class="flex flex-col gap-[22px] bg-white rounded-md mt-3 p-[12px]"
              >
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px] whitespace-nowrap">
                    Ancien mot de passe
                  </p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Ancien mot de passe"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px] whitespace-nowrap">
                    Nouveau mot de passe
                  </p>
                  <input
                    class="w-[450px]"
                    type="text"
                    placeholder="Nouveau mot de passe"
                  />
                </div>
                <div class="flex items-center">
                  <p class="w-[150px] mr-[200px] whitespace-nowrap">
                    Répéter le mot de passe
                  </p>
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
            <manage-module />
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
import manageModule from "../components/profil/manageModule.vue";

defineEmits(["login", "logout"]);

const id = sessionStorage.getItem("id");
const user = ref([]);
const activeSection = ref("profile");
const prenomProfil = ref("");
const nomProfil = ref("");
const emailProfil = ref("");
const birthProfil = ref("");
const identifiantProfil = ref("");

let successMessage = ref("");

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

getInfosProfil();
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
