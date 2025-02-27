<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
  >
    <div class="w-full h-screen p-3" @click.self="$emit('close')">
      <div
        class="bg-white text-black max-w-[280px] sm:max-w-[500px] mt-28 mx-auto rounded-lg border border-gray-200 dark:border-gray-700 dark:bg-gray-800"
      >
        <div class="flex items-center flex-col">
          <button
            @click="reportModule"
            :disabled="isReported"
            :class="[
              'font-medium cursor-pointer border-b border-gray-200 w-full text-center p-3 dark:border-gray-700',
              isReported
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primaryRed',
            ]"
          >
            {{ isReported ? "Déjà signalé" : "Signaler" }}
          </button>
          <button
            @click="$emit('close')"
            class="text-black dark:text-white p-3 w-full"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { toggleReport } from "../../api/report";

const props = defineProps({
  idModule: {
    type: String,
    required: true,
  },
  isReport: {
    type: Boolean,
    default: false,
  },
});

const isReported = ref(props.isReport);

const reportModule = async () => {
  if (isReported.value) return;
  try {
    await toggleReport(props.idModule);
    isReported.value = true;
  } catch (error) {
    console.error(error);
    isReported.value = false;
  }
};
</script>
