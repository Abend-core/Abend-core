<template>
  <div class="flex flex-col h-screen">
    <!-- permet de savoir si l'utilisateur est connecté où non à travers tout le site -->
    <!-- :isAuthenticated permet de passer la valeur de la variable isAuthenticated au Header et ainsi
      de réagir dynamiquement si l'utilisateur est connecté ou non -->
    <Header :isAuthenticated="isAuthenticated" @logout="logout" />
    <!-- : est utilisé pour passer des données d'un composant à un autre -->
    <!-- alors que @ est utilisé pour écouter un événement émis par un composant enfant (ici, 
     logout provient de header plus précisément navbar) -->
    <div class="flex-1 overflow-hidden">
      <!-- router-view permet de rendre dynamique les composants, 
       c'est lui qui gère l'affichage selon les routes qu'on recherche  -->
      <!-- grâce à ce router-view, mon header et mon footer restent en place sur tous autres composants -->
      <router-view @login="login" />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import Home from "../views/Home.vue";

export default {
  name: "Layout",
  emits: ["login", "logout"],
  components: {
    Header,
    Footer,
    Home,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
  //on utilise mounted car cela permet d'aller cherche le token une fois que le composant est monté càd  que
  // tout le dom est prêt, il faut que l'entièrement du composant soit initialisé et prêt
  mounted() {
    this.isAuthenticated = sessionStorage.getItem("authToken") !== null;
  },
  methods: {
    login() {
      this.isAuthenticated = true;
    },
    logout() {
      this.isAuthenticated = false;
    },
  },
};
</script>

<style></style>
