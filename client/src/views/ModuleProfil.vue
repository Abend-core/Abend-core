<template>
  <main class="p-4 mb-12">
    <div
      class="p-5 rounded-md max-w-[1400px] mx-auto bg-customWhite dark:bg-gray-800"
    >
      <div
        class="rounded-md bg-white p-3 mb-3 sm:mb-0 dark:bg-gray-800 dark:text-white"
      >
        <h1
          class="text-2xl uppercase tracking-tighter underlined-title font-bold text-gray-900 dark:text-white"
        >
          Gérer mes modules
        </h1>
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
        <div class="table-container">
          <table
            class="w-full dark:text-white dark:bg-gray-800 hidden lg:table"
          >
            <thead>
              <tr class="text-left border-b border-customWhite">
                <th class="p-3">Nom</th>
                <th class="p-3">Lien</th>
                <th class="p-3">Description</th>
                <th class="p-3">Image</th>
                <th class="p-3">Date de création</th>
                <th class="p-3">Tag(s)</th>
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
                  <div v-if="module.id === editingModuleId">
                    <input
                      v-model="module.name"
                      type="text"
                      class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
                    />
                  </div>
                  <div v-else>{{ module.name }}</div>
                </td>
                <td class="p-3">
                  <div v-if="module.id === editingModuleId">
                    <input
                      v-model="module.link"
                      type="text"
                      class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
                    />
                  </div>
                  <div v-else>{{ module.link }}</div>
                </td>
                <td class="p-3">
                  <div v-if="module.id === editingModuleId">
                    <textarea
                      v-model="module.content"
                      class="pl-3 py-2 border rounded-md w-full dark:text-white dark:bg-gray-900"
                    />
                  </div>
                  <div v-else>{{ module.content }}</div>
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
                  <div v-if="module.tags" class="flex flex-wrap gap-2">
                    <span
                      v-for="tag in module.tags.split(',')"
                      :key="tag"
                      class="px-2 py-1 bg-primaryRed text-white rounded-full text-xs"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </td>
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
                        class="bg-primaryRed px-1 py-1 rounded-md text-white"
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

          <div class="lg:hidden flex flex-col gap-4 p-4">
            <div
              v-for="module in modules"
              :key="module.id"
              class="border rounded-md p-4 dark:bg-gray-700"
            >
              <div class="flex flex-col gap-2">
                <div>
                  <p class="font-bold">Nom :</p>
                  <div v-if="module.id === editingModuleId">
                    <input
                      v-model="module.name"
                      type="text"
                      class="w-full p-2 border rounded-md dark:text-white dark:bg-gray-900"
                    />
                  </div>
                  <div v-else>{{ module.name }}</div>
                </div>
                <div>
                  <p class="font-bold">Lien :</p>
                  <div v-if="module.id === editingModuleId">
                    <input
                      v-model="module.link"
                      type="text"
                      class="w-full p-2 border rounded-md dark:text-white dark:bg-gray-900"
                    />
                  </div>
                  <div v-else>{{ module.link }}</div>
                </div>
                <div>
                  <p class="font-bold">Description :</p>
                  <div v-if="module.id === editingModuleId">
                    <textarea
                      v-model="module.content"
                      class="w-full p-2 border rounded-md dark:text-white dark:bg-gray-900"
                    />
                  </div>
                  <div v-else>{{ module.content }}</div>
                </div>
                <div>
                  <p class="font-bold">Image :</p>
                  <img
                    :src="`${apiUrl}/uploadsFile/module/${module.image}`"
                    alt="Module image"
                    class="w-[50px] h-[50px] rounded-2xl mt-2"
                  />
                </div>
                <div>
                  <p class="font-bold">Date de création :</p>
                  {{ formatDateTime(module.createdAt) }}
                </div>
                <div v-if="module.tags">
                  <strong>Tag(s) :</strong>
                  <div class="flex flex-wrap gap-2 mt-1">
                    <span
                      v-for="tag in module.tags.split(',')"
                      :key="tag"
                      class="px-2 py-1 bg-primaryRed text-white rounded-full text-xs"
                    >
                      {{ tag }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="font-bold">Visibilité :</p>
                  <label class="switch mt-2 inline-block">
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
                </div>
                <div class="flex gap-3 mt-2">
                  <div
                    v-if="module.id !== editingModuleId"
                    class="flex items-center gap-2"
                    @click="editModule(module.id)"
                  >
                    <i
                      class="ri-pencil-fill text-2xl cursor-pointer text-black dark:text-white hover:text-primaryRed transition-colors"
                    ></i>
                    <p class="text-sm text-black dark:text-white font-medium">
                      Modifier mon module
                    </p>
                  </div>
                  <div
                    v-if="module.id !== editingModuleId"
                    class="flex items-center gap-2"
                    @click="deleteModuleTable(module.id)"
                  >
                    <i
                      class="ri-delete-bin-4-fill text-2xl cursor-pointer text-black dark:text-white hover:text-red-500 transition-colors"
                    ></i>
                    <p class="text-sm text-black dark:text-white font-medium">
                      Supprimer mon module
                    </p>
                  </div>
                  <div v-if="module.id === editingModuleId">
                    <button
                      @click="saveModule(module.id)"
                      class="bg-primaryRed px-4 py-2 rounded-md text-white"
                    >
                      Valider
                    </button>
                  </div>
                  <div v-if="module.id === editingModuleId">
                    <button
                      @click="cancelEdit(module.id)"
                      class="text-sm px-4 py-2"
                    >
                      Annuler
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
const originalModule = ref(null);

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
  const moduleToEdit = modules.value.find((module) => module.id === idModule);
  originalModule.value = { ...moduleToEdit };
};

const cancelEdit = () => {
  editingModuleId.value = null;
  originalModule.value = null;
};

const saveModule = async (idModule) => {
  try {
    const moduleToSave = modules.value.find((module) => module.id === idModule);
    if (!moduleToSave || !originalModule.value) return;

    const updatedData = {};
    if (moduleToSave.name !== originalModule.value.name)
      updatedData.name = moduleToSave.name;
    if (moduleToSave.link !== originalModule.value.link)
      updatedData.link = moduleToSave.link;
    if (moduleToSave.content !== originalModule.value.content)
      updatedData.content = moduleToSave.content;

    if (updatedData.name || updatedData.link || updatedData.content) {
      await updateModuleById(idModule, updatedData);
    }

    editingModuleId.value = null;
    originalModule.value = null;
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

onMounted(() => {
  getModulesById();
});
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
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #f82b30;
}

input:focus + .slider {
  box-shadow: 0 0 1px #f82b30;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

.underlined-title {
  position: relative;
  display: inline-block;
}

.underlined-title:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30%;
  height: 6px;
  background-color: #f82b30;
}
</style>
