<template>
  <div class="relative isolate px-6 pt-14 lg:px-8">
    <div class="mx-auto z-30 max-w-2xl py-0 sm:py-48 lg:py-16">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div
          class="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 dark:text-gray-400 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-500 dark:ring-1 dark:ring-gray-700 hover:dark:ring-gray-200/20"
        >
          Gérez facilement tous vos liens favoris dans un seul endroit.
          <a href="#" class="font-semibold text-primaryRed"
            ><span class="absolute inset-0" aria-hidden="true"></span>En savoir
            plus <span aria-hidden="true">&rarr;</span></a
          >
        </div>
      </div>
      <div class="text-center">
        <h1
          class="text-5xl font-semibold uppercase tracking-tighter text-balance text-gray-800 dark:text-gray-200 sm:text-7xl"
        >
          Créez votre propre
          <span class="text-primaryRed">hub</span> de liens
          <span class="text-primar yRed">favoris</span>
        </h1>
        <p
          class="mt-8 text-lg font-medium text-pretty text-gray-500 dark:text-gray-400 sm:text-xl/8"
        >
          Organisez et accédez rapidement à vos pages favorites grâce à des
          modules de redirection personnalisés.
        </p>

        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link
            class="rounded-md bg-primaryRed px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs"
            to="/registration"
          >
            Commencer la création</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.underlined-title {
  position: relative;
  display: inline-block;
}

.underlined-title:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30%;
  height: 6px;
  background-color: #f82b30;
}
</style>
