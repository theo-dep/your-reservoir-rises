<template>
  <div class="app">
    <div class="content">
      <router-view />
    </div>

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
      |
      <router-link class="link" to="/privacy">Privacy Policy</router-link>
    </footer>
  </div>
</template>

<script setup lang="ts">
// App shell - routing handled by vue-router
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500&display=swap");

:root {
  /* Colors - Base */
  --c-bg: #1b211a;
  --c-text: #ebd5ab;
  --c-white: #ffffff;
  --c-muted: #8bae66;
  --c-line: #ebd5ab;
  --c-accent: #628141;
  --c-disable: #757575;

  /* Colors - Semantic */
  --c-error: #c0392b;
  --c-success: #27ae60;
  --c-warning: #ffc107;
  --c-info: #17a2b8;

  /* Colors - Alpha variants */
  --c-muted-light: rgba(139, 174, 102, 0.05);
  --c-muted-bg: rgba(139, 174, 102, 0.15);
  --c-warning-bg: rgba(255, 193, 7, 0.1);
  --c-info-bg: rgba(23, 162, 184, 0.1);
  --c-focus-shadow: rgba(45, 90, 61, 0.08);

  /* Fonts */
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

/* Buttons - Global styles used across components */
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
  color: var(--c-white);
}
.btn-primary:hover {
  opacity: 0.88;
}

/* Content wrapper */
.content {
  flex: 1;
}

/* Footer */
footer {
  margin-top: 4rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--c-line);
  text-align: center;
}
</style>
