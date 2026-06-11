# Earth Defense Comms Command Center

## Project Overview

Earth Defense Comms Command Center is a polished React Router app for converting plain text into International Morse Code. It supports copying the encoded transmission, playing the Morse signal as browser audio, and stopping playback.

This version intentionally does not include email sending, SendGrid, API keys, or external message delivery. It is a fast, frontend-focused Morse transmission console.

## Prerequisites

Install these tools before opening the project:

- Visual Studio Code: <https://code.visualstudio.com/download>
- Node.js LTS: <https://nodejs.org/en/download>
- Git: <https://git-scm.com/downloads>
- GitHub CLI, optional but recommended for pull requests: <https://cli.github.com/>

## Recommended VS Code Extensions

- ESLint: <https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint>
- Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
- Tailwind CSS IntelliSense: <https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss>
- Playwright Test for VS Code: <https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright>

## Clone and Open in VS Code

```bash
git clone https://github.com/JHBlackburn/UNF-Coggin-Demo-June-2026.git
cd UNF-Coggin-Demo-June-2026
code .
```

## Install Dependencies

```bash
npm install
```

## Start the App Locally

```bash
npm run dev
```

The app will print a local URL in the terminal, usually:

```txt
http://localhost:5173
```

Open that URL in a browser.

## Run Unit Tests

```bash
npm run test
```

## Run Playwright E2E Tests

Install Playwright browsers the first time you run the e2e suite:

```bash
npx playwright install
```

Then run:

```bash
npm run test:e2e
```

## Typecheck, Lint, and Build

```bash
npm run typecheck
npm run lint
npm run build
```

## Troubleshooting

- If `code .` does not work, open the VS Code Command Palette and install the shell command.
- If dependencies fail, confirm Node.js LTS is installed.
- If Playwright fails because browsers are missing, run `npx playwright install`.
- If audio does not play, confirm the browser allowed playback after a user interaction.
- If settings do not persist, confirm localStorage is enabled in the browser.
