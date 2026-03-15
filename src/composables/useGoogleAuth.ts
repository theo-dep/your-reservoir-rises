import { ref, readonly } from "vue";
import { GOOGLE_CONFIG } from "@/config/google.ts";
import type { TokenClient, TokenResponse } from "@/types/google.d.ts";

const gapiInited = ref(false);
const gisInited = ref(false);
const isSignedIn = ref(false);
const isReady = ref(false);

let tokenClient: TokenClient | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error(`Fail to load ${src}`));
    document.head.appendChild(s);
  });
}

// Init Google API
async function initGapi(): Promise<void> {
  await loadScript("https://apis.google.com/js/api.js");
  // Callback after api.js is loaded.
  await new Promise<void>((resolve) => window.gapi.load("client", resolve));
  // Callback after the API client is loaded. Loads the
  // discovery doc to initialize the API.
  await window.gapi.client.init({
    discoveryDocs: [GOOGLE_CONFIG.discoveryDoc],
  });
  gapiInited.value = true;
  maybeSetReady();
}

// Callback after Google Identity Services are loaded.
async function initGis(): Promise<void> {
  await loadScript("https://accounts.google.com/gsi/client");
  tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: GOOGLE_CONFIG.clientId,
    scope: GOOGLE_CONFIG.scopes,
  });
  gisInited.value = true;
  maybeSetReady();
}

// Enables user interaction after all libraries are loaded.
function maybeSetReady(): void {
  if (gapiInited.value && gisInited.value) isReady.value = true;
}

async function initialize(): Promise<void> {
  await Promise.all([initGapi(), initGis()]);
}

// Sign in the user upon button click.
function signIn(): Promise<TokenResponse> {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error("tokenClient not initialized"));
      return;
    }
    tokenClient.callback = async (resp: TokenResponse) => {
      if (resp.error) {
        reject(resp);
        return;
      }
      isSignedIn.value = true;
      resolve(resp);
    };

    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    // OR
    // Skip display of account chooser and consent dialog for an existing session.
    const prompt = window.gapi.client.getToken() === null ? "consent" : "";
    tokenClient.requestAccessToken({ prompt });
  });
}

// Sign out the user upon button click.
function signOut(): void {
  const token = window.gapi.client.getToken();
  if (token) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken("");
    isSignedIn.value = false;
  }
}

export function useGoogleAuth() {
  return {
    isReady: readonly(isReady),
    isSignedIn: readonly(isSignedIn),
    initialize,
    signIn,
    signOut,
  };
}
