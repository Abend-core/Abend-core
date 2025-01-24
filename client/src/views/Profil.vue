<template>
  <div class="flex">
    <main class="bg-[#FDFDFD] w-[100%] xl:w-[100%] mr-0 relative">
      <div class="p-[50px] relative z-[2] dark:bg-gray-800 dark:text-white">
        <div>
          <div
            class="flex items-center gap-0 xl:gap-6 mt-[42px] xl:flex-row flex-col"
          >
            <div>
              <img
                class="w-[200px] h-[200px] rounded-full border border-white p-1 bg-white"
                :src="`${apiUrl}/uploadsFile/profil/${user.image}`"
                alt=""
              />
            </div>
            <div class="mt-[20px] xl:mt-[80px]">
              <div class="gap-3 flex">
                <p
                  class="mb-3 cursor-pointer hover:text-[#F82B30]"
                  @click="setActiveSection('profile')"
                >
                  Mon profil
                </p>
                <p
                  class="mb-3 cursor-pointer hover:text-[#F82B30]"
                  @click="setActiveSection('editInfo')"
                >
                  Modifier mes informations
                </p>
                <p
                  class="mb-3 cursor-pointer hover:text-[#F82B30]"
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
            <edit-infos @profileUpdated="getInfosProfil" />
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
import manageModule from "../components/profil/manageModule.vue";
import editInfos from "../components/profil/editInfos.vue";
import displayInfos from "../components/profil/displayInfos.vue";
import { getUserById } from "../api/user";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

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
</script>

<style scoped></style>
