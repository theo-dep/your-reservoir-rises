<template>
  <div class="select-wrap">
    <select v-model="selected">
      <option disabled value="">{{ name }}</option>
      <option v-for="(row, rowIndex) in values" :key="rowIndex" :value="row">
        {{ row }}
      </option>
    </select>
    <svg
      class="select-arrow"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  name: string;
  values: readonly string[];
}>();

const selected = ref<string>("");
</script>

<style scoped>
.select-wrap {
  position: relative;
  display: inline-block;
  width: 100%;
}

select {
  width: 100%;
  height: 38px;
  padding: 0 32px 0 12px;
  font-family: var(--font-sans);
  font-size: 0.875rem;
  color: var(--c-text);
  background: var(--c-bg);
  border: 0.5px solid var(--c-line);
  border-radius: 4px;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
  transition: border-color 0.15s;
}

select:hover {
  border-color: var(--c-muted);
}

select:focus {
  border-color: var(--c-text);
  box-shadow: 0 0 0 3px rgba(45, 90, 61, 0.08);
}

option:hover {
  background-color: none;
}

.select-arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--c-line);
  pointer-events: none;
}

select:hover + .select-arrow {
  color: var(--c-muted);
}
</style>
