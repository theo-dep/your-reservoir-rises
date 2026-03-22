<template>
  <div class="app">
    <header>
      <span class="logo">Vos montées des réservoirs</span>
      <div class="controls">
        <span v-if="!isReady" class="muted">Initialisation…</span>
        <template v-else-if="!isSignedIn">
          <button class="btn btn-primary" @click="handleSignIn">
            Connection
          </button>
        </template>
        <div v-else class="btnContainer">
          <button class="btn" @click="handleRefresh">Actualiser</button>
          <button class="btn" @click="handleSignOut">Déconnexion</button>
        </div>
      </div>
    </header>

    <main>
      <div v-if="!isSignedIn && isReady" class="welcome">
        <p class="welcome-title">Connectez-vous pour enregistrer une montée.</p>
      </div>
      <template v-else-if="isSignedIn">
        <TableForm
          :parcours="parcours"
          :boosts="boosts"
          :loading="loading"
          :error="error"
        />
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
import { useGoogleAuth } from "@/composables/useGoogleAuth";
import { useParcoursTable } from "@/composables/useTables";
import TableForm from "@/components/TableForm.vue";

const { isReady, isSignedIn, isTokenRestored, initialize, signIn, signOut } =
  useGoogleAuth();
const { parcours, boosts, loading, error, fetchParcours, clearParcours } =
  useParcoursTable();

onMounted(async () => {
  await initialize();
  // need popup permission
  if (isTokenRestored.value && !isSignedIn.value) {
    await handleSignIn();
  }
});

async function handleSignIn(): Promise<void> {
  try {
    await signIn();
  } catch {
    // in case of access denied, signOut and signIn
    signOut();
    await signIn();
  }
  await handleRefresh();
}

async function handleRefresh(): Promise<void> {
  await fetchParcours();
}

function handleSignOut(): void {
  signOut();
  clearParcours();
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
  --c-disable: #757575;
  --c-error: #c0392b;
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
  padding-right: 8px;
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
.btnContainer {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
}

@media screen and (min-width: 560px) {
  .btnContainer {
    grid-template-columns: 1fr 1fr;
  }
}

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
