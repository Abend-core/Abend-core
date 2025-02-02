<template>
  <div
    class="flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row items-center gap-5 mb-4"
  >
    <div class="relative">
      <input
        class="pl-10 py-2 border rounded-md w-[300px] dark:text-white dark:bg-gray-900"
        type="text"
        placeholder="Rechercher..."
        v-model="inputValueSearchBarModule"
        @change="filterSearchModule"
      />
      <span class="absolute left-3 top-1/2 transform -translate-y-1/2">
        <i class="ri-search-line text-xl text-customlightGray"></i>
      </span>
    </div>
    <div class="flex gap-3">
      <p class="text-customGray dark:text-gray-400">
        {{ countModule }} selected
      </p>
    </div>
    <i
      class="ri-delete-bin-4-fill text-3xl text-customlightGray cursor-pointer"
      @click="deleteModuleTable"
    ></i>
  </div>
  <modal-add-module @refresh-modules="allModules" />
  <div
    class="bg-white rounded-md max-h-[800px] overflow-auto mb-5 dark:bg-gray-800 dark:text-white"
  >
    <table class="w-full">
      <thead>
        <tr class="text-left border-b border-customWhite">
          <th class="p-3">
            <input
              id="checkbox-dashboard-table-allUsers"
              name="checkbox_dashboard_table_allUsers"
              type="checkbox"
              class="select-users cursor-pointer"
            />
          </th>
          <th class="p-3">Nom</th>
          <th class="p-3">Lien</th>
          <th class="p-3">Description</th>
          <th class="p-3">Image</th>
          <th class="p-3">Date de création</th>
          <th class="p-3">Visibilité</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="module in modules"
          :key="module.id"
          class="hover:bg-customWhite dark:hover:text-black dark:hover:bg-gray-500"
        >
          <td class="p-3">
            <input
              id="checkbox-dashboard-table-oneUser"
              name="checkbox_dashboard_table_oneUser"
              type="checkbox"
              class="cursor-pointer"
              @change="updateUserCountModule"
              @click="selectAllModules"
              :value="module.id"
            />
          </td>
          <td class="p-3">{{ module.name }}</td>
          <td class="p-3">{{ module.link }}</td>
          <td class="p-3">{{ module.content }}</td>
          <td class="p-3">
            <img
              :src="`${apiUrl}/uploadsFile/module/${module.image}`"
              alt="Module image"
              class="w-[50px] h-[50px] rounded-2xl"
              loading="lazy"
            />
          </td>
          <td class="p-3">{{ formatDateTime(module.createdAt) }}</td>
          <td class="p-3">
            <label class="switch">
              <input
                type="checkbox"
                v-model="module.isShow"
                @change="toggleVisibility(module.id, module.isShow)"
              />
              <span class="slider round"></span>
            </label>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { formatDateTime } from "../../utils/date";
import {
  findAllModules,
  deleteModule,
  filterModule,
  updateModuleById,
} from "../../api/module";
import modalAddModule from "../../components/modal/modalAddModule.vue";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const modules = ref([]);
let countModule = ref(0);
let idModules = [];
const inputValueSearchBarModule = ref("");

const allModules = async () => {
  try {
    const response = await findAllModules();
    modules.value = response.data.module;
  } catch (error) {
    console.error(error);
  }
};

const updateUserCountModule = (event) => {
  countModule.value += event.target.checked ? 1 : -1;
};

const selectAllModules = (event) => {
  const idModule = event.target.value;
  const checked = event.target.checked;
  if (checked) {
    idModules.push(idModule);
  } else {
    for (let i = 0; i < idModules.length; i++) {
      if (idModules[i] === idModule) {
        idModules.splice(i, 1);
      }
    }
  }
};

const deleteModuleTable = async () => {
  for (let i = 0; i < idModules.length; i++) {
    try {
      await deleteModule(idModules[i]);
    } catch (error) {
      console.error(error);
    }
  }
  countModule.value = 0;
  idModules = [];
  allModules();
};

const filterSearchModule = async () => {
  modules.value = [];
  try {
    const response = await filterModule({
      search: inputValueSearchBarModule.value,
    });
    if (response && response.data.module) {
      idModules = [];
      countModule.value = 0;
      modules.value = response.data.module;
    }
  } catch (error) {
    console.error(error);
  }
};

watch(inputValueSearchBarModule, () => {
  filterSearchModule();
});

const toggleVisibility = async (idModule, data) => {
  try {
    const response = await updateModuleById(idModule, {
      isShow: data,
    });
  } catch (error) {
    console.error(error);
  }
};

allModules();
</script>

<style scoped>
li {
  list-style-type: none;
}
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
