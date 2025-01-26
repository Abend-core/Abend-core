<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div
      class="bg-white rounded-lg p-6 shadow-md w-[410px] dark:bg-gray-800 dark:text-white"
    >
      <h2 class="text-[18px] font-bold mb-4">Confirmer la suppression</h2>
      <p class="mb-6">
        Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
        irréversible.
      </p>
      <div class="flex justify-end gap-3">
        <button
          class="bg-gray-300 p-2 rounded-md dark:bg-gray-600"
          @click="$emit('close-modal')"
        >
          Annuler
        </button>
        <button
          class="bg-[#F82B30] text-white p-2 rounded-md"
          @click="$emit('confirm-delete')"
        >
          Confirmer
        </button>
      </div>
    </div>
  </div>
</template>
