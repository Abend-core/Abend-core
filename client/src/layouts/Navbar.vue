<template>
  <nav class="flex items-center p-[20px]">
    <div class="left-content flex items-center gap-[10px]">
      <RouterLink to="/">
        <img
          class="w-[50px] h-[50px]"
          src="../assets/images/abend-core-logo.png"
          alt="Main Icon"
        />
      </RouterLink>
      <RouterLink to="/">Abend-core</RouterLink>
    </div>
    <div class="right-content flex items-center flex-1 justify-end gap-[20px]">
      <img
        class="w-[20px] h-[20px]"
        src="../assets/images/à-modifier-soleil.png"
        alt="Mode Clair"
      />
      <img
        class="w-[20px] h-[20px]"
        src="../assets/images/à-modifier-lune.png"
        alt="Mode Sombre"
      />
      <RouterLink to="/connexion" v-if="!isAuthenticated">Login</RouterLink>
      <RouterLink to="/inscription" v-if="!isAuthenticated"
        >Inscription</RouterLink
      >
      <button v-if="isAuthenticated" @click="logOut">Déconnexion</button>
    </div>
  </nav>
</template>

<script>
export default {
  emits: ["login", "logout"],
  // ces props permettent de recevoir la valeur de l'authentification de son parent Layout.vue
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    logOut() {
      sessionStorage.removeItem("authToken");
      this.$emit("logout");
    },
  },
};
</script>
