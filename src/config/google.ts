export interface GoogleConfig {
  clientId: string;
  appsScriptId: string;
  discoveryDoc: string;
  scopes: string[];
}

export const GOOGLE_CONFIG: GoogleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  appsScriptId: import.meta.env.VITE_GOOGLE_APPS_SCRIPT_ID,
  // Discovery doc URL for APIs used by the quickstart
  discoveryDoc: "https://sheets.googleapis.com/$discovery/rest?version=v4",
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  scopes: ["https://www.googleapis.com/auth/spreadsheets.currentonly"],
};

if (!GOOGLE_CONFIG.clientId) {
  console.error(
    "VITE_GOOGLE_CLIENT_ID is missing. " +
      "Copy .env.example → .env and update CLIENT_ID.",
  );
}

if (!GOOGLE_CONFIG.appsScriptId) {
  console.error(
    "VITE_GOOGLE_APPS_SCRIPT_ID is missing. " +
      "Copy .env.example → .env and update the Google Apps Script ID.",
  );
}
