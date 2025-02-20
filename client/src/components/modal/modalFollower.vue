<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 h-screen"
  >
    <div class="w-full h-screen p-4">
      <div
        class="dark:bg-gray-800 bg-white rounded-lg border border-gray-200 dark:border-gray-700 sm:w-96 relative max-w-[700px] mx-auto mt-[100px] sm:mt-[120px]"
      >
        <div
          class="flex items-center gap-3 p-3 relative border-b dark:border-gray-700 border-gray-200"
        >
          <i class="ri-search-2-line text-xl text-gray-500"></i>
          <input
            ref="searchInput"
            placeholder="Rechercher"
            class="w-full bg-inherit focus:outline-none placeholder:font-medium text-gray-400"
            type="text"
            v-model="inputValueModalFollower"
          />
          <p
            @click="closeModal"
            class="block text-customdarkGray font-bold absolute right-4 top-2 cursor-pointer"
          >
            &times;
          </p>
        </div>
        <div
          class="p-4 dark:bg-gray-800 rounded-lg max-h-[400px] overflow-y-auto"
        >
          <div v-if="filteredFollowers.length === 0">
            <p
              v-if="inputValueModalFollower.trim().length === 0"
              class="text-center font-medium text-gray-400"
            >
              Aucun abonné
            </p>
            <p v-else class="text-center font-medium text-gray-400">
              Aucun résultat pour "<span class="font-bold">{{
                inputValueModalFollower
              }}</span
              >"
            </p>
          </div>
          <a
            class="flex gap-2 items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg group cursor-pointer shadow-sm"
            v-for="follower in filteredFollowers"
            :key="follower.id"
          >
            <img
              class="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-800"
              :src="`${apiUrl}/uploadsFile/profil/${follower.image}`"
              alt="Profile Image"
            />
            <p v-html="highlightText(follower.username)"></p>
            <i
              class="ri-arrow-right-line absolute right-6 text-gray-400 dark:text-gray-300 transition-transform duration-200 ease-in-out group-hover:translate-x-1"
            ></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { displayNetwork } from "../../api/user.js";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const emit = defineEmits(["close"]);

const followers = ref([]);
const inputValueModalFollower = ref("");

const closeModal = () => {
  emit("close");
};

const displayAbonnes = async () => {
  try {
    const response = await displayNetwork();
    followers.value = response.data.network.followers;
  } catch (error) {
    console.error(error);
  }
};

const filteredFollowers = computed(() => {
  const searchTerm = inputValueModalFollower.value.trim().toLowerCase();
  if (!searchTerm) return followers.value;
  return followers.value.filter((follower) =>
    follower.username.toLowerCase().includes(searchTerm)
  );
});

const highlightText = (text) => {
  const searchTerm = inputValueModalFollower.value.trim();
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(
    regex,
    `<span class='text-primaryRed underline'>$1</span>`
  );
};

onMounted(() => {
  displayAbonnes();
});
</script>

<style scoped>
.scrollbar-custom::-webkit-scrollbar {
  width: 8px;
}
.scrollbar-custom::-webkit-scrollbar-thumb {
  background-color: #d9dce1;
  border-radius: 10px;
}
.scrollbar-custom::-webkit-scrollbar-track {
  background-color: #2d3748;
  border-radius: 10px;
}
.scrollbar-custom::-webkit-scrollbar-thumb:hover {
  background-color: #d9dce1;
}
</style>
