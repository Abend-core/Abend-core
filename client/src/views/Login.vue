<template>
  <div>
    <p>Connexion</p>
    <form action="" class="flex flex-col" @submit.prevent="loginUser">
      <label for="login">
        Identifiant
        <input
          type="text"
          id="login"
          v-model="idLogin"
          placeholder="Identifiant"
        />
      </label>
      <label for="password">
        Mot de passe
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Mot de passe"
        />
      </label>
      <button class="w-fit" type="submit">Se connecter !</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      idLogin: "",
      password: "",
    };
  },
  emits: ["login", "logout"],
  methods: {
    loginUser() {
      const data = {
        login: this.idLogin,
        password: this.password,
      };

      fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((responseData) => {
          const token = responseData.token;
          sessionStorage.setItem("authToken", token);
          // $emit permet d'émettre un événement de l'enfant vers le parent
          this.$emit("login");
          this.$router.push("/");
        })
        .catch((error) => {
          console.error("Erreur de connexion:", error);
        });
    },
  },
};
</script>
