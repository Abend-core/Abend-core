<template>
  <div class="bg-white dark:bg-gray-800 py-12 lg:py-32">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="grid gap-12 lg:grid-cols-2 lg:gap-20">
        <div class="max-w-xl">
          <h2
            class="text-3xl font-semibold tracking-tighter uppercase underlined-title text-pretty text-gray-900 dark:text-white sm:text-4xl"
          >
            Découvrez notre équipe de passionnés
          </h2>
          <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
            Nous sommes des étudiants développeurs au CNAM, animés par la
            curiosité et l’envie de coder des solutions innovantes qui
            simplifient la vie.
          </p>
        </div>
        <ul role="list" class="grid gap-y-12">
          <li class="pb-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-start gap-x-6">
              <img
                class="size-20 rounded-full sm:size-28"
                src="../../assets/images/home/hugo_photo.png"
                alt="Photo de Hugo Lagouardat"
              />
              <div>
                <h3
                  class="text-lg/7 font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  Hugo Lagouardat
                </h3>
                <p class="text-base/6 font-semibold text-red-600">
                  Développeur & Co-fondateur
                </p>
                <p class="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  Amoureux du code et des nouvelles technos, Hugo transforme ses
                  idées en projets concrets avec une énergie débordante.
                </p>
              </div>
            </div>
          </li>
          <li class="pb-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-start gap-x-6">
              <img
                class="size-20 rounded-full sm:size-28"
                src="../../assets/images/home/lucas_photo.png"
                alt="Photo de Lucas Rolland"
              />
              <div>
                <h3
                  class="text-lg/7 font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  Lucas Rolland
                </h3>
                <p class="text-base/6 font-semibold text-red-600">
                  Développeur & Co-fondateur
                </p>
                <p class="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  Lucas allie créativité et rigueur pour concevoir des outils
                  qui repoussent les limites du possible.
                </p>
              </div>
            </div>
          </li>
          <li class="pb-6 border-b border-gray-200 dark:border-gray-700">
            <div class="flex items-start gap-x-6">
              <img
                class="size-20 rounded-full sm:size-28"
                src="../../assets/images/home/rudy_photo.png"
                alt="Photo de Rudy Alves"
              />
              <div>
                <h3
                  class="text-lg/7 font-semibold tracking-tight text-gray-900 dark:text-white"
                >
                  Rudy Alves
                </h3>
                <p class="text-base/6 font-semibold text-red-600">
                  Développeur & Co-fondateur
                </p>
                <p class="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">
                  Passionné par les défis techniques, Rudy excelle à coder des
                  solutions élégantes et efficaces.
                </p>
              </div>
            </div>
          </li>
        </ul>
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
