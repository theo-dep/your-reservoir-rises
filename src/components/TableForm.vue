<template>
  <div v-if="loading" class="state">Chargement…</div>
  <div v-else-if="error" class="state state-error">⚠️ {{ error }}</div>
  <form v-else class="container" @submit.prevent="handleSubmit">
    <input
      id="firstName"
      v-model.lazy.trim="firstName"
      class="input"
      placeholder="Prénom"
      required
      @blur="handleValidate"
    />

    <input
      id="lastName"
      v-model.lazy.trim="lastName"
      class="input"
      placeholder="Nom"
      required
      @blur="handleValidate"
    />

    <input id="date" v-model="date" class="input" type="date" required />

    <input
      id="time"
      v-model="time"
      placeholder="hh:mm:ss"
      class="input"
      type="time"
      step="1"
      required
    />

    <SingleSelect
      v-model="parcoursSelected"
      name="Parcours"
      :values="parcours"
      :required="true"
    />

    <MultiSelect
      v-model="boostsSelected"
      name="Boosts"
      :values="boosts"
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
      :disabled="validating || submitting || nameValid === false"
    >
      {{ submitting ? "Envoi…" : validating ? "Vérification…" : "Envoyer" }}
    </button>
  </form>

  <p v-if="nameValid === false" class="error">⚠️ Nom ou prénom introuvable.</p>
  <p v-if="riseSubmitted === false" class="error">
    ⚠️ Échec de l'envoie de la montée.
  </p>

  <p v-if="riseSubmitted === true" class="success">✅ Montée enregistrée.</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SingleSelect from "@/components/SingleSelect.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import { useNameValidation } from "@/composables/useNameValidation";
import { useLocalName } from "@/composables/useLocalName";
import { addRise } from "@/utils/Rise";

defineProps<{
  parcours: readonly string[];
  boosts: readonly string[];
  loading: boolean;
  error: string | null;
}>();

const BOOST_SIZE = 3;

const { firstName, lastName } = useLocalName();

const date = ref<string>(new Date().toISOString().split("T")[0]);
const time = ref<string>("");
const parcoursSelected = ref<string>("");
const boostsSelected = ref<string[]>([]);
const comments = ref<string>("");

const riseSubmitted = ref<boolean | null>(null);
const submitting = ref<boolean>(false);

const { nameValid, validating, validateName } = useNameValidation();

async function handleValidate(): Promise<void> {
  await validateName(firstName.value, lastName.value);
}

async function handleSubmit(): Promise<void> {
  submitting.value = true;

  riseSubmitted.value = await addRise(
    firstName.value,
    lastName.value,
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
.state {
  padding: 2rem 0;
  text-align: center;
  color: var(--c-muted);
  font-size: 0.9rem;
}

.state-error {
  color: var(--c-error);
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
  color: #fff;
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
