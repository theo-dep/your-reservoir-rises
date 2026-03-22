import { ref } from "vue";
import { GOOGLE_CONFIG } from "@/config/google";

const nameValid = ref<boolean | null>(null);
const validating = ref(false);

async function runScript(
  functionName: string,
  parameters: unknown[],
): Promise<unknown> {
  // https://developers.google.com/apps-script/api/reference/rest/v1/scripts/run
  const token = window.gapi.client.getToken();
  const res = await fetch(
    `https://script.googleapis.com/v1/scripts/${GOOGLE_CONFIG.validateScriptId}:run`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ function: functionName, parameters: parameters }),
    },
  );
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.response?.result;
}

function capitalizeFirstLetter(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function mergeName(firstName: string, lastName: string): string {
  return [firstName, lastName].join(" ");
}

async function validateName(
  firstName: string,
  lastName: string,
): Promise<void> {
  firstName = capitalizeFirstLetter(firstName);
  lastName = lastName.toUpperCase();

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

export function useNameValidation() {
  return { nameValid, validating, mergeName, validateName };
}
