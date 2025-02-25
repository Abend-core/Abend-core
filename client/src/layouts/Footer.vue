<template>
  <footer class="bg-white dark:bg-gray-800">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <div class="flex">
          <a
            href="/"
            class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <LogoSwitch />
            <span
              class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
              >Abnd.io</span
            >
          </a>
        </div>
        <ul
          class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <li>
            <a href="/" class="hover:text-primaryRed me-4 md:me-6">À propos</a>
          </li>
          <li>
            <a href="/terms" class="hover:text-primaryRed me-4 md:me-6"
              >Conditions d'utilisation</a
            >
          </li>
          <li>
            <a href="/privacy" class="hover:text-primaryRed me-4 md:me-6"
              >Règlement</a
            >
          </li>
          <li>
            <a href="/contact" class="hover:text-primaryRed">Contact</a>
          </li>
        </ul>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <div class="flex justify-between">
        <span
          class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2025 <a href="/" class="hover:text-primaryRed">Abnd.io</a>. All
          Rights Reserved.</span
        >
        <a href="https://github.com/Abend-core/Abend-core" target="_blank">
          <i class="ri-github-fill text-3xl text-black dark:text-white"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import LogoSwitch from "../components/LogoSwitch.vue";
</script>
