<template>
  <BackLink />

  <div class="privacy-container">
    <h1>Privacy Policy</h1>
    <p class="meta"><strong>Last Updated:</strong> March 2026</p>

    <section>
      <h2>1. Introduction</h2>
      <p>
        "Your Reservoir Rises" or "Vos montées des réservoirs" (hereinafter "the
        Application") is an open-source web application designed to record
        climbs for the "Challenge du réservoir" in a collaborative Google Sheet.
        This privacy policy explains how your data is collected, used, and
        protected.
      </p>

      <div class="warning">
        <strong>⚠️ IMPORTANT - Shared Data Visibility:</strong>
        <p>
          This application stores your climb data in a
          <strong>shared Google Sheet</strong>. Any person with access to this
          sheet can see your submitted information (name, climb details,
          comments). Do not submit information you wish to keep private.
        </p>
      </div>
    </section>

    <section>
      <h2>2. Data Controller</h2>
      <ul>
        <li><strong>Project:</strong> Your Reservoir Rises</li>
        <li>
          <strong>Repository:</strong>&nbsp;
          <a
            href="https://github.com/theo-dep/your-reservoir-rises"
            target="_blank"
            >https://github.com/theo-dep/your-reservoir-rises</a
          >
        </li>
        <li><strong>Status:</strong> Community open-source project</li>
      </ul>
    </section>

    <section>
      <h2>3. Data Collected</h2>

      <h3>3.1 Authentication Data</h3>
      <ul>
        <li>
          <strong>Google access token:</strong> Used only to authorize requests
          to Google Sheets API
        </li>
        <li>
          <strong>No email or profile data:</strong> The application does NOT
          request access to your email, name, or profile photo
        </li>
        <li>
          <strong>No sensitive data:</strong> Password, phone number, address,
          etc., are never collected
        </li>
      </ul>
      <div class="info">
        <strong>Important:</strong> This app uses a minimal OAuth scope
        (<code>spreadsheets.currentonly</code>) that only grants access to the
        specific Google Sheet being used, not your Google account profile.
      </div>

      <h3>3.2 Application Data</h3>
      <ul>
        <li>
          <strong>Personal information:</strong> First name and last name
          (stored locally and sent to Google Sheets)
        </li>
        <li>
          <strong>Challenge records:</strong> Date, time, course name, boosts
          (up to 3), and optional comments
        </li>
        <li>
          <strong>Name validation:</strong> Your name is checked against the
          "Participants" sheet to verify registration
        </li>
      </ul>

      <h3>3.3 Data NOT Collected</h3>
      <ul>
        <li class="cross">❌ Geolocation data</li>
        <li class="cross">
          ❌ Third-party data (Gmail, Drive, Calendar, etc.)
        </li>
        <li class="cross">❌ External tracking cookies</li>
        <li class="cross">❌ Biometric data</li>
      </ul>
    </section>

    <section>
      <h2>4. Data Storage</h2>

      <h3>4.1 localStorage (Client-Side Browser Storage)</h3>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Duration</th>
            <th>Control</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Google access token</td>
            <td>55 minutes (auto-expiration)</td>
            <td>User</td>
          </tr>
          <tr>
            <td>First name</td>
            <td>Persistent (until cleared)</td>
            <td>User</td>
          </tr>
          <tr>
            <td>Last name</td>
            <td>Persistent (until cleared)</td>
            <td>User</td>
          </tr>
        </tbody>
      </table>

      <h3>4.2 Google Sheets (Persistent Data Storage)</h3>
      <p><strong>Sheet "Montées" (Climbs):</strong></p>
      <ul>
        <li>Full name (first name + last name)</li>
        <li>Date and time of the climb</li>
        <li>Course/route name</li>
        <li>Boosts (up to 3 optional boosts)</li>
        <li>Comments (optional)</li>
      </ul>

      <p><strong>Storage details:</strong></p>
      <ul>
        <li>
          <strong>Location:</strong> Google Cloud servers (USA/multi-region)
        </li>
        <li>
          <strong>Owner:</strong> The Google Sheet owner (shared with all
          participants)
        </li>
        <li>
          <strong>Access:</strong> All users with access to the shared Google
          Sheet can view your climb records
        </li>
        <li>
          <strong>Visibility:</strong> Your climbs are visible to everyone who
          has access to the sheet
        </li>
      </ul>
    </section>

    <section>
      <h2>5. Required Google Permissions</h2>

      <h3>5.1 Granted Permissions</h3>
      <p class="check">
        ✅ <strong>Read/write access to the current Google Sheet only</strong>
      </p>
      <p>
        <strong>OAuth Scope:</strong>
        <code>https://www.googleapis.com/auth/spreadsheets.currentonly</code>
      </p>

      <p>This minimal scope allows:</p>
      <ul>
        <li>Read/write rows in the configured Google Sheet</li>
        <li>
          Access to sheet names ("Montées", "Participants", "Parcours",
          "Boosts")
        </li>
        <li>Access to column data within those sheets</li>
      </ul>

      <p><strong>This scope does NOT grant:</strong></p>
      <ul>
        <li>Access to other Google Sheets</li>
        <li>Access to your email or profile information</li>
        <li>Access to your Google account beyond the specific spreadsheet</li>
      </ul>

      <h3>5.2 Permissions NOT Requested</h3>
      <ul>
        <li class="cross">❌ Email or profile information</li>
        <li class="cross">❌ Access to other Google Sheets</li>
        <li class="cross">❌ Gmail access</li>
        <li class="cross">❌ Google Drive access</li>
        <li class="cross">❌ Google Calendar access</li>
        <li class="cross">❌ Any other Google services</li>
      </ul>
    </section>

    <section>
      <h2>6. Security</h2>
      <ul>
        <li>
          <strong>OAuth 2.0:</strong> Secure authentication without password
          storage
        </li>
        <li><strong>HTTPS:</strong> All communications are encrypted</li>
        <li>
          <strong>Token Expiration:</strong> Access tokens automatically expire
          after 55 minutes
        </li>
        <li>
          <strong>Restricted Client ID:</strong> Limited authorized JavaScript
          origins configured in Google Cloud Console
        </li>
      </ul>
    </section>

    <section>
      <h2>7. Data Sharing</h2>

      <div class="warning">
        <strong>⚠️ Important:</strong> Your climb data is stored in a
        <strong>shared Google Sheet</strong>
        accessible to all participants of the "Challenge du réservoir". This
        means:
        <ul>
          <li class="check">
            ✅ All users with sheet access can see your name and climb records
          </li>
          <li class="check">
            ✅ This is intentional for the collaborative nature of the challenge
          </li>
          <li class="check">✅ Do not submit data you wish to keep private</li>
        </ul>
      </div>
    </section>

    <section>
      <h2>8. User Rights and Controls</h2>

      <h3>8.1 Right of Access</h3>
      <ul>
        <li>
          <strong>Google Sheet data:</strong> Directly in the Google Sheet
        </li>
        <li>
          <strong>Browser data:</strong> Via browser developer tools (F12 →
          Application → Local Storage)
        </li>
      </ul>

      <h3>8.2 Right to Deletion</h3>
      <ul>
        <li>
          <strong>Individual records:</strong> Delete your own rows in the
          Google Sheet (if you have edit permissions)
        </li>
        <li><strong>Local browser data:</strong> Clear localStorage</li>
        <li><strong>Application access:</strong> Revoke OAuth access</li>
      </ul>

      <h3>8.3 Revoke Access</h3>
      <ol>
        <li>
          Go to
          <a href="https://myaccount.google.com/permissions" target="_blank"
            >https://myaccount.google.com/permissions</a
          >
        </li>
        <li>Find "Your Reservoir Rises"</li>
        <li>Click "Remove"</li>
      </ol>

      <h3>8.4 Clear Local Data</h3>
      <p>Open browser console (F12) and run:</p>
      <pre><code>// Clear specific items
localStorage.removeItem("first_name");
localStorage.removeItem("last_name");
localStorage.removeItem("gapi_token");

// OR clear everything
localStorage.clear();</code></pre>
    </section>

    <section>
      <h2>9. Cookies and Tracking</h2>
      <ul>
        <li class="cross">❌ No cookies are set by the Application</li>
        <li class="cross">
          ❌ No tracking pixels or third-party analytics services
        </li>
        <li class="cross">❌ No analytics data collected</li>
        <li class="cross">❌ Google Analytics not used</li>
      </ul>
    </section>

    <section>
      <h2>10. Legal Compliance</h2>

      <h3>10.1 GDPR (General Data Protection Regulation)</h3>
      <ul>
        <li class="check">✅ Explicit consent required via OAuth</li>
        <li>
          ⚠️ Right to be forgotten: Limited - you can revoke app access and
          clear local data, but shared sheet data requires owner intervention
        </li>
        <li class="check">
          ✅ Right of access: Data in the shared Google Sheet and browser
          localStorage
        </li>
        <li class="check">
          ✅ Data portability: Google Sheets export available
        </li>
        <li>
          ⚠️ Shared data: Your data is visible to all sheet participants
          (collaborative use)
        </li>
      </ul>
    </section>

    <section>
      <h2>11. Contact</h2>
      <p>For questions about this policy or data deletion requests:</p>
      <ul>
        <li>
          <strong>GitHub Issues:</strong>
          <a
            href="https://github.com/theo-dep/your-reservoir-rises/issues"
            target="_blank"
            >https://github.com/theo-dep/your-reservoir-rises/issues</a
          >
        </li>
        <li>
          <strong>Email:</strong>
          <a href="mailto:devaucoup.to@gmail.com">devaucoup.to@gmail.com</a>
        </li>
      </ul>
      <p>
        <strong>For data deletion from the shared Google Sheet:</strong> Contact
        the sheet owner or use the email above to request removal of your
        specific climb records.
      </p>
    </section>

    <section>
      <h2>12. Compliance with Google Terms</h2>
      <p>
        This Application complies with
        <a href="https://policies.google.com/terms" target="_blank"
          >Google Terms of Service</a
        >
        and meets
        <a
          href="https://developers.google.com/terms/api-services-user-data-policy"
          target="_blank"
          >Google API Transparency Requirements</a
        >.
      </p>
    </section>

    <hr />

    <p class="footer-meta">
      <strong>Version:</strong> 1.0 | <strong>Date:</strong> March 2026<br />
      <strong>Project:</strong> Your Reservoir Rises (Open Source)
    </p>
  </div>
</template>

<script setup lang="ts">
import BackLink from "@/components/BackLink.vue";
</script>

<style scoped>
.privacy-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  line-height: 1.7;
}

h1 {
  font-family: var(--font-serif);
  font-size: 2.5rem;
  color: var(--c-text);
  margin-bottom: 0.5rem;
  border-bottom: 3px solid var(--c-accent);
  padding-bottom: 0.5rem;
}

.meta {
  color: var(--c-muted);
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

section {
  margin-bottom: 2.5rem;
}

h2 {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  color: var(--c-text);
  margin-top: 2.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--c-line);
  padding-bottom: 0.5rem;
}

h3 {
  font-size: 1.25rem;
  color: var(--c-text);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

p {
  margin-bottom: 1rem;
}

ul,
ol {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

li {
  margin-bottom: 0.5rem;
}

.warning {
  background: var(--c-warning-bg);
  border-left: 4px solid var(--c-warning);
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}

.warning p {
  margin-bottom: 0.5rem;
}

.warning ul {
  margin-top: 0.5rem;
  margin-bottom: 0;
}

.info {
  background: var(--c-info-bg);
  border-left: 4px solid var(--c-info);
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.9rem;
}

th,
td {
  border: 1px solid var(--c-line);
  padding: 0.75rem;
  text-align: left;
}

th {
  background-color: var(--c-accent);
  color: var(--c-bg);
  font-weight: 600;
}

tr:nth-child(even) {
  background-color: var(--c-muted-light);
}

code {
  background: var(--c-muted-bg);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: "Courier New", monospace;
  font-size: 0.9em;
  color: var(--c-accent);
}

pre {
  background: var(--c-bg);
  border: 1px solid var(--c-line);
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1rem 0;
}

pre code {
  background: transparent;
  color: var(--c-text);
  padding: 0;
}

a {
  color: var(--c-accent);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.check {
  color: var(--c-success);
}

.cross {
  color: var(--c-error);
}

hr {
  margin: 3rem 0;
  border: none;
  border-top: 1px solid var(--c-line);
}

.footer-meta {
  text-align: center;
  color: var(--c-muted);
  font-size: 0.9rem;
}
</style>
