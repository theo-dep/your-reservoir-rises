<template>
  <div v-if="loading" class="state">Chargement…</div>
  <div v-else-if="error" class="state state-error">⚠️ {{ error }}</div>
  <form v-else class="container">
    <input
      id="firstName"
      class="input"
      placeholder="Prénom"
      v-model.lazy.trim="firstName"
      required
      @blur="handleValidate"
    />

    <input
      id="lastName"
      class="input"
      placeholder="Nom"
      v-model.lazy.trim="lastName"
      required
      @blur="handleValidate"
    />

    <input class="input" type="date" id="date" v-model="date" required />

    <input
      class="input"
      type="time"
      id="time"
      step="1"
      v-model="time"
      required
    />

    <SingleSelect
      name="Parcours"
      :values="parcours"
      v-model="parcoursSelected"
      :required="true"
    />

    <MultiSelect
      name="Boosts"
      :values="boosts"
      v-model="boostsSelected"
      :max="3"
    />

    <textarea
      class="input textarea"
      v-model="comments"
      id="comments"
      placeholder="Comments"
    ></textarea>

    <input
      class="input submit"
      type="submit"
      :value="validating ? 'Vérification…' : 'Envoyer'"
      :disabled="validating || nameValid === false"
    />
  </form>

  <p v-if="nameValid === false" class="error">⚠️ Nom ou prénom introuvable.</p>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SingleSelect from "@/components/SingleSelect.vue";
import MultiSelect from "@/components/MultiSelect.vue";
import { useNameValidation } from "@/composables/useNameValidation";
import { useLocalName } from "@/composables/useLocalName";

defineProps<{
  parcours: readonly string[];
  boosts: readonly string[];
  loading: boolean;
  error: string | null;
}>();

const { firstName, lastName } = useLocalName();

const date = ref<string>(new Date().toISOString().split("T")[0]);
const time = ref<string>("");
const parcoursSelected = ref<string>("");
const boostsSelected = ref<string[]>([]);
const comments = ref<string>("");

const { nameValid, validating, validateName } = useNameValidation();

async function handleValidate(): Promise<void> {
  await validateName(firstName.value, lastName.value);
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
