<template>
  <main class="p-4">
    <div
      class="p-5 rounded-md max-w-[1400px] mx-auto bg-customWhite dark:bg-gray-800"
    >
      <div
        class="rounded-md bg-white p-3 mb-3 sm:mb-0 dark:bg-gray-800 dark:text-white"
      >
        <h1 class="font-bold">Gérer mes modules</h1>
        <p class="text-primaryRed mt-1">Module Dashboard</p>
      </div>
      <modal-add-module @refresh-modules="getModulesById" />
      <div v-if="modules.length === 0" class="text-center p-8 rounded-md mt-5">
        <h2 class="font-bold text-xl text-primaryRed mb-4">
          Aucun module créé
        </h2>
        <p class="mb-4 text-center font-medium text-gray-400">
          Il semble que vous n'ayez pas encore créé de module
        </p>
      </div>
      <div
        v-else
        class="bg-white dark:bg-gray-800 mt-6 rounded-md max-h-[800px] mb-5 overflow-auto"
      >
        <NotificationMessage />
        <table class="w-full dark:text-white dark:bg-gray-800">
          <thead>
            <tr class="text-left border-b border-customWhite">
              <th class="p-3">Nom</th>
              <th class="p-3">Lien</th>
              <th class="p-3">Description</th>
              <th class="p-3">Image</th>
              <th class="p-3">Date de création</th>
              <th class="p-3">Visibilité</th>
              <th class="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="module in modules"
              :key="module.id"
              class="hover:bg-customWhite dark:hover:text-black dark:hover:bg-gray-500"
            >
              <td class="p-3">
                <template v-if="module.id === editingModuleId">
                  <input
                    v-model="module.name"
                    type="text"
                    class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
                  />
                </template>
                <template v-else>{{ module.name }}</template>
              </td>
              <td class="p-3">{{ module.link }}</td>
              <td class="p-3">
                <template v-if="module.id === editingModuleId">
                  <input
                    v-model="module.content"
                    type="text"
                    class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
                  />
                </template>
                <template v-else>{{ module.content }}</template>
              </td>
              <td class="p-3">
                <img
                  :src="`${apiUrl}/uploadsFile/module/${module.image}`"
                  alt="Module image"
                  class="w-[50px] h-[50px] rounded-2xl"
                />
              </td>
              <td class="p-3">{{ formatDateTime(module.createdAt) }}</td>
              <td class="p-3">
                <label class="switch">
                  <input
                    type="checkbox"
                    :checked="module.isShow === true"
                    @change="
                      toggleVisibility(
                        module.id,
                        module.isShow === true ? false : true
                      )
                    "
                  />
                  <span class="slider round"></span>
                </label>
              </td>
              <td class="p-3">
                <div class="flex gap-3">
                  <div v-if="module.id !== editingModuleId">
                    <i
                      class="ri-pencil-fill text-2xl cursor-pointer"
                      @click="editModule(module.id)"
                    ></i>
                  </div>
                  <div v-if="module.id !== editingModuleId">
                    <i
                      class="ri-delete-bin-4-fill text-2xl cursor-pointer"
                      @click="deleteModuleTable(module.id)"
                    ></i>
                  </div>
                  <div v-if="module.id === editingModuleId">
                    <button
                      @click="saveModule(module.id)"
                      class="bg-primaryRed px-6 py-2 rounded-md text-white border border-black"
                    >
                      Valider
                    </button>
                  </div>
                  <div
                    class="flex items-center"
                    v-if="module.id === editingModuleId"
                  >
                    <button @click="cancelEdit(module.id)" class="text-sm">
                      Annuler
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { getModuleById, updateModuleById } from "../api/module";
import { formatDateTime } from "../utils/date";
import { deleteModule } from "../api/module";
import ModalAddModule from "../components/modal/modalAddModule.vue";
import { useNotificationStore } from "../stores/notificationStore.js";
import NotificationMessage from "../components/notification/NotificationMessage.vue";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const { setNotification } = useNotificationStore();

const modules = ref([]);
const editingModuleId = ref(null);

const getModulesById = async () => {
  try {
    const response = await getModuleById();
    modules.value = response.data.modules || [];
  } catch (error) {
    setNotification(error.response?.data?.message, "error");
  }
};

const deleteModuleTable = async (idModule) => {
  try {
    await deleteModule(idModule);
    await getModulesById();
  } catch (error) {
    console.error("Erreur lors de la suppression du module :", error);
  }
};

const editModule = (idModule) => {
  editingModuleId.value = idModule;
};

const cancelEdit = (idModule) => {
  editingModuleId.value = null;
};

const saveModule = async (idModule) => {
  try {
    const moduleToSave = modules.value.find((module) => module.id === idModule);
    await updateModuleById(idModule, moduleToSave);
    editingModuleId.value = null;
    await getModulesById();
  } catch (error) {
    console.error("Erreur lors de la sauvegarde du module", error);
  }
};

const toggleVisibility = async (idModule, data) => {
  try {
    await updateModuleById(idModule, { isShow: data });
  } catch (error) {
    setNotification(error.response?.data?.message, "error");
  }
};

getModulesById();
</script>

<style scoped>
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #f82b30;
}

input:focus + .slider {
  box-shadow: 0 0 1px #f82b30;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
