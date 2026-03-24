const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

function courseNames() {
  const sheet = spreadsheet.getSheetByName("Parcours");
  const data = sheet.getDataRange().getValues().slice(1); // skip header row
  const firstCol = data.map((row) => row[0]); // Nom (first col)
  return firstCol;
}

function boostNames() {
  const sheet = spreadsheet.getSheetByName("Boosts");
  const data = sheet.getDataRange().getValues().slice(1); // skip header row
  const firstCol = data.map((row) => row[0]); // Nom (first col)
  return firstCol;
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
