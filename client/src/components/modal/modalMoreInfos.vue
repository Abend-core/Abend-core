<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    @click.self="$emit('close')"
  >
    <div class="w-full h-screen p-3">
      <div
        class="bg-white text-black max-w-[280px] sm:max-w-[500px] mt-28 mx-auto rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
      >
        <div v-if="isReported">
          <div
            class="p-3 text-sm text-center rounded-lg text-black dark:text-white bg-gradient-to-r from-[#4bb54366] to-[#4bb54366]"
          >
            Module signalé avec succès !
          </div>
        </div>
        <div class="flex items-center flex-col">
          <button
            @click="reportModule"
            class="text-primaryRed font-medium cursor-pointer border-b border-gray-200 w-full text-center p-3 dark:border-gray-700"
          >
            Signaler
          </button>
          <button
            @click="$emit('close')"
            class="text-black dark:text-white p-3"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { toggleReport } from "../../api/report";

const isReported = ref(false);
const props = defineProps({
  idModule: {
    type: String,
    required: true,
  },
});

const reportModule = async () => {
  try {
    await toggleReport(props.idModule);
    isReported.value = true;
  } catch (error) {
    console.error(error);
    isReported.value = false;
  }
};
</script>
