<template>
  <main>
    <div class="auth-form m-auto w-[320px] mt-[80px]">
      <img
        class="w-[56px] h-[56px] mx-auto mb-[12px]"
        src="../assets/images/abend-core-logo.png"
      />
      <div class="auth-form-header">
        <h1 class="text-2xl text-center">Se connecter à Abend-core</h1>
      </div>
      <div class="auth-form-error bg-[#7A2E2E] text-white rounded-[6px]">
        <div>
          <svg
            aria-hidden="true"
            height="16"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            class=""
          >
            <path
              d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
            ></path>
          </svg>
          <div class="whitespace-nowrap text-[14px]">
            Identifiant ou mot de passe incorrect.
          </div>
        </div>
      </div>
      <div class="auth-form-body mt-3 p-[16px]">
        <form action="" class="flex flex-col" @submit.prevent="loginUser">
          <label class="mb-[4px]" for="login"> Identifiant </label>
          <input
            type="text"
            id="login"
            v-model="idLogin"
            class="mb-[8px] bg-[#293f63] text-white"
          />
          <label class="mb-[4px]" for="password"> Mot de passe </label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="mb-[16px] bg-[#293f63] text-white"
          />
          <button
            class="block w-full bg-[#7A2E2E] text-white font-bold"
            type="submit"
          >
            Se connecter
          </button>
          <a
            class="absolute text-[12px] underline left-[51%] top-[369px]"
            id="forgot-password"
            href=""
            >Mot de passe oublié ?
          </a>
        </form>
      </div>
    </div>
  </main>
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

<style scoped>
label,
input {
  display: block;
}

input,
button {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 6px;
}
.auth-form-error {
  padding: 10px 16px;
}
div {
  display: block;
}
</style>
