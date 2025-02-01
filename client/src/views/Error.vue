<template>
  <div class="flex items-center justify-center h-[60vh]">
    <div class="text-center p-6">
      <p class="text-base font-semibold text-primaryRed">404</p>
      <p
        class="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-200"
      >
        Page introuvable
      </p>
      <p class="mt-6 text-lg font-medium text-pretty text-gray-500">
        Désolé, nous n'avons pas trouvé la page que vous recherchez
      </p>
      <div class="flex items-center justify-center mt-10">
        <router-link
          class="bg-primaryRed p-paddingSm rounded-md text-white border border-black"
          to="/"
          >Retour à l'accueil</router-link
        >
      </div>
    </div>
  </div>
</template>
