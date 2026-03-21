import { GOOGLE_CONFIG } from "@/config/google";

async function fetchTable(range: string): Promise<Record<string, string[]>> {
  const response = await window.gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_CONFIG.sheetId,
    range,
  });
  const values: string[][] = response.result.values ?? [];

  if (values.length === 0) return {};

  const headers = values[0];
  const rows = values.slice(1);

  return Object.fromEntries(
    headers.map((header, i) => [header, rows.map((row) => row[i] ?? "")]),
  );
}

export function useSheetFile() {
  return {
    fetchTable,
  };
}
