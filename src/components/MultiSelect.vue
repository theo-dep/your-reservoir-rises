<template>
  <SelectDropDown
    :values="values"
    :is-selected="(v) => model.includes(v)"
    :is-disabled="(v) => !model.includes(v) && model.length >= max"
    :close-on-select="false"
    @select="toggle"
  >
    <template #trigger>
      <span v-if="model.length === 0" class="placeholder">{{ name }}</span>
      <span v-for="item in model" :key="item" class="tag">
        {{ item }}
        <button @click.stop="remove(item)">×</button>
      </span>
    </template>
  </SelectDropDown>
</template>

<script setup lang="ts">
import SelectDropDown from "@/components/SelectDropDown.vue";

const props = defineProps<{
  name: string;
  values: readonly string[];
  max: number;
}>();

const model = defineModel<string[]>({ default: () => [] });

function toggle(option: string) {
  if (model.value.includes(option)) {
    remove(option);
  } else if (model.value.length < props.max) {
    model.value = [...model.value, option];
  }
}

function remove(option: string) {
  model.value = model.value.filter((o) => o !== option);
}
</script>

<style scoped>
.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  margin: 2px;
  background: var(--c-accent);
  color: var(--c-text);
  border-radius: 999px;
  font-size: small;
}
.tag button {
  background: none;
  border: none;
  color: var(--c-text);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  opacity: 0.7;
}
.tag button:hover {
  opacity: 1;
}
</style>
