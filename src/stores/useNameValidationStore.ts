import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { runScript } from "@/utils/GoogleScriptAPI";
import { mergeName, formatFirstName, formatLastName } from "@/utils/SheetFile";

export const useNameValidationStore = defineStore("nameValidation", () => {
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
      const result = await runScript("validateName", [
        mergeName(firstName, lastName),
      ]);
      nameValid.value = result as boolean;
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
