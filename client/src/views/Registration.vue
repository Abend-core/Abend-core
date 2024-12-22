<template>
  <p>Inscription</p>
  <form action="" class="flex flex-col" @submit.prevent="registration">
    <label for="name">
      Nom
      <input type="text" id="name" v-model="name" placeholder="Nom" />
    </label>
    <label for="firstName">
      Prénom
      <input
        type="text"
        id="firstname"
        v-model="firstname"
        placeholder="Prénom"
      />
    </label>
    <label for="email">
      Email
      <input type="email" id="email" v-model="email" placeholder="Email" />
    </label>
    <label for="login">
      Identifiant
      <input
        type="text"
        id="login"
        v-model="loginRegister"
        placeholder="Identifiant"
      />
    </label>
    <label for="birth">
      Date de naissance
      <input
        type="date"
        id="birth"
        v-model="birth"
        placeholder="Date de naissance"
      />
    </label>
    <label for="password">
      Mot de passe
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Mot de passe"
        minlength="8"
        required
      />
    </label>
    <button class="w-fit" type="submit">Rejoindre Abend-core !</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      firstname: "",
      email: "",
      loginRegister: "",
      birth: "",
      password: "",
    };
  },
  emits: ["login"],
  methods: {
    registration() {
      const data = {
        name: this.name,
        firstname: this.firstname,
        mail: this.email,
        login: this.loginRegister,
        birth: this.birth,
        password: this.password,
        isAdmin: false,
        isLog: false,
      };

      fetch("http://localhost:5000/inscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((responseData) => {
          this.$router.push("/connexion");
        })
        .catch((error) => {
          console.error("Erreur lors de l'inscription :", error);
        });
    },
  },
};
</script>

<style></style>
