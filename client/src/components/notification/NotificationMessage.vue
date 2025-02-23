<template>
  <div
    v-if="notificationMessage"
    :class="{
      'bg-gradient-to-r from-[#f01f1f66] to-[#f01f1f66] border border-[#f01f1f66]':
        notificationType === 'error',
      'bg-gradient-to-r from-[#4bb54366] to-[#4bb54366] border border-[#4bb54366]':
        notificationType === 'success',
      'bg-gradient-to-r from-[#f7a00066] to-[#f7a00066] border border-[#f7a000de]':
        notificationType === 'warning',
    }"
    class="text-white rounded-md p-4 mt-5"
  >
    <div>
      <svg
        aria-hidden="true"
        height="16"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        class="float-right cursor-pointer dark:fill-white"
        fill="#c2040466"
        @click="clearNotification"
      >
        <path
          d="M3.72 3.72a.75.75 0 0 1 1.06 0L8 6.94l3.22-3.22a.749.749 0 0 1 1.275.326.749.749 0 0 1-.215.734L9.06 8l3.22 3.22a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L8 9.06l-3.22 3.22a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042L6.94 8 3.72 4.78a.75.75 0 0 1 0-1.06Z"
        ></path>
      </svg>
      <div class="text-sm text-[#1f2328] dark:text-white">
        {{ notificationMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useNotificationStore } from "../../stores/notificationStore";

const notificationStore = useNotificationStore();

const notificationMessage = computed(() => notificationStore.message);
const notificationType = computed(() => notificationStore.type);

const clearNotification = () => {
  notificationStore.clearNotification();
};
</script>
