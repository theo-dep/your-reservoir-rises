<template>
  <input
    type="number"
    class="number-part"
    :min="min"
    :max="max"
    :placeholder="placeholder"
    :name="name"
    :value="number"
    :required="required"
    @input="update($event)"
    @blur="pad()"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

defineProps<{
  name: string;
  min: string;
  max: string;
  placeholder: string;
  required?: boolean;
}>();

const model = defineModel<string>({ default: "" });

const number = ref<string>("");
fromModel();

function fromModel() {
  if (model.value !== "") number.value = padNumber(model.value);
}

function update(e: Event) {
  const val = (e.target as HTMLInputElement).value;
  number.value = val;
  emitModel();
}

function padNumber(number: string): string {
  return number.padStart(2, "0");
}

function pad() {
  if (number.value !== "") number.value = padNumber(number.value);
  emitModel();
}

function emitModel() {
  model.value = padNumber(number.value);
}

watch(model, (val) => {
  if (val !== padNumber(number.value)) fromModel();
});
</script>
