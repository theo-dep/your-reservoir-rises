import type { Table } from "@/types/sheet";
import { GOOGLE_CONFIG } from "@/config/google";

// Fetch value from table
async function fetchTable(range: string): Promise<Table> {
  const response = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_CONFIG.sheetId,
    range: range,
  });
  const values: string[][] = response.result.values ?? [];
  const table: Table = { headers: [], values: [] };
  if (values.length > 0) {
    table.headers = values[0];
    table.values = values.slice(1);
  }
  return table;
}

export function useSheetFile() {
  return {
    fetchTable,
  };
}
