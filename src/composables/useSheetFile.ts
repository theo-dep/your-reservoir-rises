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

async function appendRow(range: string, values: string[]): Promise<boolean> {
  try {
    // read the first column to find the empty cell after A3
    const firstRow = 3;
    const readRange = await window.gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_CONFIG.sheetId,
      range: `${range}!A:A`,
    });

    const rows: string[][] = readRange.result.values ?? [];
    // find the empty cell (indice 0 is ligne 1)
    let firstEmpty = Math.max(rows.length + 1, firstRow);
    for (let i = firstRow - 1; i < rows.length; i++) {
      if (!rows[i]?.[0]) {
        firstEmpty = i + 1;
        break;
      }
    }

    await window.gapi.client.sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_CONFIG.sheetId,
      range: `${range}!A${firstEmpty}`,
      valueInputOption: "USER_ENTERED",
      resource: { values: [values] },
    });
    return true;
  } catch {
    return false;
  }
}

export function useSheetFile() {
  return {
    fetchTable,
    appendRow,
  };
}
