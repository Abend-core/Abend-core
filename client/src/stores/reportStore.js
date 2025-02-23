import { defineStore } from "pinia";
import { ref } from "vue";

export const useReportStore = defineStore("reportStore", () => {
  const etatReport = ref({});

  const toggleReport = async (idModule) => {
    etatReport.value[idModule] = !etatReport.value[idModule];
  };

  const setEtatReport = (modules) => {
    modules.forEach((module) => {
      etatReport.value[module.id] = module.report === true;
    });
  };

  return { etatReport, toggleReport, setEtatReport };
});
