export interface GoogleConfig {
  clientId: string;
  sheetId: string;
  discoveryDoc: string;
  scopes: string;
}

export const GOOGLE_CONFIG: GoogleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID,
  // Discovery doc URL for APIs used by the quickstart
  discoveryDoc: "https://sheets.googleapis.com/$discovery/rest?version=v4",
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  scopes: "https://www.googleapis.com/auth/spreadsheets.readonly",
};

if (!GOOGLE_CONFIG.clientId) {
  console.error(
    "VITE_GOOGLE_CLIENT_ID is missing. " +
      "Copy .env.example → .env and update CLIENT_ID.",
  );
}

if (!GOOGLE_CONFIG.sheetId) {
  console.error(
    "VITE_GOOGLE_SHEET_ID is missing. " +
      "Copy .env.example → .env and update the Google Sheet ID.",
  );
}
