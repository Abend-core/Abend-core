import { defineStore } from "pinia";
import { ref } from "vue";
import { findAllModulesVisible, findAllModulesAdmin } from "../api/module";

export const useModuleStore = defineStore("moduleStore", () => {
  const modules = ref([]);
  const modulesAdmin = ref([]);

  const allModules = async () => {
    try {
      const response = await findAllModulesVisible();
      modules.value = response.data.modules;
    } catch (error) {
      console.error("Erreur lors du chargement des modules visibles :", error);
    }
  };

  const allModulesAdmin = async () => {
    try {
      const response = await findAllModulesAdmin();
      modulesAdmin.value = response.data.modules;
    } catch (error) {
      console.error("Erreur lors du chargement des modules admin :", error);
    }
  };

  return { modules, modulesAdmin, allModules, allModulesAdmin };
});
