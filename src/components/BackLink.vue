<template>
  <div class="back-link-wrapper">
    <router-link to="/" class="back-link">← Retour à l'application</router-link>
  </div>
</template>

<style scoped>
.back-link-wrapper {
  margin-bottom: 2rem;
}

.back-link {
  color: var(--c-accent);
  text-decoration: none;
  font-size: 0.95rem;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
