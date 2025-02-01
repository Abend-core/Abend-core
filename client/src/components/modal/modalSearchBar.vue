<template>
  <div
    class="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="w-full h-screen">
      <div
        class="bg-white rounded-lg p-6 shadow-md max-w-[700px] dark:bg-gray-800 dark:text-white mt-[120px] mx-auto mb-0"
      >
        <h2 class="text-lg font-bold mb-4">Rechercher</h2>
        <div @click="$emit('close')" class="cursor-pointer">
          <p class="text-2xl">&times;</p>
        </div>
      </div>
    </div>
  </div>
</template>
