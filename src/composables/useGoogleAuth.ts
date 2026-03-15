import { ref, readonly } from "vue";
import { GOOGLE_CONFIG } from "@/config/google.ts";
import type { TokenClient, TokenResponse } from "@/types/google.d.ts";

const STORAGE_KEY = "gapi_token";

const gapiInited = ref(false);
const gisInited = ref(false);
const isSignedIn = ref(false);
const isTokenRestored = ref(false);
const isReady = ref(false);

let tokenClient: TokenClient | null = null;

interface StoredToken {
  access_token: string;
  expires_at: number; // ms
}

function saveToken(access_token: string, expires_in: number): void {
  const stored: StoredToken = {
    access_token: access_token,
    expires_at: Date.now() + expires_in - 5 * 60, // 55 min (Google API token expires after 1 hour)
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
}

function loadToken(): StoredToken | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    const stored: StoredToken = JSON.parse(raw);
    if (Date.now() > stored.expires_at) {
      clearToken();
      return null;
    }
    return stored;
  } catch {
    clearToken();
    return null;
  }
}

function clearToken(): void {
  localStorage.removeItem(STORAGE_KEY);
  isTokenRestored.value = false;
}

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

  // Restore the saved token if valid
  const stored = loadToken();
  if (stored) {
    window.gapi.client.setToken(stored.access_token);
    isTokenRestored.value = true;
  }
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
      saveToken(resp.access_token, resp.expires_in);
      isSignedIn.value = true;
      resolve(resp);
    };

    // Prompt the user to select a Google Account and ask for consent to share their data
    // when establishing a new session.
    // OR
    // Skip display of account chooser and consent dialog for an existing session.
    const prompt = window.gapi.client.getToken() === null ? "consent" : "none";
    tokenClient.requestAccessToken({ prompt });
  });
}

// Sign out the user upon button click.
function signOut(): void {
  const token = window.gapi.client.getToken();
  if (token) {
    window.google.accounts.oauth2.revoke(token.access_token);
    window.gapi.client.setToken("");
  }
  clearToken();
  isSignedIn.value = false;
}

export function useGoogleAuth() {
  return {
    isReady: readonly(isReady),
    isSignedIn: readonly(isSignedIn),
    isTokenRestored: readonly(isTokenRestored),
    initialize,
    signIn,
    signOut,
  };
}
