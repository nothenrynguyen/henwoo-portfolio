# Project Context: henwoo-portfolio

Use this file as the first-read handoff doc for any new LLM/coding agent context.
Keep it short, current, and decision-focused.

## 1) Project Summary

- Purpose: Personal portfolio website for Henry (henwoo).
- Primary framework: Next.js App Router with React + TypeScript.
- Deployment target: `henwoo.dev`.

## 2) Current Goals

- [ ] Keep portfolio content and experience sections up to date.
- [ ] Improve UX/visual polish and responsiveness.
- [ ] Maintain reliable local setup across macOS/Windows.

## 3) Tech Snapshot

- Next.js 16.x
- React 19.x
- TypeScript 5.x
- Tailwind CSS 4.x
- ESLint 9.x
- Package manager: npm (`package-lock.json` is source of truth)

## 4) Local Runbook

```powershell
npm ci
npm run dev
```

Build check:

```powershell
npm run build
```

Detailed setup notes:

- `docs/SETUP_WINDOWS.md`

## 5) Key Paths

- `app/layout.tsx`: Root layout and metadata
- `app/page.tsx`: Home page composition
- `app/globals.css`: Global styles
- `components/`: UI sections/components
- `data/profile.json`: Profile content
- `data/experience.json`: Experience content
- `data/projects.json`: Project cards/content

## 6) Known Issues / Notes

- Non-blocking warning during build: `metadataBase` not set in Next metadata.
- Keep this section current; remove resolved issues and note fix commit.

## 7) Working Agreements

- Prefer small, testable changes.
- Run `npm run build` before shipping notable updates.
- Keep content updates in `data/*.json` where possible.

## 8) Session Log (Append Newest on Top)

### 2026-02-16 - Windows Setup + Docs Baseline

- Objective: Rebuild project on Windows and establish durable handoff documentation.
- Changes made: Expanded README with Windows setup and added docs checker script.
- Files touched: README.md, package.json, scripts/docs-check.mjs, docs/PROJECT_CONTEXT.md
- Commands run: npm ci, npm run build, npm run docs:check
- Outcomes: Local environment works on Windows; handoff docs workflow is in place.
- Next steps: Keep this log updated every working session.

### YYYY-MM-DD - Session Title

- Objective:
- Changes made:
- Files touched:
- Commands run:
- Outcomes:
- Next steps:

---

## 9) Next Agent Start Prompt

When starting a fresh context, provide this file and ask the agent to:

1. Read `docs/PROJECT_CONTEXT.md` first.
2. Validate setup with `npm ci` and `npm run build`.
3. Confirm open goals and propose the next highest-impact task.
