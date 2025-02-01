<template>
  <div
    class="fixed inset-0 flex items-start justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="w-full h-screen p-6">
      <div
        class="bg-white rounded-lg shadow-md max-w-[700px] border border-gray-700 dark:bg-gray-800 dark:text-white mt-[120px] mx-auto mb-0"
      >
        <div
          class="flex items-center gap-3 p-3 relative border-b border-gray-700"
        >
          <i class="ri-search-2-line text-xl text-gray-500"></i>
          <input
            placeholder="Rechercher"
            class="w-full h-[50px] bg-inherit focus:outline-none placeholder:font-medium text-[#C2C5CB]"
            type="text"
          />
          <div
            @click="$emit('close')"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 border border-gray-700 rounded-md p-1 cursor-pointer"
          >
            <kbd
              class="block text-customdarkGray tracking-tighter text-sm font-bold"
              >esc</kbd
            >
          </div>
        </div>
        <div class="p-3">
          <p class="text-[#C2C5CB]">Recherche</p>
        </div>
      </div>
    </div>
  </div>
</template>
