<template>
  <div class="overflow-hidden bg-white dark:bg-gray-800 py-16">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div
        class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
      >
        <div class="lg:pt-4 lg:pr-8">
          <div class="lg:max-w-lg">
            <h2 class="text-base/7 font-semibold text-primaryRed">
              Créez et partagez
            </h2>
            <p
              class="mt-2 text-4xl font-semibold uppercase tracking-tighter text-pretty text-gray-900 dark:text-gray-200 sm:text-5xl underlined-title"
            >
              Des idées d'utilisations
            </p>
            <p class="mt-6 text-lg/8 text-gray-600 dark:text-gray-400">
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
                  Portfolio
                </dt>
                <dd class="inline text-gray-500">
                  Réunissez vos projets en un seul lien, prêt à être partagé
                  avec simplicité, et mettez-les en valeur auprès des autres
                  utilisateurs de la plateforme.
                </dd>
              </div>
              <div class="relative pl-9">
                <dt
                  class="inline font-semibold text-gray-900 dark:text-gray-200"
                >
                  <i
                    class="ri-arrow-go-forward-line absolute top-1 left-1 text-xl text-primaryRed"
                  ></i>
                  Raccourcis
                </dt>
                <dd class="inline text-gray-500">
                  Regroupez vos sites préférés pour une gestion rapide et
                  intuitive de vos accès quotidiens.
                </dd>
              </div>
              <div class="relative pl-9">
                <dt
                  class="inline font-semibold text-gray-900 dark:text-gray-200"
                >
                  <i
                    class="ri-share-line absolute top-1 left-1 text-xl text-primaryRed"
                  ></i>
                  Partage de créations
                </dt>
                <dd class="inline text-gray-500">
                  Concevez vos propres sites web, partagez vos idées et recevez
                  des visites, des likes et des retours de la communauté.
                </dd>
              </div>
              <div class="relative pl-9">
                <dt
                  class="inline font-semibold text-gray-900 dark:text-gray-200"
                >
                  <i
                    class="ri-computer-fill absolute top-1 left-1 text-xl text-primaryRed"
                  ></i>
                  Veille techonologique
                </dt>
                <dd class="inline text-gray-500">
                  Suivez vos créateurs favoris pour rester à jour sur leurs
                  contenus et découvertes.
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div class="flex flex-col items-center justify-center gap-5">
          <a
            class="module-card w-[300px] h-[190px] lg:w-[400px] lg:h-[220px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
          >
            <div class="px-4 py-3 h-full">
              <div class="flex items-center gap-2 relative">
                <img
                  v-if="!isDark"
                  class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border dark:border-gray-600"
                  src="../../assets/images/logo-abend.png"
                  alt="Photo du module"
                  loading="lazy"
                />
                <img
                  v-if="isDark"
                  class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border dark:border-gray-600"
                  src="../../assets/images/logo-abend-dark.png"
                  alt="Photo du module"
                  loading="lazy"
                />
                <p class="text-base lg:text-xl font-bold">Le CNAM</p>
                <i class="ri-more-fill absolute right-2 top-0"></i>
              </div>
              <div>
                <p class="mt-2 lg:mt-4 text-sm lg:text-base">
                  Le CNAM est un établissement d’enseignement supérieur qui
                  forme les professionnels tout au long de leur carrière dans
                  différents domaines.
                </p>
                <p
                  class="absolute bottom-2 left-4 lg:bottom-4 text-[10px] underline lg:text-xs hover:text-primaryRed transition-colors"
                >
                  John
                </p>
                <div
                  class="absolute bottom-3 left-[50%] transform -translate-x-1/2 mt-2"
                >
                  <div class="flex gap-1">
                    <p
                      class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-full text-xs hover:bg-gray-400 dark:hover:bg-gray-700"
                    >
                      cours
                    </p>
                    <p
                      class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-full text-xs hover:bg-gray-400 dark:hover:bg-gray-700"
                    >
                      cnam
                    </p>
                  </div>
                </div>
                <i
                  class="ri-heart-fill absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer text-red-500 z-10"
                ></i>
              </div>
            </div>
          </a>
          <a
            class="module-card w-[300px] h-[170px] lg:w-[400px] lg:h-[220px] shadow-md rounded-2xl relative bg-gray-50 border border-gray-200 dark:bg-[#141A22] dark:border dark:border-black text-black dark:text-white"
          >
            <div class="px-4 py-3 h-full">
              <div class="flex items-center gap-2 relative">
                <img
                  v-if="!isDark"
                  class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border dark:border-gray-600"
                  src="../../assets/images/logo-abend.png"
                  alt="Photo du module"
                  loading="lazy"
                />
                <img
                  v-if="isDark"
                  class="w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full border-[2px] border-white p-[2px] box-border dark:border-gray-600"
                  src="../../assets/images/logo-abend-dark.png"
                  alt="Photo du module"
                  loading="lazy"
                />
                <p class="text-base lg:text-xl font-bold">GitHub</p>
                <i
                  class="ri-verified-badge-fill text-black text-xl lg:text-2xl dark:text-white cursor-pointer"
                ></i>
                <i class="ri-more-fill absolute right-2 top-0"></i>
              </div>
              <div>
                <p class="mt-2 lg:mt-4 text-sm lg:text-base">
                  GitHub officiel d'Abnd.io.
                </p>
                <p
                  class="absolute bottom-2 left-4 lg:bottom-4 text-[10px] underline lg:text-xs hover:text-primaryRed transition-colors"
                >
                  Hugo
                </p>
                <div
                  class="absolute bottom-3 left-[50%] transform -translate-x-1/2 mt-2"
                >
                  <div class="flex gap-1">
                    <p
                      class="px-2 py-1 bg-gray-300 dark:bg-gray-800 text-white rounded-full text-xs hover:bg-gray-400 dark:hover:bg-gray-700"
                    >
                      dev
                    </p>
                  </div>
                </div>
                <i
                  class="ri-heart-line absolute bottom-2 lg:bottom-3 right-3 lg:right-4 text-xl lg:text-2xl cursor-pointer z-10"
                ></i>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isDark } from "../../utils/darkMode.js";
</script>

<style scoped>
.module-card {
  transition: transform 0.3s ease;
}

.module-card:hover {
  transform: translateY(-10px) scale(1.05);
}

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
