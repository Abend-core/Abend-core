<template>
  <div class="flex flex-col h-screen">
    <!-- permet de savoir si l'utilisateur est connecté où non à travers tout le site -->
    <!-- :isAuthenticated permet de passer la valeur de la variable isAuthenticated au Header et ainsi
      de réagir dynamiquement si l'utilisateur est connecté ou non -->
    <Header
      :isAuthenticated="isAuthenticated"
      :isAdmin="isAdmin"
      @logout="logout"
    />
    <!-- : est utilisé pour passer des données d'un composant à un autre -->
    <!-- alors que @ est utilisé pour écouter un événement émis par un composant enfant (ici, 
     logout provient de header plus précisément navbar) -->
    <div class="flex-1">
      <!-- router-view permet de rendre dynamique les composants, 
       c'est lui qui gère l'affichage selon les routes qu'on recherche  -->
      <!-- grâce à ce router-view, mon header et mon footer restent en place sur tous autres composants -->
      <router-view
        @login="login"
        :isAdmin="isAdmin"
        :isAuthenticated="isAuthenticated"
      />
    </div>
    <!-- <Footer v-if="!$route.meta.hideFooter" /> -->
  </div>
</template>

<script>
import { ref, provide } from "vue";
import Header from "../layouts/Header.vue";
import Footer from "../layouts/Footer.vue";
import Home from "../views/Home.vue";
export default {
  name: "Layout",
  components: {
    Header,
    Footer,
    Home,
  },
  setup() {
    const isAuthenticated = ref(false);
    const isAdmin = ref(false);

    const login = () => {
      isAuthenticated.value = true;
    };

    const logout = () => {
      isAuthenticated.value = false;
      isAdmin.value = false;
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("isAdmin");
    };

    //permet de récupérer la donnée isAdmin
    provide("isAdmin", isAdmin);

    if (sessionStorage.getItem("authToken") !== null) {
      isAuthenticated.value = true;
    }
    if (sessionStorage.getItem("isAdmin")) {
      isAdmin.value = JSON.parse(sessionStorage.getItem("isAdmin"));
    }

    return {
      isAuthenticated,
      isAdmin,
      login,
      logout,
    };
  },
};
</script>

<style></style>
