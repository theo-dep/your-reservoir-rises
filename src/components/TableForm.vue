<template>
  <div class="table">
    <div v-if="loading" class="state">Chargement…</div>
    <div v-else-if="error" class="state state--error">⚠ {{ error }}</div>
    <form v-else class="container">
      <input
        id="firstName"
        class="input"
        placeholder="Prénom"
        v-model.lazy.trim="firstName"
      />

      <input
        id="lastName"
        class="input"
        placeholder="Nom"
        v-model.lazy.trim="lastName"
      />

      <input class="input" type="date" id="date" v-model="date" />

      <input class="input" type="time" id="time" step="1" v-model="time" />

      <InputDropDown
        name="Parcours"
        :values="parcours"
        v-model="parcoursSelected"
      />

      <InputDropDown name="Boosts" :values="boosts" v-model="boostSelected" />

      <textarea
        class="input textarea"
        v-model="comments"
        placeholder="Comments"
      ></textarea>

      <input class="input submit" type="submit" value="Envoyer" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputDropDown from "@/components/InputDropDown.vue";

defineProps<{
  parcours: readonly string[];
  boosts: readonly string[];
  loading: boolean;
  error: string | null;
}>();

const firstName = ref<string>("");
const lastName = ref<string>("");
const date = ref<string>(new Date().toISOString().split("T")[0]);
const time = ref<string>("");
const parcoursSelected = ref<string>("");
const boostSelected = ref<string>("");
const comments = ref<string>("");
</script>

<style scoped>
.state {
  padding: 2rem 0;
  text-align: center;
  color: var(--c-muted);
  font-size: 0.9rem;
}

.state--error {
  color: #c0392b;
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
