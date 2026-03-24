import { GOOGLE_CONFIG } from "@/config/google";

async function runScript(
  functionName: string,
  parameters: unknown[] = [],
): Promise<unknown> {
  // https://developers.google.com/apps-script/api/reference/rest/v1/scripts/run
  const token = window.gapi.client.getToken();
  const res = await fetch(
    `https://script.googleapis.com/v1/scripts/${GOOGLE_CONFIG.appsScriptId}:run`,
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

export { runScript };
