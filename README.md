# web-project-deadlock-protocol
Deadlock Protocol, is an interactive coding-based murder mystery platform. Instead of simply solving coding problems, players write code (in languages like Python, C++, or Java) where the program’s output itself becomes the clue to progress through the story.

## Project summary
- Interactive puzzle platform where users solve chapter/question challenges by writing code.
- Languages supported by the backend runner: JavaScript, Python, C, C++, Java.

## Repository layout
- `backend/` — Node/Express API, contains `server.js`, `db.js`, and temporary runner files.
- `frontend/` — Vite + React app (entry in `src/`) that provides the UI and code editor.
- `package.json` — small root manifest (project-level scripts may be present).

## Prerequisites
- Node.js (16+) and npm installed.
- For running native languages: `gcc`/`g++` (for C/C++), `python` on PATH, and a JDK (`javac` + `java`) for Java.

## Quick start (development)
1. Backend
   - Open a terminal, change to the backend folder and install deps:

	   cd backend
	   npm install

   - Start the server (development):

	   node server.js

	 (Or for auto-reload during development, use `npx nodemon server.js` if `nodemon` is available.)

   - The backend listens on port `5000` by default.

2. Frontend
   - Open a second terminal, change to the frontend folder and install deps:

	   cd frontend
	   npm install

   - Start the Vite dev server:

	   npm run dev

   - The frontend will open on Vite's default port (typically `5173`).

## Important API endpoints (backend)
- `GET /` — health check (returns "Backend running").
- `POST /run-test` — run submitted code; request body: `{ language, code, input? }`.
- `POST /submit` — submit code for a chapter/question (authenticated).
- `POST /signup`, `POST /login` — user auth endpoints; other auth-protected endpoints require a Bearer token header.

## Security & development notes
- The backend executes user-provided code by spawning local processes. This is powerful but risky — do not expose the runner to untrusted users without sandboxing (containerization, resource limits, strict timeouts, and input validation).
- Temporary files are written to `backend/temp/` during execution. Clean or isolate this directory in production.
- Tests have a short timeout (5s) — long-running or blocking user code may be terminated.
