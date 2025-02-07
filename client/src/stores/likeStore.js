import { defineStore } from "pinia";
import { ref } from "vue";

export const useLikeStore = defineStore("likeStore", () => {
  const etatLike = ref({});

  const toggleLike = async (idModule) => {
    etatLike.value[idModule] = !etatLike.value[idModule];
  };

  const setEtatLike = (modules) => {
    modules.forEach((module) => {
      etatLike.value[module.id] = module.favoris === true;
    });
  };

  return { etatLike, toggleLike, setEtatLike };
});
