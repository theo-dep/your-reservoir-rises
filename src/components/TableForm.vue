<template>
  <div class="table">
    <div v-if="loading" class="state">Chargement…</div>
    <div v-else-if="error" class="state state--error">⚠ {{ error }}</div>
    <div v-else-if="table.headers.length === 0" class="state">
      Aucune table trouvée.
    </div>
    <table v-else>
      <tr class="table-row">
        <th v-for="(header, index) in table.headers" :key="index">
          {{ header }}
        </th>
      </tr>
      <tr
        v-for="(row, rowIndex) in table.values"
        :key="rowIndex"
        class="table-row"
      >
        <td v-for="(value, colIndex) in row" :key="colIndex">
          {{ value }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Table } from "@/types/sheet";
import type { DeepReadonly } from "vue";

defineProps<{
  table: DeepReadonly<Table>;
  loading: boolean;
  error: string | null;
}>();
</script>

<style scoped>
table {
  width: 100%;
}

tr {
  padding: 0;
  margin: 0;
}

.table-row {
  display: grid;
  grid-auto-flow: column;
  align-items: left;
  gap: 0.75rem;
  padding: 0.65rem 0;
  border-bottom: 1px solid var(--c-line);
}
.table-row:last-child {
  border-bottom: none;
}

.table-value {
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.state {
  padding: 2rem 0;
  text-align: center;
  color: var(--c-muted);
  font-size: 0.9rem;
}

.state--error {
  color: #c0392b;
}
</style>
