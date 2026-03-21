<template>
  <div class="select-wrap">
    <select :id="name.toLowerCase()" v-model="selected">
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
defineProps<{
  name: string;
  values: readonly string[];
}>();

const selected = defineModel<string>({ default: "" });
</script>

<style scoped>
.select-wrap {
  position: relative;
  display: inline-block;
  width: 100%;
}

option:hover {
  background-color: none;
}

.select-arrow {
  position: absolute;
  right: 13px;
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
