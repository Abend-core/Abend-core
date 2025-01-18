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
import { formatDate } from "../utils/date";
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
