<template>
  <div class="layout-profil h-full flex">
    <aside class="sidebar w-[20%] p-[100px]">
      <div class="left-section-profil text-center mt-11">
        <p class="mb-3 cursor-pointer" @click="setActiveSection('profile')">
          Mon profil
        </p>
        <p class="mb-3 cursor-pointer" @click="setActiveSection('editInfo')">
          Modifier mes informations
        </p>
        <p
          class="mb-3 cursor-pointer"
          @click="setActiveSection('manageModules')"
        >
          Gérer ses modules
        </p>
      </div>
    </aside>
    <main class="content bg-[#FDFDFD] w-[80%] mr-[100px] relative">
      <div
        class="background absolute w-full h-[225px] bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-3xl z-[1]"
      ></div>
      <div class="p-[100px] relative z-[2]">
        <div class="profil-content">
          <div class="header-profil flex items-center gap-6 mt-[42px]">
            <div class="profil-img">
              <img
                class="w-[200px] h-[200px] rounded-full border border-white p-1 bg-white"
                src="../assets/images/profil-img/chien-mystique.png"
                alt=""
              />
            </div>
            <div class="profil-name flex gap-1 mt-[50px]">
              <p class="text-[24px]">{{ user.firstname }}</p>
              <p class="text-[24px]">{{ user.name }}</p>
            </div>
            <div class="profil-save" v-if="activeSection === 'editInfo'">
              <button
                class="absolute right-6 top-[250px] bg-[#3A84F5] p-[6px] rounded-md text-white"
                @click="updateUserProfile"
              >
                Modifier
              </button>
            </div>
          </div>
          <div v-if="activeSection === 'profile'">
            <div class="profil-data-user">
              <div class="profil-data">
                <p>{{ user.firstname }}</p>
                <p>{{ user.name }}</p>
                <p>{{ user.mail }}</p>
                <p>{{ user.birth }}</p>
                <p>{{ user.login }}</p>
              </div>
            </div>
          </div>
          <div v-if="activeSection === 'editInfo'">
            <div class="profil-edit-data pl-[226px]">
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
            <div class="profil-manage-modules">
              <p class="text-center">Gérer ses modules</p>
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

defineEmits(["login", "logout"]);

const id = sessionStorage.getItem("id");
const user = ref([]);
const activeSection = ref("profile");
const prenomProfil = ref("");
const nomProfil = ref("");
const emailProfil = ref("");
const birthProfil = ref("");
const identifiantProfil = ref("");

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
  } catch (error) {
    console.error(error);
  }
};

const setActiveSection = (section) => {
  activeSection.value = section;
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
