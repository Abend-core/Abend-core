<template>
  <div class="bg-white dark:bg-gray-800 py-0 lg:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl lg:text-center">
        <h2 class="text-base/7 font-semibold text-primaryRed">
          Simplifiez et connectez
        </h2>
        <p
          class="mt-2 text-4xl font-semibold tracking-tighter uppercase underlined-title text-pretty text-gray-900 dark:text-gray-200 sm:text-5xl lg:text-left"
        >
          Partagez vos modules en toute simplicité
        </p>
        <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
          Créez des modules sur mesure pour regrouper vos projets et favoris,
          découvrez les créations de la communauté, et organisez tout grâce à
          une recherche intuitive et des catégories bien pensées.
        </p>
      </div>
      <div class="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
        <dl
          class="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16"
        >
          <div class="relative pl-16">
            <dt class="text-base/7 text-gray-900 dark:text-gray-200">
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-add-box-line text-white text-xl"></i>
              </div>
              Création et gestion de modules
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Ajoutez des modules personnalisés pour centraliser vos projets ou
              sites préférés et y accéder en un clin d’œil.
            </dd>
          </div>
          <div class="relative pl-16">
            <dt class="text-base/7 text-gray-900 dark:text-gray-200">
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-heart-add-fill text-white text-xl"></i>
              </div>
              Système de favoris
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Marquez vos modules favoris d’un like pour les retrouver
              facilement et suivre ceux qui vous inspirent.
            </dd>
          </div>
          <div class="relative pl-16">
            <dt class="text-base/7 text-gray-900 dark:text-gray-200">
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-archive-drawer-line text-white text-xl"></i>
              </div>
              Hub de découverte
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Parcourez les modules partagés par d’autres utilisateurs et
              enrichissez vos idées avec leurs créations.
            </dd>
          </div>
          <div class="relative pl-16">
            <dt class="text-base/7 text-gray-900 dark:text-gray-200">
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-search-2-line text-white text-xl"></i>
              </div>
              Recherche et filtres avancés
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Trouvez rapidement ce qui vous intéresse grâce à une barre de
              recherche puissante et des filtres précis.
            </dd>
          </div>
          <div class="relative pl-16">
            <dt class="text-base/7 text-gray-900 dark:text-gray-200">
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-mail-add-fill text-white text-xl"></i>
              </div>
              Système d'abonnement
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Abonnez-vous à vos utilisateurs préférés pour suivre leurs
              contenus, les soutenir et ne rien manquer de leurs nouveautés.
            </dd>
          </div>
          <div class="relative pl-16">
            <dt class="text-base/7 text-gray-900 dark:text-gray-200">
              <div
                class="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-primaryRed"
              >
                <i class="ri-hashtag text-white text-xl"></i>
              </div>
              Tags personnalisés
            </dt>
            <dd class="mt-2 text-base/7 text-gray-600 dark:text-gray-500">
              Ajoutez des mots-clés à vos modules pour les classer et les
              connecter à des thématiques spécifiques.
            </dd>
          </div>
        </dl>
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
