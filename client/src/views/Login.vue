<template>
  <main>
    <div class="m-auto w-[320px] mt-[80px]">
      <img
        class="w-[56px] h-[56px] mx-auto mb-[12px]"
        src="../assets/images/abend-core-logo.png"
      />
      <div>
        <h1 class="text-2xl text-center mb-[10px]">
          Se connecter à Abend-core
        </h1>
      </div>
      <div class="pl-[16px] pr-[16px] pt-[8px]">
        <div
          v-if="errorMessage"
          class="text-white rounded-[6px] p-4 bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]"
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
            <div class="text-[14px] text-[#1f2328] dark:text-white">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
      <div class="p-[16px]">
        <form action="" class="flex flex-col" @submit.prevent="loginUser">
          <label class="mb-[4px]" for="mail">Email</label>
          <input
            type="text"
            id="mail"
            v-model="mail"
            class="mb-[8px] bg-white text-black dark:text-white dark:bg-gray-900"
            required
          />
          <div class="position-relative relative">
            <label class="mb-[4px]" for="password"> Mot de passe </label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="mb-[16px] bg-white text-black dark:text-white dark:bg-gray-900"
              required
            />
            <router-link
              class="absolute text-[12px] underline top-0 right-0"
              id="forgot-password"
              to="/forgetPassword"
              >Mot de passe oublié ?
            </router-link>
            <button
              class="w-full bg-[#4b9945] text-white font-bold border border-black"
              type="submit"
            >
              Se connecter
            </button>
          </div>
        </form>
        <div class="text-[14px] mt-[16px]">
          <p>
            Nouveau sur Abend-core?
            <router-link class="underline" to="/inscription"
              >Créer un compte</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { loginUser, getUserInfos } from "../api/auth";
import { storeSessionData, getSessionData } from "../utils/session";

export default {
  data() {
    return {
      mail: "",
      password: "",
      errorMessage: "",
    };
  },
  emits: ["login", "logout"],
  inject: ["isAdmin"],
  methods: {
    loginUser() {
      const data = {
        mail: this.mail,
        password: this.password,
      };
      loginUser(data)
        .then((response) => {
          console.log(response);
          const { token, UUID: id } = response.data;
          storeSessionData(token, id);
          this.$emit("login");
          this.userInfos(id);
          this.$router.push("/");
        })
        .catch((error) => {
          this.errorMessage = error.response?.data?.message || error.message;
          this.mail = "";
          this.password = "";
        });
    },
    userInfos() {
      const { id } = getSessionData();
      getUserInfos(id)
        .then((response) => {
          const isAdmin = response.data.user.isAdmin;
          sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
          this.isAdmin = isAdmin;
        })
        .catch((error) => {
          console.error(error.response?.data || error.message);
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
