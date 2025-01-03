<template>
  <div class="layout-profil h-screen flex">
    <aside class="sidebar w-[20%] p-[100px]">
      <div class="left-section-profil text-center mt-11">
        <p class="mb-3">Mon profil</p>
        <p class="mb-3">Gérer ses modules</p>
        <p class="mb-3">Modifier son mot de passe</p>
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
            <div class="profil-save">
              <button
                class="absolute right-6 top-[250px] bg-[#3A84F5] p-[6px] rounded-md text-white"
              >
                Modifier
              </button>
            </div>
          </div>
          <div class="profil-data-user pl-[226px]">
            <div class="flex flex-col gap-[22px]">
              <div class="flex items-center">
                <p class="w-[150px] mr-[200px]">Prénom</p>
                <input class="w-[450px]" type="text" placeholder="Prénom" />
              </div>
              <div class="flex items-center">
                <p class="w-[150px] mr-[200px]">Nom</p>
                <input class="w-[450px]" type="text" placeholder="Nom" />
              </div>
              <div class="flex items-center">
                <p class="w-[150px] mr-[200px]">Email</p>
                <input class="w-[450px]" type="text" placeholder="Email" />
              </div>
              <div class="flex items-center">
                <p class="w-[150px] mr-[200px]">Date de naissance</p>
                <input
                  class="w-[450px]"
                  type="text"
                  placeholder="Date de naissance"
                />
              </div>
              <div class="flex items-center">
                <p class="w-[150px] mr-[200px]">Identifiant</p>
                <input
                  class="w-[450px]"
                  type="text"
                  placeholder="Identifiant"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
  <!-- <div class="profil-edit-data">
    <div class="profil-data">
      <p>{{ user.firstname }}</p>
      <p>{{ user.name }}</p>
      <p>{{ user.mail }}</p>
      <p>{{ user.birth }}</p>
      <p>{{ user.login }}</p>
      <button>Modifier</button>
      <button>Sauvegarder</button>
    </div>
  </div>
  <div class="profil-edit-password">
    <input type="text" placeholder="Ancien mot de passe" />
    <input type="text" placeholder="Nouveau mot de passe" />
    <input type="text" placeholder="Répéter le mot de passe" />
    <button>Modifier</button>
  </div> -->
  <!-- <div class="profil-manage-modules">
    <p>Gestion des modules</p>
  </div> -->
</template>

<script setup>
import { ref } from "vue";
import { getUserById } from "../api/user";

defineEmits(["login", "logout"]);

const user = ref([]);
const id = sessionStorage.getItem("id");

const getInfosProfil = async () => {
  try {
    const response = await getUserById(id);
    user.value = response.data.user;
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
