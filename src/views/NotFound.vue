<template>
  <BackLink />

  <div class="not-found">
    <p class="code">404</p>
    <p class="message">Page introuvable.</p>
  </div>
</template>

<script setup lang="ts">
import BackLink from "@/components/BackLink.vue";
</script>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 6rem 0;
  gap: 0.5rem;
  text-align: center;
}

.code {
  font-family: var(--font-serif);
  font-size: 4rem;
  font-weight: 600;
  color: var(--c-line);
  line-height: 1;
}

.message {
  font-style: italic;
  font-size: 2rem;
  color: var(--c-muted);
}
</style>
