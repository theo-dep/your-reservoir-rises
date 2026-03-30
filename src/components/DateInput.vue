<template>
  <div class="input number">
    <div class="number-field">
      <NumberInput
        min="1"
        max="31"
        placeholder="DD"
        name="days"
        v-model="days"
        :required="requiredDays"
      />
    </div>
    <span class="number-sep">/</span>
    <div class="number-field">
      <NumberInput
        min="1"
        max="12"
        placeholder="MM"
        name="months"
        v-model="months"
        :required="requiredMonths"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  currentDay,
  currentMonth,
  currentYear,
  dateToString,
} from "@/utils/Date";
import { ref, watch } from "vue";
import NumberInput from "@/components/NumberInput.vue";

defineProps<{
  requiredDays?: boolean;
  requiredMonths?: boolean;
}>();

const model = defineModel<string>({ default: "" });

const days = ref<string>(currentDay().toString());
const months = ref<string>(currentMonth().toString());
const years = ref<string>(currentYear().toString());

watch([days, months, years], () => {
  const d = days.value || currentDay().toString();
  const m = months.value || currentMonth().toString();
  const y = years.value || currentYear().toString();
  model.value = dateToString(d, m, y);
});
</script>

<style scoped></style>
