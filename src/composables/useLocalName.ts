import { ref, watch } from "vue";
import { STORAGE_CONFIG } from "@/config/storage";

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

export function useLocalName() {
  return { firstName, lastName };
}
