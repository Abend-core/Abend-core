<template>
  <main>
    <div class="m-auto w-[320px] mt-[80px]">
      <img
        class="w-[56px] h-[56px] mx-auto mb-[12px]"
        src="../assets/images/abend-core-logo.png"
      />
      <div>
        <h1 class="text-2xl text-center mb-[10px]">Mot de passe oublié</h1>
      </div>
      <div class="flex flex-col p-[16px]">
        <label class="mb-[4px]" for="email"> Email</label>
        <input
          type="text"
          id="email"
          v-model="email"
          class="mb-[16px] bg-white text-black"
          required
        />
        <button
          class="w-full bg-[#4b9945] text-white font-bold border border-black"
          type="submit"
        >
          Réinitialiser
        </button>
        <div class="text-[14px] mt-[16px]">
          <p>
            Je ne l'ai pas oublié.
            <router-link class="underline" to="/connexion"
              >Se connecter</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup></script>

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
