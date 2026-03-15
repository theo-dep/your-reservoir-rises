# Your Reservoir Rises

Application to register a rise for the Challenge du réservoir.

## Prerequisites

- Node.js ≥ 18
- A Google Cloud project with activated API Drive ([console](https://console.developers.google.com/))
- An OAuth 2.0 Client ID of type **Application Web**

## Installation

```bash
npm install
# Copy paste the environnement file
cp .env.example .env
```

Enter your `CLIENT_ID` in `.env` :

```env
VITE_GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
```

Follow the [Google Javascript quickstart guide](https://developers.google.com/workspace/drive/api/quickstart/js).

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
