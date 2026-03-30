import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { STORAGE_CONFIG } from "@/config/storage";

export const useLocalNameStore = defineStore("localName", () => {
  const firstName = ref<string>(
    localStorage.getItem(STORAGE_CONFIG.firstName) || "",
  );
  const lastName = ref<string>(
    localStorage.getItem(STORAGE_CONFIG.lastName) || "",
  );

  watch(firstName, (firstName) => {
    localStorage.setItem(STORAGE_CONFIG.firstName, firstName);
  });

  watch(lastName, (lastName) => {
    localStorage.setItem(STORAGE_CONFIG.lastName, lastName);
  });

  return { firstName, lastName };
});
