# Front Runner Restoration

Marketing site for Front Runner Restoration, a 24/7 property restoration company serving Florida (water, fire, mold, and storm damage). React + Vite frontend with a small Express backend for the contact form and AI chat widget.

## Project structure

```
client/   React + Vite frontend
server/   Express API (contact form email, chat widget)
```

## Requirements

- Node.js 18+

## Setup

Install dependencies for the root, client, and server:

```
npm install
npm install --prefix client
npm install --prefix server
```

Create `server/.env` with the following variables:

```
PORT=4000
CLIENT_ORIGIN=http://localhost:5173

# Chat widget (Google Gemini)
GEMINI_API_KEY=
GEMINI_MODEL=gemini-3.5-flash

# Contact form email via Resend (https://resend.com) — optional, logs to console if omitted
RESEND_API_KEY=
RESEND_FROM=onboarding@resend.dev
CONTACT_RECIPIENT=
```

## Development

Run both the client and server together from the root:

```
npm run dev
```

This starts the Vite dev server (client, default `http://localhost:5173`) and the Express API (server, default `http://localhost:4000`) concurrently.

Or run them individually:

```
npm run dev:client
npm run dev:server
```

## Build

```
npm run build
```

Builds the client for production into `client/dist`.
