<template>
  <div ref="root" class="select-wrap">
    <div class="input" @click="open = !open">
      <slot name="trigger" />
      <SvgArrow />
    </div>

    <ul v-if="open" class="dropdown">
      <li
        v-for="value in values"
        :key="value"
        :class="optionClass(value)"
        @click="
          emit('select', value);
          if (closeOnSelect) open = false;
        "
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
  values: readonly string[];
  isSelected: (value: string) => boolean;
  isDisabled?: (value: string) => boolean;
  closeOnSelect?: boolean;
}>();

const emit = defineEmits<{ select: [value: string] }>();

const open = ref(false);
const root = ref<HTMLElement | null>(null);

function onClickOutside(e: MouseEvent) {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false;
}

onMounted(() => document.addEventListener("click", onClickOutside));
onUnmounted(() => document.removeEventListener("click", onClickOutside));

function optionClass(value: string) {
  return {
    selected: props.isSelected(value),
    disabled: props.isDisabled?.(value) ?? false,
  };
}
</script>

<style scoped>
.input {
  cursor: pointer;
}

.input:hover .select-arrow {
  color: var(--c-muted);
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
