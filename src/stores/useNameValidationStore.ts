import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { useGoogleScriptStore } from "@/stores/useGoogleScriptStore";
import { mergeName, formatFirstName, formatLastName } from "@/utils/SheetFile";

export const useNameValidationStore = defineStore("nameValidation", () => {
  const googleScriptStore = useGoogleScriptStore();

  const nameValid = ref<boolean | null>(null);
  const validating = ref(false);

  async function validateName(
    firstName: string,
    lastName: string,
  ): Promise<void> {
    firstName = formatFirstName(firstName);
    lastName = formatLastName(lastName);

    validating.value = true;
    nameValid.value = null;
    try {
      const result = await googleScriptStore.executeScript<boolean>(
        "validateName",
        [mergeName(firstName, lastName)],
      );
      nameValid.value = result;
    } finally {
      validating.value = false;
    }
  }

  return {
    nameValid: readonly(nameValid),
    validating: readonly(validating),
    validateName,
  };
});
