# Project Context: henwoo-portfolio

Use this file as the first-read handoff doc for any new LLM/coding agent context.
Keep it short, current, and decision-focused.

## 1) Project Summary

- Purpose: Personal portfolio website for Henry (henwoo). Live at `henwoo.dev`.
- Framework: Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4.

## 2) Current UI State

- Compact single-column portfolio, approximately 940px wide, dark neutral background with restrained purple accents.
- Name, role, social icons, short introduction, and education appear first.
- Experience rows appear before two side-by-side project previews: Empluzzed and Yolobun Studios.
- Real captured project images are used. Generated versions remain available as alternate assets.
- Experience and archived projects open native dialogs with internal scrolling, focus restoration, and preserved document position.
- `StudioMotion.tsx` renders a subtle canvas particle/orbit background reacting to mouse and scroll. Content remains stationary.
- Local Windows preview: `npm run dev -- --webpack --hostname 127.0.0.1 --port 3001`.

## 3) Tech Snapshot

- Next.js 16.x · React 19.x · TypeScript 5.x · Tailwind CSS 4.x · ESLint 9.x
- Package manager: npm (`package-lock.json` is source of truth)
- Node requirement: **≥ 20.9.0** (use `nvm use 20.19.0`)

## 4) Local Runbook

```powershell
nvm use 20.19.0
npm ci
npm run dev       # http://localhost:3000
npm run build     # pre-push check
```

Detailed setup notes: `docs/SETUP_WINDOWS.md`

## 5) Key Paths

| Path | Purpose |
|---|---|
| `app/layout.tsx` | Root layout, metadata (title, OG) |
| `app/page.tsx` | Home page — introduction, experience, project grid, bio, footer |
| `app/ClientLayout.tsx` | Lightweight wrapper for page content |
| `app/globals.css` | CSS tokens, base styles |
| `components/Sidebar.tsx` | Left pane — name, nav, social icons |
| `components/BackgroundSparkles.tsx` | Layered star field + parallax |
| `components/SparkleTrail.tsx` | Canvas cursor sparkle trail |
| `components/About.tsx` | About section |
| `components/Experience.tsx` | Experience cards |
| `components/Projects.tsx` | Project cards that open project modal |
| `data/profile.json` | Name, tagline, about paragraphs, social URLs |
| `data/experience.json` | Experience entries (array) |
| `data/projectData.ts` | Typed project config + screenshot paths |

## 6) Known Issues / Notes

- None currently blocking.

## 7) Working Agreements

- Content updates → data files in `data/` (JSON or TS), never hardcode in components.
- Run `npm run build` before any push.
- Prefer targeted changes; no broad refactor/cleanup passes unless explicitly requested.
- Append session log entry every working session.

## 8) Session Log (Append Newest on Top)

### 2026-11-15 - Personal photography and project links

- Added user-supplied graduation photo beside the intro and four personal photos below the bio.
- Gallery uses consistent square CSS crops with per-image positioning, four columns desktop and two mobile. Original files are preserved.
- Bio includes linked Empluzzed and Yolobun names; both selected-work secondary links now visit live sites.
- Discussed muted MP4 product recordings with cursor/zoom editing; no demo videos have been recorded or integrated yet.


### 2026-11-15 - Restore complete experience history

- User clarified that the new experience information supplements existing entries; Creative Labs and Din Tai Fung remain important.
- Restored both entries with their original detail text, technologies, dates, and Din Tai Fung quote.
- Split the user's preferred introduction into two intentional lines, allowing natural wrapping on smaller screens.


### 2026-11-15 - Experience and Empluzzed content update

- Used the user's newly supplied experience information to add Keck, refresh Vitu, and correct UCLA research/student-organization titles.
- Curated the visible experience list to four relevant roles, with one-line summaries and fuller descriptions in dialogs.
- Updated Empluzzed's featured description and stack using user-supplied usage/feed figures and ingestion reliability work. Numeric claims are user-supplied, not independently verified.
- Updated introduction to reflect Keck as the current role. Prior Vitu intranet position remains dated June–August 2026.


### 2026-11-15 - Content-first portfolio simplification

- Replaced decorative full-screen opening with compact introduction and visible social links.
- Moved experience ahead of a straight, two-column project grid; retained non-expanding detail dialogs.
- Kept spatial background while removing foreground parallax and redundant animation observers.
- Replaced accumulated stylesheet overrides with a focused responsive stylesheet.
- Local review only; no push or deployment requested for this iteration.


### 2026-03-07 - UI Polish Pass

- Objective: Apply visual polish — sparkle color, icon hover, footer, tab title, galaxy background.
- Changes made:
  - `SparkleTrail.tsx`: Cursor sparkle fill `#7ef5d4` → `#ffffff`.
  - `Sidebar.tsx`: Social icon hover → `hover:text-white duration-200` (desktop + mobile).
  - `app/page.tsx`: Footer → `"made by henry"`.
  - `app/layout.tsx`: Title + OG title → `"henry nguyen"`.
  - `BackgroundSparkles.tsx`: Full rewrite — 85 stars, 3 parallax layers, per-star twinkle, no setInterval, no radial glow.
  - `docs/PROJECT_CONTEXT.md`: Overhauled for conciseness and accuracy.
- Node: installed `20.19.0` via nvm (required for Next.js 16).
- Outcomes: Clean build, no TS errors, pushed to GitHub → Vercel auto-deploys.

### 2026-02-16 - Windows Setup + Docs Baseline

- Objective: Rebuild project on Windows and establish durable handoff documentation.
- Files touched: README.md, package.json, scripts/docs-check.mjs, docs/PROJECT_CONTEXT.md
- Outcomes: Local environment works on Windows; docs workflow established.

---

## 9) Next Agent Start Prompt

1. Read `docs/PROJECT_CONTEXT.md` first.
2. Run `npm run build` to confirm clean state.
3. Check section 2 (Current UI State) and the session log for recent context.
4. Proceed with the user's request.
### 2026-11-15 - Interactive portrait photocards

- Changed personal gallery from square grid to overlapping 3:4 portrait photocards with slight rotations.
- Hover and keyboard focus lift, straighten, enlarge, and bring a photo to the front; mobile uses a staggered two-column layout.
- Clicking opens the original photo. Reduced-motion settings suppress transitions.
- Verified rendered aspect ratio, front stacking, focus transform, and TypeScript.
### 2026-11-15 - Photo dialogs and closer profile crop

- Gallery photos now open in native dialogs instead of new pages; close button, backdrop, and Escape dismiss them.
- Dialog cleanup restores focus and the exact saved scroll position.
- Header portrait uses a closer facial crop and a higher-resolution image request to avoid magnifying a thumbnail.
- Verified photo dialog scroll before/after stayed at 1179px; TypeScript and targeted lint passed.
### 2026-11-15 - Fifth gallery image and full-photo loading fix

- Added the supplied graduation photo as the first/leftmost photocard; retained all four existing images in order.
- Added fifth-card rotation and centered the final odd card in the mobile grid.
- Full-photo dialogs now load original assets eagerly, bypassing the image optimizer request that stalled for the last group image. Thumbnails retain optimization.
- Verified the last group photo decoded at 1536px natural width and displayed in its dialog.
