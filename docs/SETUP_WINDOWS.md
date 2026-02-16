# Windows Setup and Runbook

## Prerequisites

- Node.js 24.x LTS or newer
- npm 11+
- Git

Check versions:

```powershell
node -v
npm -v
git --version
```

## Fresh Setup

1. Clone:

```powershell
git clone https://github.com/<your-username>/henwoo-portfolio.git
cd henwoo-portfolio
```

2. Install dependencies:

```powershell
npm ci
```

3. Start dev server:

```powershell
npm run dev
```

4. Open:

`http://localhost:3000`

## Common Commands

```powershell
# development server
npm run dev

# production build
npm run build

# production server
npm run start

# lint
npm run lint

# verify project handoff docs
npm run docs:check
```

## Rebuild on Any Machine

```powershell
git pull
npm ci
npm run build
npm run dev
```

If dependencies get out of sync:

```powershell
Remove-Item -Recurse -Force node_modules
npm ci
```

## Handoff Docs

- `docs/PROJECT_CONTEXT.md`: LLM/agent context and session log
