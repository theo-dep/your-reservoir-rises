<template>
  <form class="container" @submit.prevent="handleSubmit">
    <input
      id="firstName"
      v-model.lazy.trim="localNameStore.firstName"
      class="input"
      placeholder="Prénom"
      required
      @blur="handleValidate"
    />

    <input
      id="lastName"
      v-model.lazy.trim="localNameStore.lastName"
      class="input"
      placeholder="Nom"
      required
      @blur="handleValidate"
    />

    <DateInput v-model="date" :required-days="true" :required-months="true" />

    <DurationInput
      v-model="time"
      :required-hours="false"
      :required-minutes="true"
      :required-seconds="true"
    />

    <SingleSelect
      v-model="parcoursSelected"
      name="Parcours"
      :values="coursesStore.courses"
      :required="true"
    />

    <MultiSelect
      v-model="boostsSelected"
      name="Boosts"
      :values="boostsStore.boosts"
      :max="BOOST_SIZE"
    />

    <textarea
      id="comments"
      v-model="comments"
      class="input textarea"
      placeholder="Comments"
    ></textarea>

    <button
      class="input submit"
      type="submit"
      :disabled="isButtonDisabled"
      :class="{
        loading: isLoading || submitting || nameValidationStore.validating,
      }"
    >
      <span
        v-if="isLoading || submitting || nameValidationStore.validating"
        class="spinner"
      ></span>
      <template v-else>Envoyer</template>
    </button>
  </form>

  <p v-if="statusMessage" :class="statusMessage.type">
    {{ statusMessage.type === "error" ? "⚠️" : "ℹ️" }} {{ statusMessage.text }}
  </p>

  <p v-if="riseSubmitted === false" class="error">
    ⚠️ Échec de l'envoi de la montée. Veuillez réessayer.
  </p>

  <p v-if="riseSubmitted === true" class="success">
    ✅ Montée enregistrée avec succès !
  </p>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from "vue";
import DateInput from "@/components/DateInput.vue";
import DurationInput from "@/components/DurationInput.vue";
import SingleSelect from "@/components/SingleSelect.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import { useNameValidationStore } from "@/stores/useNameValidationStore";
import { useLocalNameStore } from "@/stores/useLocalNameStore";
import { useCoursesStore } from "@/stores/useCoursesStore";
import { useBoostsStore } from "@/stores/useBoostsStore";
import { addRise } from "@/utils/Rise";
import {
  currentDay,
  currentMonth,
  currentYear,
  dateToString,
} from "@/utils/Date";

const BOOST_SIZE = 3;

const nameValidationStore = useNameValidationStore();
const localNameStore = useLocalNameStore();
const coursesStore = useCoursesStore();
const boostsStore = useBoostsStore();

const date = ref<string>(
  dateToString(
    currentDay().toString(),
    currentMonth().toString(),
    currentYear().toString(),
  ),
);
const time = ref<string>("");
const parcoursSelected = ref<string>("");
const boostsSelected = ref<string[]>([]);
const comments = ref<string>("");

const riseSubmitted = ref<boolean | null>(null);
const submitting = ref<boolean>(false);

// form state
const isLoading = computed(() => coursesStore.loading || boostsStore.loading);
const isButtonDisabled = computed(
  () =>
    isLoading.value ||
    coursesStore.error !== null ||
    boostsStore.error !== null ||
    nameValidationStore.validating ||
    submitting.value ||
    nameValidationStore.nameValid === false,
);

const statusMessage = computed(() => {
  if (riseSubmitted.value === true) return null;
  if (riseSubmitted.value === false) return null;
  if (boostsStore.loading && !coursesStore.loading)
    return { type: "info", text: "Chargement des boosts…" };
  if (isLoading.value)
    return { type: "info", text: "Chargement des parcours et boosts…" };
  if (coursesStore.error)
    return { type: "error", text: `Erreur parcours : ${coursesStore.error}` };
  if (boostsStore.error)
    return { type: "error", text: `Erreur boosts : ${boostsStore.error}` };
  if (nameValidationStore.nameValid === false)
    return {
      type: "error",
      text: "Le nom et prénom saisis sont introuvables dans la liste des participants.",
    };
  return null;
});

async function handleRefresh(): Promise<void> {
  await Promise.all([
    coursesStore.fetchCourses(),
    boostsStore.fetchBoosts(date.value),
  ]);
}

watch(date, async (newDate) => {
  await boostsStore.fetchBoosts(newDate);
});

async function handleValidate(): Promise<void> {
  await nameValidationStore.validateName(
    localNameStore.firstName,
    localNameStore.lastName,
  );
}

onMounted(async () => {
  await handleRefresh();
});

defineExpose({
  handleRefresh,
});

async function handleSubmit(): Promise<void> {
  submitting.value = true;

  riseSubmitted.value = await addRise(
    localNameStore.firstName,
    localNameStore.lastName,
    date.value,
    time.value,
    parcoursSelected.value,
    boostsSelected.value[0] ?? "",
    boostsSelected.value[1] ?? "",
    boostsSelected.value[2] ?? "",
    comments.value,
  );

  submitting.value = false;

  if (riseSubmitted.value) {
    setTimeout(() => {
      riseSubmitted.value = null;
    }, 3000);
  }
}
</script>

<style scoped>
.spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.info {
  font-size: 0.8rem;
  color: var(--c-info);
  margin-top: 4px;
}

.error {
  font-size: 0.8rem;
  color: var(--c-error);
  margin-top: 4px;
}

.success {
  font-size: 0.8rem;
  color: var(--c-accent);
  margin-top: 4px;
}

.container {
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
}

.submit {
  cursor: pointer;
  background-color: var(--c-accent);
  color: var(--c-white);
}

.submit:hover:not(:disabled) {
  opacity: 0.88;
}

.submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media screen and (min-width: 600px) {
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .container .textarea,
  .container .submit {
    grid-column-start: 1;
    grid-column-end: 3;
  }
}
</style>
