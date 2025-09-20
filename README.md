# JobFusion

A **mini hiring platform** built with **React + Vite (JavaScript)**, using **Dexie (IndexedDB)** for storage and **MSW** to simulate a backend with realistic latency and write failures. Features include Jobs management, a Candidates Kanban with drag-and-drop, a virtualized Candidates table, and an Assessment Builder.

---

## 1. Setup

### Prerequisites
- Node.js **18+** and npm
- Modern browser (Chrome/Edge/Firefox)

### Install & Run
```bash
# from project root (talentFlow/)
npm install

# generate MSW worker ONCE
npx msw init public --save

# start dev server
npm run dev


Open the printed URL (usually http://localhost:5173).

Branding

App name: JobFusion

index.html → <title>JobFusion</title>

Optional per-page titles via src/app/useDocumentTitle.js.

Data Seeding

On first load, the app seeds:

25 jobs (active + archived)

1,000 candidates randomly assigned to jobs & stages (+ timelines)

≥3 assessments with 12 questions each

Seeding runs via ensureSeeded() (Dexie) and is guarded by a localStorage flag (tf_seeded_v2).

Reseed (if counts changed):

DevTools → Application → IndexedDB → delete database talentflow

DevTools → Application → Local Storage → remove tf_seeded_v2

Reload the page
OR bump the flag key in src/db/seed.js.

#Script: 
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}

Optional: add "lint" or "test" scripts later.

#2. Architecture
##High-Level

React (Vite)
│
├─ React Router           → routes & pages
├─ @tanstack/react-query  → data fetching/cache/status
├─ MSW (Mock Service Worker)
│    └─ /api/handlers/*   → mock endpoints (adds latency & write failures)
├─ Dexie (IndexedDB)
│    ├─ /db/talentflow.js → schema & tables
│    ├─ /db/seed.js       → ensureSeeded()
│    └─ /db/seedData/*    → jobs, candidates, assessments
└─ UI
     ├─ Jobs: CRUD, archive, reorder
     ├─ Candidates: Kanban (dnd-kit) + Virtualized List (tanstack/virtual)
     └─ Assessment Builder: schema editor


#Key Folders
src/
├─ app/            # main.jsx, router.jsx, queryClient, useDocumentTitle
├─ api/            # msw.js + domain handlers
├─ db/             # dexie schema, seeding, data generators
├─ features/
│  ├─ jobs/
│  ├─ candidates/  # Kanban.jsx, CandidatesVirtualTable.jsx, page
│  └─ assessments/
├─ components/     # Spinner, ErrorBanner, Pagination
├─ styles/         # globals.css (+ optional tokens.css)
└─ utils/          # sleep.js (latency & failure), rand.js/randish.js


#Data Model (Dexie)

jobs: {
  id, title, slug, status, order, tags[], createdAt
}

candidates: {
  id, name, email, jobId, stage, location, skills[], years, salary, createdAt, updatedAt
}

timelines: {
  id, candId, jobId, stage, note, at
}

assessments: {
  jobId, schema: { title, questions[] }
}


Data Flow

UI triggers React Query call → MSW handler (HTTP-like)

Handler waits 200–1200ms and may throw 5–10% errors for writes

Handler performs Dexie reads/writes

UI shows loading / success / error states

State Management

React Query caches server shapes and mutations

Local UI state is minimal (filters, dialogs, form values)


3. Technical Decisions

Client-only stack (Dexie + MSW) → fast iteration + realistic flows

React Query → consistent loading/error handling, easy retries

dnd-kit → Kanban drag-and-drop

Virtualized list → scales to 1k+ candidates smoothly

BulkPut for seeding → avoids duplicate-key errors

Responsive CSS → mobile Kanban uses horizontal swipe, desktop fits 6 columns

Write-failure injection → only on mutations to simulate realistic errors




4. Known Issues & Workarounds

Chrome extension noise: Use Incognito / disable extensions

MSW worker MIME error: Run npx msw init public --save & restart dev server

Not seeing seeded data: Clear IndexedDB + seed flag or bump flag in seed.js

Kanban column overflow: Use flex layout or scrollable columns



5. Styling & UX Guidelines

Optional tokens.css for colors, spacing, shadows

Tables collapse to card rows on mobile

Filter bars wrap on mobile

Kanban: .kanban, .kanban-col, .kanban-tile for styling

Accessibility: :focus-visible, aria-label/role, contrast ≥ 4.5:1


6. Performance Notes

Virtualization prevents DOM bloat

React Query: set staleTime to reduce refetch, limit retry

Use SVGs for icons, avoid large assets




7. Troubleshooting

Module export errors: Check import names, restart Vite

Service worker stuck: DevTools → Application → Service Workers → Unregister

Seeding loops: Wrap in try/catch, mark flag in finally, bulkPut, retry after clearing IndexedDB



8. Future Enhancements

Real backend + auth

Server-side pagination & filtering

Richer Assessment Builder (preview, validation, scoring)

Export/import demo data (CSV/JSON)

Tests (unit, component, E2E)

CI: lint/test/build on push

9. License

MIT (update as needed)
# JobFusion

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.6.14-brightgreen)

A **mini hiring platform** built with **React + Vite (JavaScript)**, using **Dexie (IndexedDB)** for storage and **MSW** to simulate a backend with realistic latency and write failures. Features include Jobs management, a Candidates Kanban with drag-and-drop, a virtualized Candidates table, and an Assessment Builder.

---

## Demo

*Open locally after setup* → http://localhost:5173

*Optional*: Add screenshots here using:

```markdown
![JobFusion Dashboard](path/to/screenshot.png)



Quick Start Checklist
npm install
npx msw init public --save
# Verify ensureSeeded() → 25 jobs / 1,000 candidates / ≥3 assessments
# If counts changed → clear IndexedDB + seed flag
npm run dev
