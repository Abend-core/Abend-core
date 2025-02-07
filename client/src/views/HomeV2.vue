<template>
  <div>
    <div class="relative isolate px-6 pt-14 lg:px-8">
      <div class="mx-auto z-30 max-w-2xl py-6 sm:py-32 lg:py-48">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
          <div
            class="relative rounded-full px-3 py-1 text-sm/6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20 dark:ring-gray-500 dark:ring-1 dark:ring-gray-700 hover:dark:ring-gray-200/20"
          >
            Gérez facilement tous vos liens favoris dans un seul endroit.
            <a href="#" class="font-semibold text-primaryRed"
              ><span class="absolute inset-0" aria-hidden="true"></span>En
              savoir plus <span aria-hidden="true">&rarr;</span></a
            >
          </div>
        </div>
        <div class="text-center">
          <h1
            class="text-5xl font-semibold tracking-tight text-balance text-gray-800 dark:text-gray-200 sm:text-7xl"
          >
            Créez votre propre <span class="text-primaryRed">hub</span> de liens
            <span class="text-primaryRed">favoris</span>
          </h1>
          <p
            class="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8"
          >
            Organisez et accédez rapidement à vos pages favorites grâce à des
            modules de redirection personnalisés.
          </p>

          <div class="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#"
              class="rounded-md bg-primaryRed px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs"
              >Créer mon hub</a
            >
            <a href="#" class="text-sm/6 font-semibold text-gray-400"
              >En savoir plus <span aria-hidden="true">→</span></a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="overflow-hidden bg-white dark:bg-gray-800 py-24 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
        <div class="lg:pt-4 lg:pr-8">
          <div class="lg:max-w-lg">
            <h2 class="text-base/7 font-semibold text-primaryRed">
              Explore et organise
            </h2>
            <p
              class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-gray-200 sm:text-5xl"
            >
              Gérez vos modules facilement
            </p>
            <p class="mt-6 text-lg/8 text-gray-500">
              Créez, explorez et organisez vos modules pour accéder rapidement à
              vos projets et sites préférés.
            </p>
            <dl
              class="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none"
            >
              <div class="relative pl-9">
                <dt
                  class="inline font-semibold text-gray-900 dark:text-gray-200"
                >
                  <i
                    class="ri-dashboard-fill absolute top-1 left-1 text-xl text-primaryRed"
                  ></i>
                  Hub de modules
                </dt>
                <dd class="inline text-gray-500">
                  Découvrez les modules partagés par les autres utilisateurs.
                </dd>
              </div>
              <div class="relative pl-9">
                <dt
                  class="inline font-semibold text-gray-900 dark:text-gray-200"
                >
                  <i
                    class="ri-heart-fill absolute top-1 left-1 text-xl text-primaryRed"
                  ></i>
                  Mise en favoris
                </dt>
                <dd class="inline text-gray-500">
                  Ajoutez vos modules préférés en un clic grâce à la
                  fonctionnalité de like.
                </dd>
              </div>
              <div class="relative pl-9">
                <dt
                  class="inline font-semibold text-gray-900 dark:text-gray-200"
                >
                  <i
                    class="ri-search-2-fill absolute top-1 left-1 text-xl text-primaryRed"
                  ></i>
                  Catégories et Recherche
                </dt>
                <dd class="inline text-gray-500">
                  Filtrez les modules par catégorie et trouvez ce qui vous
                  intéresse grâce à la barre de recherche.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center gap-5">
          <div
            class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] rounded-2xl relative bg-[#141A22] text-white"
            :style="{
              border: `1px solid black`,
            }"
          >
            <img
              class="absolute w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] right-3 top-3 rounded-full border-[2px] border-white p-[2px] box-border"
              src="../assets/images/abend-core-logo-dark.png"
              alt="Photo du module"
              loading="lazy"
            />
            <div class="p-3 h-full">
              <div class="flex items-center gap-2">
                <p class="text-base lg:text-xl font-bold">Le CNAM</p>
                <i
                  class="ri-verified-badge-fill text-xl lg:text-2xl text-white cursor-pointer"
                ></i>
              </div>
              <div>
                <p class="mt-4 lg:mt-6 text-sm lg:text-base">
                  Le CNAM est un établissement d’enseignement supérieur qui
                  forme les professionnels tout au long de leur carrière dans
                  différents domaines.
                </p>
              </div>
              <p class="absolute bottom-2 lg:bottom-4 text-[10px] lg:text-xs">
                Lucas
              </p>
              <i
                class="ri-heart-fill absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer text-red-500 z-10"
              ></i>
            </div>
          </div>
          <div
            class="module-card w-[300px] lg:w-[400px] h-[150px] lg:h-[200px] rounded-2xl relative bg-[#141A22] text-white"
            :style="{
              border: `1px solid black`,
            }"
          >
            <img
              class="absolute w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] right-3 top-3 rounded-full border-[2px] border-white p-[2px] box-border"
              src="../assets/images/abend-core-logo-dark.png"
              alt="Photo du module"
              loading="lazy"
            />
            <div class="p-3 h-full">
              <div class="flex items-center gap-2">
                <p class="text-base lg:text-xl font-bold">Portfolio</p>
              </div>
              <div>
                <p class="mt-4 lg:mt-6 text-sm lg:text-base">
                  Passionné par le développement, je crée des projets alliant
                  créativité et technicité. Découvrez mon travail à travers mes
                  réalisations !
                </p>
              </div>
              <p class="absolute bottom-2 lg:bottom-4 text-[10px] lg:text-xs">
                Lucas
              </p>
              <i
                class="ri-heart-fill absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer text-red-500 z-10"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-white dark:bg-gray-800 py-0 sm:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base/7 font-semibold text-primaryRed">
          Organisez vos projets
        </h2>
        <p
          class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-gray-200 sm:text-5xl lg:text-balance"
        >
          Partagez vos modules en toute simplicité
        </p>
        <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-500">
          Créez des modules personnalisés pour centraliser vos projets favoris,
          explorez les créations des autres et organisez tout avec un système de
          catégories et de recherche efficace.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
        >
          <div class="relative pl-16">
            <dt
              class="text-base/7 font-semibold text-gray-900 dark:text-gray-200"
            >
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-add-box-line text-white text-xl"></i>
              </div>
              Création et gestion de modules
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Ajoutez des modules personnalisés pour regrouper vos projets ou
              sites préférés et y accéder facilement.
            </dd>
          </div>
          <div class="relative pl-16">
            <dt
              class="text-base/7 font-semibold text-gray-900 dark:text-gray-200"
            >
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-heart-add-fill text-white text-xl"></i>
              </div>
              Système de favoris
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Likez vos modules favoris pour les retrouver facilement et suivre
              ceux qui vous intéressent le plus.
            </dd>
          </div>
          <div class="relative pl-16">
            <dt
              class="text-base/7 font-semibold text-gray-900 dark:text-gray-200"
            >
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-archive-drawer-line text-white text-xl"></i>
              </div>
              Hub de découverte
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Découvrez et explorez les modules créés par d'autres utilisateurs
              pour enrichir votre expérience.
            </dd>
          </div>
          <div class="relative pl-16">
            <dt
              class="text-base/7 font-semibold text-gray-900 dark:text-gray-200"
            >
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-search-2-line text-white text-xl"></i>
              </div>
              Recherche et filtres avancés
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Utilisez la barre de recherche et les catégories pour retrouver
              rapidement les modules qui vous intéressent.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>

  <footer class="bg-white dark:bg-gray-800">
    <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
      <div class="sm:flex sm:items-center sm:justify-between">
        <a
          href="/"
          class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
        >
          <LogoSwitch />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"
            >Abend-core</span
          >
        </a>
        <ul
          class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400"
        >
          <li>
            <a href="#" class="hover:text-primaryRed me-4 md:me-6">À propos</a>
          </li>
          <li>
            <a href="#" class="hover:text-primaryRed me-4 md:me-6"
              >Privacy Policy</a
            >
          </li>
          <li>
            <a href="#" class="hover:text-primaryRed me-4 md:me-6">Licensing</a>
          </li>
          <li>
            <a href="#" class="hover:text-primaryRed">Contact</a>
          </li>
        </ul>
      </div>
      <hr
        class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"
      />
      <div class="flex justify-between">
        <span
          class="block text-sm text-gray-500 sm:text-center dark:text-gray-400"
          >© 2025 <a href="/" class="hover:text-primaryRed">Abend-core</a>. All
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

<style scoped>
.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}
</style>
