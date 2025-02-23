<template>
  <TransitionGroup
    name="fade"
    tag="div"
    class="modules-container flex justify-center sm:justify-start items-center flex-wrap gap-5 sm:gap-10"
  >
    <div
      class="flex"
      v-for="(module, index) in modules"
      :key="module.id"
      :style="{ '--i': index }"
    >
      <a
        :href="module.link"
        class="module-card w-[300px] h-[150px] lg:w-[375px] lg:h-[200px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
        target="_blank"
      >
        <div class="px-4 py-3 h-full" @click="countVisit(module.id)">
          <div class="flex items-center gap-2 relative">
            <img
              class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border dark:border-gray-600"
              :src="`${apiUrl}/uploadsFile/module/${module.image}`"
              alt="Photo du module"
              loading="lazy"
            />
            <p class="text-base lg:text-xl font-bold">{{ module.name }}</p>
            <i
              v-if="module.User.isAdmin"
              class="ri-verified-badge-fill text-black text-xl lg:text-2xl dark:text-white cursor-pointer"
            ></i>
            <div v-if="authStore.isAuthenticated">
              <i
                class="ri-more-fill absolute right-2 top-0"
                @click="openModalMoreInfos($event, module.id)"
              ></i>
            </div>
          </div>
          <div>
            <p class="mt-2 lg:mt-4 text-sm lg:text-base">
              {{ module.content }}
            </p>
          </div>
        </div>
        <div
          v-if="module.tags"
          class="absolute bottom-3 left-[50%] transform -translate-x-1/2 flex gap-1 mt-2"
          @click.stop
        >
          <router-link
            v-for="tag in module.tags.split(',').map((tag) => tag.trim())"
            :key="tag"
            :to="`/modules/tag/${tag}`"
            class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-full text-xs hover:bg-gray-400 dark:hover:bg-gray-700"
          >
            {{ tag }}
          </router-link>
        </div>
        <router-link
          class="absolute bottom-2 left-4 lg:bottom-4 text-[10px] lg:text-xs hover:text-primaryRed transition-colors"
          :class="{
            underline: authStore.user && authStore.user.id === module.User.id,
          }"
          :to="`/user/${module.User.username}`"
          @click.stop
        >
          {{ module.User.username }}
        </router-link>
        <div
          v-if="
            authStore.isAuthenticated && authStore.user.id !== module.User.id
          "
          @click.stop
        >
          <i
            v-if="module.isLike"
            class="ri-heart-fill absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer text-red-500 z-10 transition-transform transform hover:scale-110"
            @click="toggleLikeModule(module.id, $event)"
          ></i>
          <i
            v-else
            class="ri-heart-line absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer z-10 transition-transform transform hover:scale-110"
            @click="toggleLikeModule(module.id, $event)"
          ></i>
        </div>
      </a>
    </div>
  </TransitionGroup>
</template>

<script setup>
import { useAuthStore } from "../stores/authStore";
import { toggleLike } from "../api/like";
import { countVisitor } from "../api/module";

const props = defineProps({
  modules: {
    type: Array,
    required: true,
  },
});

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
const authStore = useAuthStore();

const emit = defineEmits(["openModal"]);

const openModalMoreInfos = (event, idModule) => {
  event.stopPropagation();
  event.preventDefault();
  emit("openModal", idModule);
};

const toggleLikeModule = async (idModule, event) => {
  event.preventDefault();
  try {
    await toggleLike(idModule);
    const module = props.modules.find((module) => module.id === idModule);
    module.isLike = !module.isLike;
  } catch (error) {
    console.error("Erreur lors du like :", error);
  }
};

const countVisit = async (idModule) => {
  try {
    await countVisitor(idModule);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped>
.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}

.fade-enter-active {
  transition: all 0.2s ease-out;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active {
  transition-delay: calc(0.1s * var(--i));
}
</style>
