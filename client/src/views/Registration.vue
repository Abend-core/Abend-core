<template>
  <main>
    <div class="m-auto w-[360px] mt-[80px]">
      <img
        class="w-[56px] h-[56px] mx-auto mb-[12px]"
        src="../assets/images/abend-core-logo.png"
        alt="Abend-core Logo"
      />
      <div>
        <h1 class="text-2xl text-center mb-[10px]">S'inscrire à Abend-core</h1>
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
            <div class="text-[14px] text-[#1f2328]">
              {{ errorMessage }}
            </div>
          </div>
        </div>
      </div>
      <div class="p-[16px]">
        <form class="flex flex-col" @submit.prevent="registration">
          <label for="name"> Nom </label>
          <input type="text" id="name" v-model="name" required />
          <label for="firstname"> Prénom </label>
          <input type="text" id="firstname" v-model="firstname" required />
          <label for="email"> Email </label>
          <input type="email" id="email" v-model="email" required />
          <label for="birth"> Date de naissance </label>
          <input type="date" id="birth" v-model="birth" required />
          <label for="login"> Identifiant </label>
          <input type="text" id="login" v-model="loginRegister" required />
          <label for="password"> Mot de passe </label>
          <input
            type="password"
            id="password"
            class="input-password mb-[18px]"
            v-model="password"
            minlength="8"
            required
          />
          <button
            class="w-full bg-[#4b9945] text-white font-bold border border-black"
            type="submit"
          >
            Rejoindre Abend-core !
          </button>
        </form>
        <div class="text-[14px] mt-[16px]">
          <p>
            Déjà inscrit?
            <router-link class="underline" to="/connexion"
              >Se connecter</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registrateUser } from "../api/auth";

defineEmits(["login"]);

const name = ref("");
const firstname = ref("");
const email = ref("");
const loginRegister = ref("");
const birth = ref("");
const password = ref("");
const errorMessage = ref("");

const router = useRouter();

const registration = async () => {
  const data = {
    name: name.value,
    firstname: firstname.value,
    mail: email.value,
    login: loginRegister.value,
    birth: birth.value,
    password: password.value,
    isAdmin: false,
    isLog: false,
  };

  try {
    await registrateUser(data);
    router.push("/connexion");
  } catch (error) {
    errorMessage.value =
      error.response?.data?.errors[0] || "Erreur lors de l'inscription.";
  }
};

const closeError = () => {
  errorMessage.value = "";
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

label {
  margin-bottom: 4px;
}

input:not(.input-password) {
  margin-bottom: 6px;
}

input,
button {
  padding: 5px 12px;
  font-size: 14px;
  border-radius: 6px;
}
</style>
