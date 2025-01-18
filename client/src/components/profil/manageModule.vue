<template>
  <div>
    <p class="text-center">Gérer ses modules</p>
  </div>
  <div class="bg-white p-6 rounded-md max-h-[800px] overflow-auto mb-5">
    <div
      v-if="errorMessage"
      class="text-white rounded-[6px] p-4 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
    >
      <div>
        <div class="text-[14px] text-[#1f2328]">
          {{ errorMessage }}
        </div>
      </div>
    </div>
    <table v-if="modules.length > 0" class="w-full">
      <thead>
        <tr class="text-left border-b border-[#F4F6FA]">
          <th class="p-3">Nom</th>
          <th class="p-3">Lien</th>
          <th class="p-3">Couleur</th>
          <th class="p-3">Image</th>
          <th class="p-3">Date de création</th>
          <th class="p-3">Visibilité</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="module in modules"
          :key="module.id"
          class="hover:bg-[#F4F6FA]"
        >
          <td class="p-3">{{ module.name }}</td>
          <td class="p-3">{{ module.link }}</td>
          <td class="p-3">
            <p
              class="w-fit p-1 rounded-2xl"
              :style="{ backgroundColor: `${module.color}` }"
            >
              {{ module.color }}
            </p>
          </td>
          <td class="p-3">
            <img
              :src="`http://localhost:5000/uploadsFile/module/${module.image}`"
              alt="Module image"
              class="w-[50px] h-[50px] rounded-2xl"
            />
          </td>
          <td class="p-3">{{ formatDateTime(module.createdAt) }}</td>
          <td class="p-3">{{ module.isShow }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { getModuleById } from "../../api/module";
import { formatDateTime } from "../../utils/date";

const id = sessionStorage.getItem("id");
const modules = ref([]);
let errorMessage = ref("");

const getModulesById = async () => {
  try {
    const response = await getModuleById(id);
    if (response.data.modules.length === 0) {
      errorMessage.value = "Vous n'avez pas encore créé de module.";
      modules.value = [];
    } else {
      modules.value = response.data.modules;
    }
  } catch (error) {
    errorMessage.value =
      "Une erreur s'est produite lors de la récupération des modules.";
    console.error(error);
  }
};

getModulesById();
</script>
