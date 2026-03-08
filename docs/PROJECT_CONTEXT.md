# Project Context: henwoo-portfolio

Use this file as the first-read handoff doc for any new LLM/coding agent context.
Keep it short, current, and decision-focused.

## 1) Project Summary

- Purpose: Personal portfolio website for Henry (henwoo). Live at `henwoo.dev`.
- Framework: Next.js 16 App Router · React 19 · TypeScript · Tailwind CSS 4.

## 2) Current UI State

- **Tab title:** `"henry nguyen"`
- **Footer:** `"made by henry"`
- **Cursor:** White 4-point sparkle trail (`SparkleTrail.tsx`, canvas-based)
- **Background stars:** 85 stars across 3 depth layers with per-star twinkle timing and subtle RAF-based parallax on mouse move (`BackgroundSparkles.tsx`). No radial glow.
- **Social icons:** Default `text-slate`, hover → `text-white` with 200 ms transition.
- **Sections (right pane):** About → Experience → Projects (all data-driven from `data/*.json`)

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
| `app/page.tsx` | Home page — composes Sidebar + sections + footer |
| `app/ClientLayout.tsx` | Client wrapper — mounts `BackgroundSparkles` |
| `app/globals.css` | CSS tokens, base styles |
| `components/Sidebar.tsx` | Left pane — name, nav, social icons |
| `components/BackgroundSparkles.tsx` | Layered star field + parallax |
| `components/SparkleTrail.tsx` | Canvas cursor sparkle trail |
| `components/About.tsx` | About section |
| `components/Experience.tsx` | Experience cards |
| `components/Projects.tsx` | Project cards with images |
| `data/profile.json` | Name, tagline, about paragraphs, social URLs |
| `data/experience.json` | Experience entries (array) |
| `data/projects.json` | Project cards (array) |

## 6) Known Issues / Notes

- Non-blocking build warning: `metadataBase` not set (safe to ignore for now).

## 7) Working Agreements

- Content updates → `data/*.json` only, never hardcode in components.
- Run `npm run build` before any push.
- Prefer targeted changes; no broad refactor/cleanup passes unless explicitly requested.
- Append session log entry every working session.

## 8) Session Log (Append Newest on Top)

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
