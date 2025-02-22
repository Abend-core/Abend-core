<template>
  <div class="flex max-w-[1400px] mx-auto">
    <main class="w-full dark:bg-gray-800 dark:text-white">
      <div class="sm:pt-8 px-6 md:px-12 lg:px-16 xl:px-20 relative z-[2]">
        <div
          class="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-8 mt-8"
        >
          <div class="relative w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56 group">
            <img
              v-if="user && user.image"
              class="absolute w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
              :src="`${apiUrl}/uploadsFile/profil/${user.image}`"
              alt="Image de profil"
            />
            <div
              class="absolute inset-0 flex items-center justify-center bg-primaryRed rounded-full bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <i class="ri-pencil-fill text-white text-2xl md:text-3xl"></i>
            </div>
            <input
              type="file"
              class="absolute w-full h-full opacity-0 cursor-pointer z-10"
              accept="image/png, image/jpeg"
              @change="updateImg"
            />
          </div>
          <div class="flex-1 text-center md:text-left">
            <div class="flex flex-col gap-4">
              <div>
                <h1
                  v-if="user && user.username"
                  class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white"
                >
                  {{ user.username }}
                </h1>
                <div class="flex gap-6 mt-2 text-gray-600 dark:text-gray-300">
                  <p
                    class="cursor-pointer hover:text-primaryRed transition-colors"
                    @click="isModalFollowerOpen = true"
                  >
                    <span class="font-semibold">{{ user.abonnes }}</span>
                    abonnés
                  </p>
                  <p
                    class="cursor-pointer hover:text-primaryRed transition-colors"
                    @click="isModalSuiviOpen = true"
                  >
                    <span class="font-semibold">{{ user.suivies }}</span>
                    suivi(e)s
                  </p>
                </div>
              </div>
              <p
                v-if="user && user.content"
                class="text-gray-500 dark:text-gray-400 italic max-w-md"
              >
                "{{ user.content }}"
              </p>
              <div class="flex gap-6 mt-4">
                <button
                  :class="{
                    'text-primaryRed border-b-2 border-primaryRed':
                      activeSection === 'profile',
                  }"
                  class="pb-1 text-lg font-medium hover:text-primaryRed transition-colors"
                  @click="setActiveSection('profile')"
                >
                  Mon profil
                </button>
                <button
                  :class="{
                    'text-primaryRed border-b-2 border-primaryRed':
                      activeSection === 'editInfo',
                  }"
                  class="pb-1 text-lg font-medium hover:text-primaryRed transition-colors"
                  @click="setActiveSection('editInfo')"
                >
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-10 px-4 md:px-0">
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
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
