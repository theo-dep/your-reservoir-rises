export interface GoogleConfig {
  clientId: string;
  discoveryDoc: string;
  scopes: string;
}

export const GOOGLE_CONFIG: GoogleConfig = {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  // Discovery doc URL for APIs used by the quickstart
  discoveryDoc: "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  scopes: "https://www.googleapis.com/auth/drive.metadata.readonly",
};

if (!GOOGLE_CONFIG.clientId) {
  console.error(
    "VITE_GOOGLE_CLIENT_ID is missing. " +
      "Copy .env.example → .env and update CLIENT_ID.",
  );
}
