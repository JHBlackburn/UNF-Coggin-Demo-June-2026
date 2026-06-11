# Build Prompt: Earth Defense Comms Command Center

Build a polished React Router app called **Earth Defense Comms Command Center**.

This is a non-commercial, movie-inspired Morse Code toy app. Do **not** use copyrighted images, movie banners, logos, character names, exact movie quotes, or official assets.

Instead, create an original dark sci-fi command-center experience that strongly evokes a 1990s alien-invasion emergency broadcast console: radar sweeps, terminal panels, signal uplinks, classified-looking status cards, red/white/blue alert accents, transmission meters, “Earth Defense” language, and dramatic UI copy.

The app should feel like humanity is trying to broadcast one final emergency signal.

---

## Core Goal

Convert plain text messages into **Morse Code** dots and dashes.

After conversion, the user can:

1. Copy the Morse message to clipboard.
2. Play the Morse message as audio.
3. Stop playback.

Do **not** implement email sending, SendGrid, server-side email routes, or email settings in this version. Keep the scope tight.

---

## Tech Stack

Use:

* React Router framework mode
* TypeScript
* Tailwind CSS
* `@ozdemirburak/morse-code-translator` for Morse encoding and audio support where practical
* Vitest for unit tests
* Playwright for e2e tests

If starting from scratch, create the app in the current directory using the current official React Router framework-mode scaffold.

Do not reinvent the wheel where mature packages already exist.

---

## Security / Scope Requirements

* No secrets in the repo.
* No API keys.
* No SendGrid.
* No backend email route.
* No client-side secret handling.
* No unnecessary server-side complexity.
* Keep this as a fast, polished, frontend-focused Morse transmission app.

---

## App Name

**Earth Defense Comms Command Center**

---

## Routes / Screens

Create these routes or their React Router framework-mode equivalents:

1. `/`
   Main transmitter console.

2. `/settings`
   Local playback and app preference settings.

---

## Main Screen Requirements

The main screen should have a dark command-center theme.

Include:

* Header: `Earth Defense Comms Command Center`
* Subheading vibe: `Convert civilian text into emergency dots-and-dashes transmission format.`
* Textarea for plain text input.
* Live Morse output panel.
* Dramatic but original UI language.

Buttons:

* `Encode Signal`
* `Copy Transmission`
* `Play Signal`
* `Stop Signal`

Show success/error states with themed language, but keep errors useful and clear.

Disable copy/play/stop when there is no Morse output or no active transmission.

Add a visual `signal lamp`, `transmission beacon`, or similar visual indicator that animates while playing.

Add a status console showing states like:

* `SYSTEM READY`
* `SIGNAL ENCODED`
* `TRANSMITTING`
* `TRANSMISSION COPIED`
* `TRANSMISSION HALTED`
* `NO SIGNAL DETECTED`

---

## Settings Screen Requirements

The settings screen should visually match the command-center theme.

Provide local user preferences stored in `localStorage`:

* Playback speed
* Tone frequency
* Volume
* Optional default starting message

Provide a reset button to restore default settings.

Do not include email settings, SendGrid settings, API key fields, or anything related to sending messages externally.

---

## Morse Code Behavior

Convert text to International Morse Code.

Use `/` between words.

Example:

```txt
Input:
HELLO WORLD

Output:
.... . .-.. .-.. --- / .-- --- .-. .-.. -..
```

Requirements:

* Preserve a clear distinction between character spacing and word spacing.
* Normalize input reasonably.
* Handle common punctuation if supported by the package.
* For unsupported characters, do not crash.
* Either omit unsupported characters or replace them with a clear placeholder, but make the behavior consistent and tested.
* Create a thin wrapper around the Morse package so the rest of the app does not depend directly on package-specific quirks.

---

## Playback Behavior

Prefer the Morse package’s audio functionality if it supports the needed UX cleanly.

If custom playback is needed for speed/frequency/volume/visual sync, implement a small Web Audio API service behind a clean interface.

Requirements:

* Playback must be stoppable.
* Playback must not start on page load.
* Playback should require user interaction.
* Visual beacon should show active transmitting state while audio plays.
* Playback settings should respect local settings for speed, tone frequency, and volume.
* Keep playback code DRY and isolated from React components.

---

## Code Quality Requirements

Use well-named variables, functions, components, and files.

Prefer self-documenting code over comments.

Use comments only where they explain non-obvious browser/audio behavior.

Follow DRY principles.

Separate concerns:

* Morse conversion utilities
* Playback utilities
* Settings utilities
* UI components

Do not put all logic in one route file.

Use clear TypeScript types.

Avoid `any` unless there is a strong reason.

---

## Suggested Structure

Use this structure or a clean React Router framework-mode equivalent:

```txt
app/
  components/
    CommandShell.tsx
    SignalInput.tsx
    MorseOutputPanel.tsx
    TransmissionControls.tsx
    SignalBeacon.tsx
    StatusConsole.tsx
    SettingsPanel.tsx

  lib/
    morse/
      morseEncoder.ts
    playback/
      morsePlayback.ts
    settings/
      localSettings.ts

  routes/
    _index.tsx
    settings.tsx

  styles/
    tailwind.css

docs/
  vibe-coding-log.txt

prompts/
  initial-instructions.md
```

Adjust filenames if the selected React Router scaffold expects a different convention.

---

## Testing Requirements

Add unit tests with Vitest for:

* Plain text to Morse conversion.
* Word separator behavior.
* Empty input behavior.
* Unsupported character behavior.
* Settings serialization/deserialization helpers.
* Playback timing generation if custom playback timing is implemented.
* Default settings behavior.
* Reset settings behavior.

Add Playwright e2e tests for:

1. User can enter text and see Morse output.
2. User can copy Morse output.
3. User can open settings and save local playback preferences.
4. User can return to the main console and see settings applied.
5. Empty input disables or blocks copy/play actions.
6. Visual transmitting state appears when play is triggered.
7. Stop button halts transmission state.
8. User can reset settings to defaults.

---

## Developer Scripts

Add or verify these scripts:

```json
{
  "scripts": {
    "dev": "...",
    "build": "...",
    "test": "...",
    "test:e2e": "...",
    "lint": "...",
    "typecheck": "..."
  }
}
```

Use the correct commands for the actual project scaffold.

---

## README Requirement

Create or update `README.md`.

The README must include clear instructions for starting the app locally in **Visual Studio Code**.

The README should be useful for someone who has never opened this repo before.

Include these sections:

### Project Overview

Briefly describe:

* What **Earth Defense Comms Command Center** does.
* That it converts plain text to Morse Code.
* That it supports copy, audio playback, and stopping playback.
* That this version intentionally does not include email sending or SendGrid.

### Prerequisites

List required tools and include direct download links:

* Visual Studio Code: `https://code.visualstudio.com/download`
* Node.js LTS: `https://nodejs.org/en/download`
* Git: `https://git-scm.com/downloads`
* GitHub CLI, optional but recommended for pull requests: `https://cli.github.com/`

### Recommended VS Code Extensions

List helpful extensions with marketplace links:

* ESLint: `https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint`
* Prettier: `https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode`
* Tailwind CSS IntelliSense: `https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss`
* Playwright Test for VS Code: `https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright`

### Clone and Open in VS Code

Include commands like:

```bash
git clone <REPO_URL>
cd <REPO_FOLDER>
code .
```

If the actual repo URL is known, use it. Otherwise, leave `<REPO_URL>` as a placeholder.

### Install Dependencies

Include:

```bash
npm install
```

### Start the App Locally

Include:

```bash
npm run dev
```

Explain that the app will print a local URL in the terminal, usually something like:

```txt
http://localhost:5173
```

Tell the user to open that URL in a browser.

### Run Unit Tests

Include:

```bash
npm run test
```

### Run Playwright E2E Tests

Include:

```bash
npm run test:e2e
```

If Playwright requires browser installation, include:

```bash
npx playwright install
```

### Typecheck, Lint, and Build

Include:

```bash
npm run typecheck
npm run lint
npm run build
```

### Troubleshooting

Include short notes for common issues:

* If `code .` does not work, install the VS Code shell command from the Command Palette.
* If dependencies fail, confirm Node.js LTS is installed.
* If Playwright fails because browsers are missing, run `npx playwright install`.
* If audio does not play, confirm the browser allowed playback after a user interaction.
* If settings do not persist, confirm localStorage is enabled in the browser.

---

## Prompt Archive Requirement

Create a checked-in markdown file containing these full build instructions.

File location:

```txt
prompts/initial-instructions.md
```

Requirements:

* Create a folder named `prompts` if it does not already exist.
* Add a markdown file named `initial-instructions.md`.
* Copy these complete build instructions into that file.
* The file should preserve the markdown structure, headings, bullets, code blocks, and acceptance criteria.
* This file must be committed with the rest of the work.
* Include this file in the pull request.

---

## Vibe Coding Event Log Requirement

Create a checked-in text log file documenting this build session.

File location:

```txt
docs/vibe-coding-log.txt
```

The file must be committed with the rest of the work.

At the very top of the file, include:

* Event name: `Earth Defense Comms Command Center Build`
* Start timestamp in ISO 8601 format
* End timestamp in ISO 8601 format
* Total duration in minutes and seconds
* Branch name
* Pull request URL, once available

Then include a concise build log with broad-strokes entries, not noisy terminal spam.

The log should capture:

* Initial project setup/scaffold decisions
* Packages added
* Major app features implemented
* Morse conversion implementation
* Playback implementation
* Copy-to-clipboard implementation
* Settings/localStorage implementation
* Unit tests added
* Playwright e2e tests added
* Build/test/lint/typecheck results
* README/local startup instructions added
* Added `prompts/initial-instructions.md` to preserve the original build prompt
* Any known limitations or follow-up items

Example format:

```txt
Earth Defense Comms Command Center Build
Start: 2026-06-11T14:05:00-04:00
End: 2026-06-11T14:42:31-04:00
Duration: 37m 31s
Branch: feature/earth-defense-comms-command-center
Pull Request: https://github.com/OWNER/REPO/pull/123

Summary:
- Created React Router framework-mode app with TypeScript and Tailwind.
- Built dark sci-fi command-center UI with original Earth Defense theming.
- Added text-to-Morse conversion using a dedicated Morse utility wrapper.
- Added copy, playback, and stop transmission flows.
- Added local settings for playback speed, frequency, volume, and optional default starting message.
- Added Vitest unit coverage for conversion, settings, playback timing, and defaults.
- Added Playwright e2e coverage for main user flows.
- Added README instructions for starting the app locally in Visual Studio Code.
- Added prompts/initial-instructions.md to preserve the original build prompt.
- Verified build, typecheck, lint, unit tests, and e2e tests.

Known follow-ups:
- Add email transmission later if time allows.
```

Timing instructions:

* Record the start timestamp before beginning implementation work.
* Record the end timestamp after final verification and before opening the pull request.
* Calculate and write the duration manually or with a small script.
* Keep the log human-readable.

---

## Git / Pull Request Requirement

Create a new branch named:

```txt
feature/earth-defense-comms-command-center
```

Commit all changes, including:

```txt
docs/vibe-coding-log.txt
README.md
prompts/initial-instructions.md
```

Push the branch.

Create a pull request against the default branch.

Use the GitHub CLI if available:

```bash
gh pr create
```

Pull request title:

```txt
Build Earth Defense Comms Command Center
```

Pull request body should include:

* Summary of completed work
* Test results
* Note that email/SendGrid was intentionally excluded from this scoped version
* Direct link to `docs/vibe-coding-log.txt`
* Direct link to `README.md`
* Direct link to `prompts/initial-instructions.md`
* Note that `README.md` includes local startup instructions for Visual Studio Code

At the end of the task, output:

* Pull request URL
* Direct GitHub link to `docs/vibe-coding-log.txt` in the PR branch
* Direct GitHub link to `README.md` in the PR branch
* Direct GitHub link to `prompts/initial-instructions.md` in the PR branch
* Final duration from the log file

If the GitHub CLI is unavailable or authentication is missing, still create the branch and commit locally, then provide the exact commands needed to push the branch and create the PR manually.

Do not claim the PR was created unless it actually was.

---

## Acceptance Criteria

The app is complete when:

* App builds successfully.
* No SendGrid/email implementation exists in this version.
* No secrets or API keys are added.
* Morse conversion works.
* Copy works.
* Play/stop works.
* Local settings work.
* Unit tests pass.
* Playwright e2e tests pass.
* UI feels like a high-drama alien-invasion command center while remaining original and not using protected movie assets.
* `README.md` exists.
* `README.md` explains how to start the app locally in Visual Studio Code.
* `README.md` includes download links for VS Code, Node.js LTS, Git, and optional GitHub CLI.
* `README.md` includes commands for install, dev, test, e2e, typecheck, lint, and build.
* `prompts/initial-instructions.md` exists.
* `prompts/initial-instructions.md` contains the complete original build instructions.
* The prompt archive file is committed with the app code.
* `docs/vibe-coding-log.txt` exists.
* The log contains start timestamp, end timestamp, duration, branch name, and PR URL.
* The log summarizes the broad strokes of the build.
* The log is committed with the app code.
* A pull request is created if GitHub CLI/authentication is available.
* Final response includes the PR link, direct link to the checked-in log file, direct link to the README, and direct link to `prompts/initial-instructions.md`, or exact manual PR commands if PR creation was blocked.
