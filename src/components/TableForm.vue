<template>
  <div class="table">
    <div v-if="loading" class="state">Chargement…</div>
    <div v-else-if="error" class="state state--error">⚠ {{ error }}</div>
    <InputDropDown v-else name="Parcours" :values="parcours" />
  </div>
</template>

<script setup lang="ts">
import InputDropDown from "./InputDropDown.vue";

defineProps<{
  parcours: readonly string[];
  loading: boolean;
  error: string | null;
}>();
</script>

<style scoped>
.state {
  padding: 2rem 0;
  text-align: center;
  color: var(--c-muted);
  font-size: 0.9rem;
}

.state--error {
  color: #c0392b;
}
</style>
