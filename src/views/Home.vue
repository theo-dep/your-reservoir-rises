<template>
  <div>
    <header>
      <span class="logo">Vos montées des réservoirs</span>
      <div class="controls">
        <span v-if="!googgleAuthStore.isReady" class="muted"
          >Initialisation…</span
        >
        <template v-else-if="!googgleAuthStore.isSignedIn">
          <button class="btn btn-primary" @click="handleSignIn">
            Connexion
          </button>
        </template>
        <div v-else class="btnContainer">
          <button class="btn" @click="handleRefresh">Actualiser</button>
          <button class="btn" @click="handleSignOut">Déconnexion</button>
        </div>
      </div>
    </header>

    <main>
      <div
        v-if="!googgleAuthStore.isSignedIn && googgleAuthStore.isReady"
        class="welcome"
      >
        <h2 class="welcome-title">
          Bienvenue sur l'application "Challenge du réservoir"
        </h2>
        <p class="welcome-description">
          Application de saisie des montées pour les participants du challenge.
          Les données sont enregistrées dans la Google Sheet collaborative de
          {{ currentYear() }} via votre compte Google.
        </p>
        <p class="welcome-subtitle">
          Connectez-vous pour enregistrer une montée.
        </p>
      </div>
      <template v-else-if="googgleAuthStore.isSignedIn">
        <TableForm ref="tableFormRef" />
      </template>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useGoogleAuthStore } from "@/stores/useGoogleAuthStore";
import TableForm from "@/components/TableForm.vue";
import { currentYear } from "@/utils/Date";

const tableFormRef = ref<InstanceType<typeof TableForm> | null>(null);

const googgleAuthStore = useGoogleAuthStore();

onMounted(async () => {
  await googgleAuthStore.initialize();
  // need popup permission
  if (googgleAuthStore.isTokenRestored && !googgleAuthStore.isSignedIn) {
    await handleSignIn();
  }
});

async function handleSignIn(): Promise<void> {
  try {
    await googgleAuthStore.signIn();
  } catch {
    // in case of access denied, signOut and signIn
    googgleAuthStore.signOut();
    await googgleAuthStore.signIn();
  }
}

async function handleRefresh(): Promise<void> {
  await tableFormRef.value?.handleRefresh();
}

function handleSignOut(): void {
  googgleAuthStore.signOut();
}
</script>

<style scoped>
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

.welcome {
  padding: 4rem 0;
  text-align: center;
}
.welcome-title {
  font-family: var(--font-serif);
  font-weight: 600;
  color: var(--c-text);
  font-size: 1.5rem;
  margin-bottom: 1rem;
}
.welcome-description {
  font-size: 1rem;
  line-height: 1.7;
  color: var(--c-muted);
  margin-bottom: 1.5rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}
.welcome-subtitle {
  font-family: var(--font-serif);
  font-style: italic;
  color: var(--c-accent);
  font-size: 1.05rem;
  margin-top: 1.5rem;
}
</style>
