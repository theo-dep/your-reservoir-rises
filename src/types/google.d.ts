interface TokenResponse {
  access_token: string;
  expires_in: number; // sec
  error?: string;
}

interface TokenClient {
  callback: (resp: TokenResponse) => void;
  requestAccessToken(options: { prompt: string }): void;
}

interface GapiClient {
  init(options: { discoveryDocs: string[] }): Promise<void>;
  getToken(): { access_token: string } | null;
  setToken(token: string): void;
  // https://developers.google.com/workspace/sheets/api/guides/values#read
  sheets: {
    spreadsheets: {
      values: {
        get(params: {
          spreadsheetId: string;
          range: string;
        }): Promise<{ result: { values: string[][] } }>;
      };
    };
  };
}

interface Gapi {
  load(lib: string, callback: () => void): void;
  client: GapiClient;
}

interface GoogleAccounts {
  oauth2: {
    initTokenClient(options: {
      client_id: string;
      scope: string;
      callback?: (resp: TokenResponse) => void;
    }): TokenClient;
    revoke(token: string, done?: () => void): void;
  };
}

declare global {
  interface Window {
    gapi: Gapi;
    google: { accounts: GoogleAccounts };
  }
}

export { TokenClient, TokenResponse };
