<template>
  <div ref="root" class="select-wrap">
    <div class="input" @click="open = !open">
      <span v-if="selected.length === 0" class="placeholder">{{ name }}</span>
      <span v-for="item in selected" :key="item" class="tag">
        {{ item }}
        <button @click.stop="remove(item)">×</button>
      </span>
      <SvgArrow />
    </div>

    <ul v-if="open" class="dropdown">
      <li
        v-for="value in values"
        :key="value"
        :class="{
          selected: selected.includes(value),
          disabled: !selected.includes(value) && selected.length >= max,
        }"
        @click="toggle(value)"
      >
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SvgArrow from "@/components/SvgArrow.vue";

const props = defineProps<{
  name: string;
  values: readonly string[];
  max: number;
}>();

const model = defineModel<string[]>({ default: () => [] });
const selected = model;
const open = ref(false);
const root = ref<HTMLElement | null>(null);

function toggle(option: string) {
  if (selected.value.includes(option)) {
    remove(option);
  } else if (selected.value.length < props.max) {
    selected.value = [...selected.value, option];
  }
}

function remove(option: string) {
  selected.value = selected.value.filter((o) => o !== option);
}

function onClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false;
}

onMounted(() => document.addEventListener("click", onClickOutside));
onUnmounted(() => document.removeEventListener("click", onClickOutside));
</script>

<style scoped>
.input {
  cursor: pointer;
}

.input:hover .select-arrow {
  color: var(--c-muted);
}

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

.dropdown {
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  background: var(--c-bg);
  border: 1px solid rgb(from var(--c-line) r g b / 0.5);
  border-radius: 4px;
  list-style: none;
  padding: 4px 0;
  margin: 0;
  z-index: 100;
  overflow-y: auto;
}

.dropdown li {
  font-size: small;
  padding: 2px 12px;
  cursor: pointer;
  transition: background 0.1s;
}
.dropdown li:hover:not(.disabled) {
  background: var(--c-muted);
}
.dropdown li.selected {
  color: var(--c-accent);
  font-weight: 500;
}
.dropdown li.disabled {
  color: var(--c-disable);
  cursor: not-allowed;
}
</style>
