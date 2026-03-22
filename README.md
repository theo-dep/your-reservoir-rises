# Your Reservoir Rises

Application to register a rise for the "Challenge du réservoir".

## Prerequisites

- Node.js ≥ 18
- A Google Cloud project with activated Sheet and App Script API ([console](https://console.developers.google.com/))
- An OAuth 2.0 Client ID of type **Application Web**

## Installation

```bash
npm install
# Copy paste the environnement file
cp .env.example .env
```

Enter your `CLIENT_ID` and a Google Sheet ID of "Vos montées des réservoirs" in `.env` :

```env
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
VITE_GOOGLE_SHEET_ID=your_google_sheet_id
VITE_GOOGLE_VALIDATE_SCRIPT_ID=your_google_app_script_id
```

Follow the [Google Javascript quickstart guide](https://developers.google.com/workspace/sheets/api/quickstart/js) and the [App Script run API documentation](https://developers.google.com/apps-script/api/reference/rest/v1/scripts/run). The App Script must be deployed on the same Google Cloud Platform Project than the Client ID.

## Commandes

```bash
npm run dev          # Development server (http://127.0.0.1:5173)
npm run build        # Production build (dist/)
npm run preview      # Preview the build
npm run type-check   # TypeScript check without compilation
npm run format       # Run Prettier
npm run lint         # Run ESLint
```

## Note on the CLIENT_ID

The Google `CLIENT_ID` is a **public** identifier by design — the browser needs it to initiate the OAuth flow. Storing it in a `VITE_*` variable does not hide it from the final bundle, but keeps it out of versioned source code.

To limit its misuse, configure strict **Authorized JavaScript origins** in the Google Cloud Console.

## Google Sheet "Challenge du réservoir"

The Google Sheet must have the following tables:

- A "Parcours" table with a "Nom" column.
- A "Boosts" table with a "Nom" column.
- A "Participants" table a "Nom" in the first column.
- A "Montées" table starting at row 3, with the following columns (names may differ but order must match):

| Prénom NOM | Date | Temps réalisé | Parcours | Boost 1 | Boost 2 | Boost 3 | Commentaire |

## App Script "Challenge du réservoir"

To validate the challenger's first and last name, an Apps Script handles server-side form validation. The script can be written as follows:

```js
function validateName(name) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheetParticipants = spreadsheet.getSheetByName("Participants");
  const participantsData = sheetParticipants
    .getDataRange()
    .getValues()
    .slice(1); // skip header row
  const allNames = participantsData.map((row) => row[0]); // Nom (first col)
  const valid = allNames.some((row) => row.toString() === name);
  return valid;
}
```
