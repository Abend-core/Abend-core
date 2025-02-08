import { defineStore } from "pinia";
import { ref } from "vue";

export const useNotificationStore = defineStore("notificationStore", () => {
  const message = ref("");
  const type = ref("");

  const setNotification = (msg, msgType) => {
    message.value = msg;
    type.value = msgType;
  };

  const clearNotification = () => {
    message.value = "";
    type.value = "";
  };

  return { message, type, setNotification, clearNotification };
});
