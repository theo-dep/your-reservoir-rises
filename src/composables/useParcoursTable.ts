import type { Table } from "@/types/sheet";
import { ref, readonly } from "vue";
import { useSheetFile } from "@/composables/useSheetFile";

const { fetchTable } = useSheetFile();

const table = ref<Table>({ headers: [], values: [] });
const loading = ref(false);
const error = ref<string | null>(null);

async function fetchParcoursTable(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    table.value = await fetchTable("Parcours");
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    table.value = { headers: [], values: [] };
  } finally {
    loading.value = false;
  }
}

function clearParcoursValues(): void {
  table.value = { headers: [], values: [] };
  error.value = null;
}

export function useParcoursTable() {
  return {
    table: readonly(table),
    loading: readonly(loading),
    error: readonly(error),
    fetchParcoursTable,
    clearParcoursValues,
  };
}
