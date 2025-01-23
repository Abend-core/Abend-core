<template>
  <div class="flex">
    <main class="bg-[#FDFDFD] w-[100%] xl:w-[100%] mr-0 relative">
      <div class="absolute w-full h-[225px] bg-black z-[1]"></div>
      <div class="p-[100px] relative z-[2] dark:bg-gray-800 dark:text-white">
        <div>
          <div
            class="flex items-center gap-0 xl:gap-6 mt-[42px] xl:flex-row flex-col"
          >
            <div>
              <img
                class="w-[200px] h-[200px] rounded-full border border-white p-1 bg-white"
                :src="`http://localhost:5000/uploadsFile/profil/${user.image}`"
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
                <p class="text-[24px]">{{ user.username }}</p>
              </div>
              <p class="text-[#8592A4]">
                Mets à jour tes informations personnelles
              </p>
            </div>
          </div>
          <div v-if="activeSection === 'profile'">
            <display-infos />
          </div>
          <div v-if="activeSection === 'editInfo'">
            <edit-infos />
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
import { ref, watch } from "vue";
import manageModule from "../components/profil/manageModule.vue";
import editInfos from "../components/profil/editInfos.vue";
import displayInfos from "../components/profil/displayInfos.vue";
import { getUserById } from "../api/user";

defineEmits(["login", "logout"]);

const user = ref({});
const id = sessionStorage.getItem("id");

const activeSection = ref("profile");
const setActiveSection = (section) => {
  activeSection.value = section;
};

const getInfosProfil = async () => {
  try {
    const response = await getUserById(id);
    user.value = response.data.user;
  } catch (error) {
    console.error(error);
  }
};

getInfosProfil();

watch(user, () => {
  getInfosProfil();
});
</script>

<style scoped></style>
