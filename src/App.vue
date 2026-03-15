<template>
  <div class="app">
    <header>
      <span class="logo">Vos montées des réservoirs</span>
      <div class="controls">
        <span v-if="!isReady" class="muted">Initialisation…</span>
        <template v-else-if="!isSignedIn">
          <button class="btn btn-primary" @click="handleSignIn">
            Autoriser l'accès
          </button>
        </template>
        <template v-else>
          <button class="btn" @click="handleRefresh">Actualiser</button>
          <button class="btn" @click="handleSignOut">Déconnexion</button>
        </template>
      </div>
    </header>

    <main>
      <div v-if="!isSignedIn && isReady" class="welcome">
        <p class="welcome-title">
          Connectez-vous pour explorer vos fichiers Google Drive.
        </p>
      </div>
      <template v-else-if="isSignedIn">
        <p class="section-label">
          {{ files.length }} fichier{{ files.length !== 1 ? "s" : "" }}
        </p>
        <DriveFileList :files="files" :loading="loading" :error="error" />
      </template>
    </main>

    <footer>
      This site is built with ❤️ using
      <a class="link" href="https://vuejs.org/">Vue.js</a>.
      <br />
      <a
        class="link"
        href="https://github.com/theo-dep/your-reservoir-rises"
        target="_blank"
        rel="noopener"
        >Open Source Project</a
      >
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useGoogleAuth } from "@/composables/useGoogleAuth.ts";
import { useDriveFiles } from "@/composables/useDriveFiles.ts";
import DriveFileList from "@/components/DriveFileList.vue";

const { isReady, isSignedIn, initialize, signIn, signOut } = useGoogleAuth();
const { files, loading, error, fetchFiles, clearFiles } = useDriveFiles();

onMounted(() => initialize());

async function handleSignIn(): Promise<void> {
  await signIn();
  await fetchFiles();
}

async function handleRefresh(): Promise<void> {
  await fetchFiles();
}

function handleSignOut(): void {
  signOut();
  clearFiles();
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap");

:root {
  --c-bg: #1b211a;
  --c-text: #ebd5ab;
  --c-muted: #8bae66;
  --c-line: #ebd5ab;
  --c-accent: #628141;
  --font-serif: "Lora", Georgia, serif;
  --font-sans: "DM Sans", sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: var(--c-bg);
  color: var(--c-text);
  font-family: var(--font-sans);
  font-size: 15px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  max-width: 680px;
  margin: 0 auto;
  padding: 3rem 1.5rem;
}

.link {
  color: var(--c-accent);
}

/* Header */
header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--c-line);
  margin-bottom: 2.5rem;
}

.logo {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.controls {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.muted {
  color: var(--c-muted);
  font-size: 0.85rem;
}

/* Main */
main {
  flex: 1;
}

/* Buttons */
.btn {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.45rem 1rem;
  border-radius: 4px;
  border: 1px solid var(--c-line);
  background: transparent;
  color: var(--c-text);
  cursor: pointer;
  transition:
    border-color 0.15s,
    color 0.15s;
}
.btn:hover {
  border-color: var(--c-muted);
}

.btn-primary {
  background: var(--c-accent);
  border-color: var(--c-accent);
  color: #fff;
}
.btn-primary:hover {
  opacity: 0.88;
}

/* Welcome */
.welcome {
  padding: 4rem 0;
  text-align: center;
}
.welcome-title {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--c-muted);
  font-size: 1.05rem;
}

/* Section label */
.section-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--c-muted);
  margin-bottom: 0.5rem;
}

/* Footer */
footer {
  margin-top: 4rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--c-line);
  text-align: center;
}
</style>
