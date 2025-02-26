<template>
  <div class="isolate bg-white dark:bg-gray-800 px-6 py-12 sm:py-20 lg:px-8">
    <div class="mx-auto max-w-2xl text-left">
      <h2
        class="text-4xl font-bold tracking-tighter uppercase text-gray-900 dark:text-white sm:text-5xl underlined-title mb-8"
      >
        Règlement du site
      </h2>
      <p class="text-xl text-gray-600 dark:text-gray-300 mb-6">
        Ces règles définissent les obligations pratiques que les utilisateurs
        doivent respecter sur la plateforme.
      </p>
      <ol class="space-y-6 text-gray-800 dark:text-gray-200 list-decimal ml-6">
        <li>
          <span class="font-semibold text-gray-900 dark:text-white"
            >Inscription et gestion des comptes</span
          >
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>
              Inscription : Une adresse e-mail valide est requise pour créer un
              compte.
            </li>
            <li>
              Âge minimum : Accessible dès 13 ans, avec accord parental pour les
              mineurs.
            </li>
            <li>
              Suppression : Vous pouvez supprimer votre compte à tout moment via
              les paramètres.
            </li>
          </ul>
        </li>
        <li>
          <span class="font-semibold text-gray-900 dark:text-white"
            >Fonctionnement des modules et redirection de liens</span
          >
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>
              Liens sécurisés : Seuls les liens en "https://" sont autorisés.
            </li>
            <li>
              Visibilité : Les modules peuvent être publics (visibles par tous)
              ou privés (restreints).
            </li>
            <li>Tags : Maximum 3 tags pertinents par module.</li>
            <li>
              Contenu interdit : Pas de liens vers des sites malveillants,
              pornographiques, incitant à la haine, ou illégaux.
            </li>
          </ul>
        </li>
        <li>
          <span class="font-semibold text-gray-900 dark:text-white"
            >Système de signalement et modération</span
          >
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>
              Signalement : Tout utilisateur peut signaler un module enfreignant
              les règles.
            </li>
            <li>
              Archivage temporaire : Un module signalé peut être masqué en
              attendant une vérification.
            </li>
            <li>
              Sanctions : Violation répétée peut entraîner un bannissement
              temporaire ou définitif.
            </li>
          </ul>
        </li>
        <li>
          <span class="font-semibold text-gray-900 dark:text-white"
            >Règles sur les pseudonymes, noms, tags et descriptions</span
          >
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>
              Contenu : Pas de pseudonymes, noms, tags ou descriptions
              offensants, discriminatoires ou publicitaires.
            </li>
            <li>Tags : Doivent être pertinents et limités à 3 par module.</li>
          </ul>
        </li>
        <li>
          <span class="font-semibold text-gray-900 dark:text-white"
            >Système de "follow"</span
          >
          <ul class="list-disc ml-6 mt-2 space-y-1">
            <li>Suivi : Optionnel, modifiable dans les paramètres.</li>
            <li>
              Harcèlement : Toute pression ou harcèlement pour obtenir un suivi
              est interdit.
            </li>
          </ul>
        </li>
        <li>
          <span class="font-semibold text-gray-900 dark:text-white"
            >Comportement des utilisateurs</span
          >
          <p class="mt-2">
            Interdiction d’utiliser la plateforme de manière abusive (ex. :
            création massive de modules inutiles, harcèlement d’autres
            utilisateurs).
          </p>
        </li>
        <li>
          <span class="font-semibold text-gray-900 dark:text-white"
            >Clause sur les bots</span
          >
          <p class="mt-2">
            L’utilisation de bots ou scripts automatisés est interdite, sauf
            autorisation explicite des administrateurs.
          </p>
        </li>
      </ol>
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
