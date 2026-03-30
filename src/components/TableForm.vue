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
      :disabled="
        coursesStore.loading ||
        boostsStore.loading ||
        nameValidationStore.validating ||
        submitting ||
        nameValidationStore.nameValid === false
      "
    >
      {{
        submitting
          ? "Envoi…"
          : nameValidationStore.validating
            ? "Vérification…"
            : "Envoyer"
      }}
    </button>
  </form>

  <p v-if="nameValidationStore.nameValid === false" class="error">
    ⚠️ Nom ou prénom introuvable.
  </p>
  <p v-if="coursesStore.error" class="error">⚠️ {{ coursesStore.error }}</p>
  <p v-if="boostsStore.error" class="error">⚠️ {{ boostsStore.error }}</p>
  <p v-if="riseSubmitted === false" class="error">
    ⚠️ Échec de l'envoie de la montée.
  </p>

  <p v-if="riseSubmitted === true" class="success">✅ Montée enregistrée.</p>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import DateInput from "@/components/DateInput.vue";
import DurationInput from "@/components/DurationInput.vue";
import SingleSelect from "@/components/SingleSelect.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import { useNameValidationStore } from "@/stores/useNameValidationStore";
import { useLocalNameStore } from "@/stores/useLocalNameStore";
import { useCoursesStore } from "@/stores/useCoursesStore";
import { useBoostsStore } from "@/stores/useBoostsStore";
import { addRise } from "@/utils/Rise";

const BOOST_SIZE = 3;

const nameValidationStore = useNameValidationStore();
const localNameStore = useLocalNameStore();
const coursesStore = useCoursesStore();
const boostsStore = useBoostsStore();

const date = ref<string>("");
const time = ref<string>("");
const parcoursSelected = ref<string>("");
const boostsSelected = ref<string[]>([]);
const comments = ref<string>("");

const riseSubmitted = ref<boolean | null>(null);
const submitting = ref<boolean>(false);

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

.submit:hover {
  opacity: 0.88;
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
