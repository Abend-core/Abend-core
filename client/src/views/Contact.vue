<template>
  <div class="isolate bg-white dark:bg-gray-800 px-6 py-12 sm:py-20 lg:px-8">
    <div class="mx-auto max-w-2xl text-center">
      <h2
        class="text-4xl font-bold tracking-tighter uppercase text-balance text-gray-900 dark:text-white sm:text-5xl underlined-title"
      >
        Nous contacter
      </h2>
      <p class="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">
        Une question ? Une idée ? Contactez-nous et faisons naître quelque chose
        d’extraordinaire ensemble !
      </p>
    </div>
    <form action="#" method="POST" class="mx-auto mt-16 max-w-xl sm:mt-20">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div>
          <label
            for="first-name"
            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Prénom
          </label>
          <div class="mt-2.5">
            <input
              type="text"
              name="first-name"
              id="first-name"
              autocomplete="off"
              class="block w-full rounded-md border border-gray-200 bg-white dark:bg-gray-900 px-3.5 py-2 text-base text-gray-900 dark:text-white focus:outline-red-600"
            />
          </div>
        </div>
        <div>
          <label
            for="last-name"
            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Nom
          </label>
          <div class="mt-2.5">
            <input
              type="text"
              name="last-name"
              id="last-name"
              autocomplete="off"
              class="block w-full rounded-md bg-white border border-gray-200 dark:bg-gray-900 px-3.5 py-2 text-base text-gray-900 dark:text-white focus:outline-red-600"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="email"
            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Email
          </label>
          <div class="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="off"
              class="block w-full rounded-md bg-white border border-gray-200 dark:bg-gray-900 px-3.5 py-2 text-base text-gray-900 dark:text-white focus:outline-red-600"
            />
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="phone-number"
            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Téléphone
          </label>
          <div class="mt-2.5">
            <div
              class="flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-red-600"
            >
              <input
                type="text"
                name="phone-number"
                id="phone-number"
                class="block min-w-0 grow py-1.5 pr-3 pl-3.5 border border-gray-200 dark:bg-gray-900 rounded-md text-base text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-red-600 sm:text-sm/6"
                placeholder="06 12 34 56 78"
              />
            </div>
          </div>
        </div>
        <div class="sm:col-span-2">
          <label
            for="message"
            class="block text-sm/6 font-semibold text-gray-900 dark:text-white"
          >
            Message
          </label>
          <div class="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows="4"
              class="block w-full rounded-md bg-white border border-gray-200 dark:bg-gray-900 px-3.5 py-2 text-base text-gray-900 dark:text-white focus:outline-red-600"
            ></textarea>
          </div>
        </div>
        <div class="flex gap-x-4 sm:col-span-2">
          <div class="flex h-6 items-center">
            <button
              type="button"
              :class="[
                'flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 transition-colors duration-200 ease-in-out ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600',
                isChecked
                  ? 'bg-red-600 dark:bg-red-700'
                  : 'bg-gray-200 dark:bg-gray-700',
                'ring-gray-900/5 dark:ring-gray-600',
              ]"
              role="switch"
              :aria-checked="isChecked"
              aria-labelledby="switch-1-label"
              @click="isChecked = !isChecked"
            >
              <span class="sr-only">Accepter les politiques</span>
              <span
                :class="[
                  'size-4 transform rounded-full transition duration-200 ease-in-out',
                  isChecked
                    ? 'translate-x-4 bg-white dark:bg-gray-200'
                    : 'translate-x-0 bg-white dark:bg-gray-200',
                  'ring-1 ring-gray-900/5 dark:ring-gray-700',
                ]"
                aria-hidden="true"
              ></span>
            </button>
          </div>
          <label
            class="text-sm/6 text-gray-600 dark:text-white"
            id="switch-1-label"
          >
            En cochant ceci, vous acceptez notre
            <a href="#" class="font-semibold text-red-600"
              >politique de confidentialité</a
            >.
          </label>
        </div>
      </div>
      <div class="mt-10">
        <button
          type="submit"
          class="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
          Parlons-en dès maintenant !
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isChecked = ref(false);
</script>

<style scoped>
.underlined-title {
  position: relative;
  display: inline-block;
}

.underlined-title:after {
  content: "";
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30%;
  height: 6px;
  background-color: #f82b30;
}
</style>
