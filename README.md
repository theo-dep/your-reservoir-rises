# Your Reservoir Rises

Application to register a rise for the "Challenge du réservoir".

## Prerequisites

- Node.js ≥ 18
- A Google Cloud project with activated Apps Script API ([console](https://console.developers.google.com/))
- An OAuth 2.0 Client ID of type **Application Web**

## Installation

```bash
npm install
# Copy paste the environnement file
cp .env.example .env
```

Enter your `CLIENT_ID` and an Apps Script deployment ID of [appsscript/api.gs](appsscript/api.gs) in the current Google Sheet Vos montées des réservoirs" in `.env`:

```env
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
VITE_GOOGLE_APPS_SCRIPT_ID=your_google_app_script_id
VITE_GOOGLE_SITE_VERIFICATION=your_google_site_verification_code
```

To limit the scope of the Google API used, all requests pass through an Apps Script API instead of directly using the Google Sheets JavaScript client. This ensures tighter control over API permissions. Follow the [Apps Script Execution API documentation](https://developers.google.com/apps-script/api/reference/rest/v1/scripts/run) for deployment details. The Apps Script deployment must be in the same Google Cloud Platform project as your Client ID.

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
- A "Participants" table with a "Nom" in the first column.
- A "Montées" table starting at row 3, with the following columns (names may differ but order must match):

| Prénom NOM | Date | Temps réalisé | Parcours | Boost 1 | Boost 2 | Boost 3 | Commentaire |

## Apps Script "Challenge du réservoir"

All Apps Script functions are defined in [appsscript/api.gs](appsscript/api.gs). The script contains:

- **`validateName(name)`** — Validates that a challenger exists in the "Participants" sheet
- **`addRise(...)`** — Appends a new row to the "Montées" sheet with validation
- **`courseNames()`** — Retrieves available course names from the "Parcours" sheet
- **`boostNames()`** — Retrieves available boost names from the "Boosts" sheet

Deploy this script as an executable using the [Apps Script Deployment documentation](https://developers.google.com/apps-script/concepts/deployments) and set the deployment ID in `VITE_GOOGLE_VALIDATE_SCRIPT_ID`.

## Google Search Console Verification

To verify ownership of your GitHub Pages site for Google OAuth:

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property: `https://theo-dep.github.io/your-reservoir-rises`
3. Choose **"HTML tag"** verification method
4. Copy **only the content value** from the meta tag (e.g., `abc123xyz...`)
5. Add it to your `.env` file `VITE_GOOGLE_SITE_VERIFICATION` variable
6. Build and deploy
7. Return to Google Search Console and click **"Verify"**
