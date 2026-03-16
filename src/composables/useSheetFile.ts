import { ref, readonly } from "vue";
import type { SheetTable } from "@/types/google.d.ts";
import { GOOGLE_CONFIG } from "@/config/google";

const table = ref<SheetTable>({ headers: [], values: [] });
const error = ref<string | null>(null);
const loading = ref(false);

// Fetch value from table
async function fetchTable(range: string): Promise<void> {
  loading.value = true;
  error.value = null;
  try {
    const response = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_CONFIG.sheetId,
      range: range,
    });
    const values: string[][] = response.result.values ?? [];
    if (values.length > 0) {
      table.value.headers = values[0];
      table.value.values = values.slice(1);
    }
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Unknown error";
    table.value = { headers: [], values: [] };
  } finally {
    loading.value = false;
  }
}

function clearValues(): void {
  table.value = { headers: [], values: [] };
  error.value = null;
}

export function useSheetFile() {
  return {
    table: readonly(table),
    error: readonly(error),
    loading: readonly(loading),
    fetchTable,
    clearValues,
  };
}
