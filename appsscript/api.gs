const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

function courseNames() {
  const sheet = spreadsheet.getSheetByName("Parcours");
  const data = sheet.getDataRange().getValues().slice(1); // skip header row
  const firstCol = data.map((row) => row[0]); // Nom (first col)
  return firstCol;
}

function boostNames(date) {
  const sheet = spreadsheet.getSheetByName("Boosts");
  const data = sheet.getDataRange().getValues().slice(1);
  const testDate = new Date(date);

  return data
    .filter((row) => {
      const start = row[2]; // Début
      const end = row[3]; // Fin
      if (!start || !end) return true; // no dates always active

      const endOfDay = new Date(end);
      endOfDay.setHours(23, 59, 59, 999);

      return testDate >= new Date(start) && testDate <= endOfDay;
    })
    .map((row) => row[0]); // Nom
}

function validateName(name) {
  const sheet = spreadsheet.getSheetByName("Participants");
  const data = sheet.getDataRange().getValues().slice(1); // skip header row
  const firstCol = data.map((row) => row[0]); // Nom (first col)
  const valid = firstCol.some((row) => row.toString() === name);
  return valid;
}

function addRise(
  name,
  date,
  time,
  course,
  boost1 = "",
  boost2 = "",
  boost3 = "",
  comment = "",
) {
  const FIRST_ROW = 3;
  const COL_NUMBER = 8;

  try {
    const sheetName = "Montées";
    const sheet = spreadsheet.getSheetByName(sheetName);

    if (!sheet) {
      return {
        success: false,
        message: `Sheet "${sheetName}" not found`,
      };
    }

    // Find first empty row in column A
    const columnA = sheet.getRange("A:A").getValues();
    let firstEmpty = Math.max(columnA.length + 1, FIRST_ROW);

    for (let i = FIRST_ROW - 1; i < columnA.length; i++) {
      if (!columnA[i]?.[0]) {
        firstEmpty = i + 1;
        break;
      }
    }

    // Append the row
    const range = sheet.getRange(firstEmpty, 1, 1, COL_NUMBER);
    range.setValues([
      [name, date, time, course, boost1, boost2, boost3, comment],
    ]);

    return {
      success: true,
      message: `Row appended at line ${firstEmpty} in sheet "${sheetName}"`,
    };
  } catch (error) {
    return {
      success: false,
      message: `Error: ${error.message}`,
    };
  }
}
