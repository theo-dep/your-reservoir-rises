<template>
  <div style="position: relative">
    <SelectDropDown
      :values="values"
      :is-selected="(v) => model === v"
      :close-on-select="true"
      @select="select"
    >
      <template #trigger>
        <span :class="model ? '' : 'placeholder'">{{ model || name }}</span>
      </template>
    </SelectDropDown>

    <!-- hidden input to use the native form validation -->
    <input
      type="text"
      :value="model ?? ''"
      :required="required"
      :name="name"
      style="
        position: absolute;
        top: 100%;
        left: 0;
        width: 100%;
        height: 1px;
        opacity: 0;
        pointer-events: none;
      "
    />
  </div>
</template>

<script setup lang="ts">
import SelectDropDown from "@/components/SelectDropDown.vue";

defineProps<{
  name: string;
  values: readonly string[];
  required?: boolean;
}>();

const model = defineModel<string | null>({ default: null });

function select(option: string) {
  model.value = model.value === option ? null : option;
}
</script>
