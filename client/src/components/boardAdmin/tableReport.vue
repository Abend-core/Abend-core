<template>
  <div
    class="bg-white rounded-md mt-6 max-h-[800px] overflow-auto mb-5 dark:bg-gray-800 dark:text-white"
  >
    <table class="w-full">
      <thead>
        <tr class="text-left border-b border-customWhite">
          <th class="p-3">Nom</th>
          <th class="p-3">Lien</th>
          <th class="p-3">Description</th>
          <th class="p-3">Image</th>
          <th class="p-3">Date de création</th>
          <th class="p-3">Visibilité</th>
          <th class="p-3">Suppression</th>
          <th class="p-3">Vues</th>
          <th class="p-3">Likes</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="module in modulesReported"
          :key="module.id"
          class="hover:bg-customWhite dark:hover:text-black dark:hover:bg-gray-500"
        >
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
            <i
              class="ri-delete-bin-6-fill text-xl cursor-pointer"
              @click="deleteModuleTableReported(module.id)"
            ></i>
          </td>
          <td class="p-3">
            {{ module.views }}
          </td>
          <td class="p-3">
            {{ module.likes }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { displayReportedModules } from "../../api/report";
import { updateModuleById, deleteModule } from "../../api/module";
import { formatDateTime } from "../../utils/date";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

let modulesReported = ref([]);
const allReports = async () => {
  try {
    const response = await displayReportedModules();
    modulesReported.value = response.data.modules;
  } catch (error) {
    console.error(error);
  }
};

const toggleVisibility = async (idModule, isShow) => {
  try {
    await updateModuleById(idModule, { isShow });
  } catch (error) {
    console.error(error);
  }
};

const deleteModuleTableReported = async (idModule) => {
  try {
    await deleteModule(idModule);
    allReports();
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  allReports();
});
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
