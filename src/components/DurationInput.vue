<template>
  <div class="input number">
    <div class="number-field">
      <NumberInput
        min="0"
        max="99"
        placeholder="hh"
        name="hours"
        v-model="hours"
        :required="requiredHours"
      />
    </div>
    <span class="number-sep">:</span>
    <div class="number-field">
      <NumberInput
        min="0"
        max="59"
        placeholder="mm"
        name="minutes"
        v-model="minutes"
        :required="requiredMinutes"
      />
    </div>
    <span class="number-sep">:</span>
    <div class="number-field">
      <NumberInput
        min="0"
        max="59"
        placeholder="ss"
        name="seconds"
        v-model="seconds"
        :required="requiredSeconds"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import NumberInput from "@/components/NumberInput.vue";

defineProps<{
  requiredHours?: boolean;
  requiredMinutes?: boolean;
  requiredSeconds?: boolean;
}>();

const model = defineModel<string>({ default: "" });

const hours = ref<string>("");
const minutes = ref<string>("");
const seconds = ref<string>("");

watch([hours, minutes, seconds], () => {
  const h = hours.value || "0";
  const m = minutes.value || "0";
  const s = seconds.value || "0";
  model.value = `${h}:${m}:${s}`;
});
</script>

<style scoped></style>
