# Henry Nguyen — Portfolio

A clean, minimal, dark-themed personal portfolio website built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Inspired by [Brittany Chiang's portfolio](https://brittanychiang.com).

## ✨ Features

- **Sticky sidebar** with scroll-spy navigation
- **Cursor glow effect** that follows the mouse
- **Fully editable content** via JSON files (no code changes needed)
- **Responsive design** — sidebar collapses to a mobile header
- **Dark theme** with customisable colour tokens
- **Deployable on Vercel** with zero configuration

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ installed
- npm (comes with Node.js)

### Installation

```bash
# Clone the repository
git clone https://github.com/nothenrynguyen/henwoo-portfolio.git
cd henwoo-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📝 How to Edit Content

All personal content lives in the **`/data`** directory as JSON files. Edit them to customise the site — **no code changes required**.

### `data/profile.json`

Your name, tagline, about paragraphs, and social links.

| Field            | Description                                    |
| ---------------- | ---------------------------------------------- |
| `name`           | Your full name                                 |
| `tagline`        | Short subtitle / headline                      |
| `about`          | Array of paragraphs for About section          |
| `socialLinks`    | GitHub, LinkedIn, YouTube, SoundCloud URLs     |

### `data/experience.json`

Array of work / research experiences.

| Field          | Description                        |
| -------------- | ---------------------------------- |
| `title`        | Job title                          |
| `company`      | Company or organisation name       |
| `companyUrl`   | Link to the company                |
| `date`         | Date range string                  |
| `description`  | Array of bullet-point strings      |
| `technologies` | Array of tech stack tags           |

### `data/projects.json`

Array of projects.

| Field          | Description                                     |
| -------------- | ----------------------------------------------- |
| `title`        | Project name                                    |
| `image`        | Path to preview image in `/public/images/`      |
| `description`  | Short paragraph describing the project          |
| `technologies` | Array of tech stack tags                        |
| `github`       | GitHub repository URL                           |
| `demo`         | Live demo URL (**set to `null` if none**)       |

> **Tip:** If `experience.json` or `projects.json` is an empty array (`[]`), the section simply won't render.

### Images

Place project screenshots in **`/public/images/`** and reference them by path (e.g. `/images/my-project.png`).

---

## 🎨 Customising the Theme

All colours are defined as CSS custom properties in **`app/globals.css`** inside the `@theme` block:

```css
@theme {
  --color-navy: #06101f;
  --color-light-navy: #0e1e38;
  --color-lightest-navy: #1a2f4e;
  --color-slate: #8892b0;
  --color-light-slate: #a8b2d1;
  --color-lightest-slate: #ccd6f6;
  --color-white: #e6f1ff;
  --color-green: #64ffda;
}
```

Change any hex value and the entire site updates instantly.

---

## 🏗️ Project Structure

```
/app                 → Next.js App Router pages & layout
/components          → React components (Sidebar, About, etc.)
/data                → Editable JSON content files
/public/images       → Static images (project screenshots, etc.)
```

---

## 📦 Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

---

## 🚢 Deploy to Vercel

1. Push this repo to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new).
3. Import the repository.
4. Vercel auto-detects Next.js — just click **Deploy**.
5. Your site will be live at `https://your-project.vercel.app`.

No extra environment variables or configuration needed.

---

## 📄 License

MIT © Henry Nguyen
