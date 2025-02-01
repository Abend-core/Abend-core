import { ref } from "vue";

export function useModal() {
  const modals = ref({});

  const toggleModal = (name) => {
    for (const key in modals.value) {
      if (key !== name) {
        modals.value[key] = false;
      }
    }
    modals.value[name] = !modals.value[name];
  };

  const closeModal = (name) => {
    modals.value[name] = false;
  };

  const searchBarOpenKey = (event) => {
    event.preventDefault();
    toggleModal("searchBar");
  };

  return {
    modals,
    toggleModal,
    closeModal,
    searchBarOpenKey,
  };
}
