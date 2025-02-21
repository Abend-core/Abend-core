<template>
  <div class="flex max-w-[1400px] mx-auto">
    <main class="bg-[#FDFDFD] w-full xl:w-full mr-0 relative">
      <div
        class="pt-[1px] pl-[50px] pr-[50px] relative z-[2] dark:bg-gray-800 dark:text-white"
      >
        <div>
          <div
            class="flex items-center gap-0 xl:gap-6 mt-[42px] xl:flex-row flex-col"
          >
            <div class="relative w-[200px] h-[200px] rounded-full group">
              <img
                v-if="user && user.image"
                class="absolute rounded-full border border-white p-1 bg-white"
                :src="`${apiUrl}/uploadsFile/profil/${user.image}`"
                alt="Image de profil"
              />
              <div
                class="absolute inset-0 flex items-center justify-center z-10 bg-primaryRed rounded-full bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <i class="ri-pencil-fill text-white text-3xl"></i>
              </div>
              <input
                type="file"
                class="absolute w-full h-full opacity-0 cursor-pointer z-30"
                accept="image/png, image/jpeg"
                @change="updateImg"
              />
            </div>
            <div class="mt-5 xl:mt-[80px]">
              <div class="gap-3 flex">
                <p
                  :class="{ 'text-primaryRed': activeSection === 'profile' }"
                  class="mb-3 cursor-pointer hover:text-primaryRed"
                  @click="setActiveSection('profile')"
                >
                  Mon profil
                </p>
                <p
                  :class="{ 'text-primaryRed': activeSection === 'editInfo' }"
                  class="mb-3 cursor-pointer hover:text-primaryRed"
                  @click="setActiveSection('editInfo')"
                >
                  Modifier mes informations
                </p>
              </div>
              <div class="flex gap-2">
                <div v-if="user && user.username">
                  <p class="text-2xl mb-3">{{ user.username }}</p>
                  <div class="flex gap-3 mb-3">
                    <p
                      class="cursor-pointer"
                      @click="isModalFollowerOpen = true"
                    >
                      {{ user.abonnes }} abonnés
                    </p>
                    <p class="cursor-pointer" @click="isModalSuiviOpen = true">
                      {{ user.suivies }} suivi(e)s
                    </p>
                  </div>
                </div>
              </div>
              <p class="text-[#8592A4] mb-3" v-if="user && user.content">
                {{ user.content }}
              </p>
            </div>
          </div>
          <Transition name="fade" mode="out-in">
            <div v-if="activeSection === 'profile'">
              <display-infos />
            </div>
            <div v-else-if="activeSection === 'editInfo'">
              <edit-infos />
            </div>
          </Transition>
        </div>
      </div>
    </main>
    <modal-follower
      v-if="isModalFollowerOpen"
      @close="isModalFollowerOpen = false"
    />
    <modal-suivi v-if="isModalSuiviOpen" @close="isModalSuiviOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import editInfos from "../components/profil/editInfos.vue";
import displayInfos from "../components/profil/displayInfos.vue";
import { updateImgProfil } from "../api/user";
import { useAuthStore } from "../stores/authStore";
import { useUser } from "../composables/useUser";
import ModalFollower from "../components/modal/modalFollower.vue";
import ModalSuivi from "../components/modal/modalSuivi.vue";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const authStore = useAuthStore();
const { getInfosProfile } = useUser();

const isModalFollowerOpen = ref(false);
const isModalSuiviOpen = ref(false);

const user = computed(() => authStore.user);

const id = sessionStorage.getItem("id");

const activeSection = ref("profile");
const imageURL = ref(null);
const selectedImageFile = ref(null);

const setActiveSection = (section) => {
  activeSection.value = section;
};

const updateImg = async (event) => {
  const file = event.target.files[0];

  if (file) {
    selectedImageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      imageURL.value = e.target.result;
    };
    reader.readAsDataURL(file);

    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("image", file);
      const editImgResponse = await updateImgProfil(formData);
      const updatedUser = editImgResponse.data.user;

      authStore.setUser(updatedUser);

      await getInfosProfile(id);
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'image :", error);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
