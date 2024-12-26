<template>
  <main>
    <div class="auth-form m-auto w-[320px] mt-[80px]">
      <img
        class="w-[56px] h-[56px] mx-auto mb-[12px]"
        src="../assets/images/abend-core-logo.png"
      />
      <div class="auth-form-header">
        <h1 class="text-2xl text-center mb-[10px]">
          Se connecter à Abend-core
        </h1>
      </div>
      <div class="pl-[16px] pr-[16px] pt-[8px]">
        <div
          v-if="errorMessage"
          class="auth-form-error text-white rounded-[6px] p-4 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
        >
          <div>
            <svg
              aria-hidden="true"
              height="16"
              viewBox="0 0 16 16"
              version="1.1"
              width="16"
              class="float-right cursor-pointer"
              fill="#c2040466"
              @click="closeError"
            >
              <path
                d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
              ></path>
            </svg>
            <div class="text-[14px] text-[#1f2328]">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
      <div class="auth-form-body p-[16px]">
        <form action="" class="flex flex-col" @submit.prevent="loginUser">
          <label class="mb-[4px]" for="login"> Identifiant</label>
          <input
            type="text"
            id="login"
            v-model="idLogin"
            class="mb-[8px] bg-white text-black"
          />
          <div class="position-relative relative">
            <label class="mb-[4px]" for="password"> Mot de passe </label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mb-[16px] bg-white text-black"
            />
            <a
              class="absolute text-[12px] underline top-0 right-0"
              id="forgot-password"
              href=""
              >Mot de passe oublié ?
            </a>
            <button
              class="w-full bg-[#4b9945] text-white font-bold border border-black"
              type="submit"
            >
              Se connecter
            </button>
          </div>
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
      errorMessage: "",
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
          this.idLogin = "";
          this.password = "";
          this.errorMessage = "Identifiant ou mot de passe incorrect.";
        });
    },
    closeError() {
      this.errorMessage = "";
    },
  },
};
</script>

<style scoped>
label,
input {
  display: block;
  width: 100%;
}

input {
  border: 1px solid #d1d9e0;
}

input,
button {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 6px;
}
</style>
