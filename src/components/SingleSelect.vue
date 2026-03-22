<template>
  <div class="select-wrap">
    <select
      :id="name.toLowerCase()"
      v-model="selected"
      :required="required ? true : false"
      :class="{ placeholder: selected === '' }"
    >
      <option disabled value="" class="placeholder">{{ name }}</option>
      <option v-for="value in values" :key="value" :value="value">
        {{ value }}
      </option>
    </select>
    <SvgArrow />
  </div>
</template>

<script setup lang="ts">
import SvgArrow from "@/components/SvgArrow.vue";

defineProps<{
  name: string;
  values: readonly string[];
  required: boolean;
}>();

const selected = defineModel<string>({ default: "" });
</script>

<style scoped>
select:hover + .select-arrow {
  color: var(--c-muted);
}

select.placeholder {
  color: var(--c-disable);
}

select::picker(select) {
  color: var(--c-text);
}
</style>
