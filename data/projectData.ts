export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  /** Artwork used by the portfolio grid. */
  coverImage: string;
  /** If set, the card links straight here instead of opening the modal. */
  externalUrl?: string;
  /** Paths relative to /public, e.g. "/images/foo.png" */
  screenshots: string[];
}

export const projects: Project[] = [
  {
    slug: "yolobun-studios",
    title: "Yolobun Studios",
    description: "A creative collective built on music, community, and culture.",
    tech: ["Creative", "Community", "Culture", "Coming Soon"],
    externalUrl: "https://yolobun.com",
    coverImage: "/images/project-covers/yolobun-studios-icons.svg",
    screenshots: [],
  },
  {
    slug: "app-expo",
    title: "App Expo",
    description:
      "A free, verified early-career job aggregator with fresh U.S. internship and new-grad roles, direct employer application links, and automated hourly data refreshes.",
    tech: ["Next.js", "TypeScript", "Cheerio", "GitHub Actions"],
    githubUrl: "https://github.com/nothenrynguyen/app-expo",
    demoUrl: "https://app-expo-one.vercel.app",
    coverImage: "/images/project-covers/app-expo-icons.svg",
    screenshots: [],
  },
  {
    slug: "only-friends",
    title: "Only Friends",
    description:
      "A privacy-first browser tool that reads Instagram data exports locally, compares follower and following lists, and organizes mutuals and mismatches for review or CSV export.",
    tech: ["React", "Vite", "TypeScript", "Vitest"],
    githubUrl: "https://github.com/nothenrynguyen/only-friends",
    demoUrl: "https://only-friends-lol.vercel.app",
    coverImage: "/images/project-covers/only-friends-icons.svg",
    screenshots: [],
  },
  {
    slug: "signalflow",
    title: "Signal Flow",
    description:
      "A real-time event analytics platform that ingests application events and visualizes live metrics through an interactive dashboard. Events are processed by a FastAPI backend, stored in Postgres, and streamed to a Next.js frontend via WebSockets for instant updates. Built as a lightweight observability system for tracking user activity and event throughput.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "TypeScript"],
    githubUrl: "https://github.com/nothenrynguyen/SignalFlow",
    demoUrl: "https://signal-flow-eta.vercel.app",
    coverImage: "/images/project-covers/signal-flow-icons.svg",
    screenshots: [
      "/images/signalflow%20dashboard.png",
      "/images/signalflow%20backend.png",
    ],
  },
  {
    slug: "matchadex",
    title: "Matcha Dex",
    description:
      "A full-stack cafe discovery platform where users can sign in with Google, leave detailed reviews, favorite cafes, and explore locations on an interactive map. Includes an admin moderation dashboard for importing, hiding, restoring, and deleting cafes in production.",
    tech: ["Next.js", "Supabase", "Prisma", "Mapbox", "TypeScript"],
    githubUrl: "https://github.com/nothenrynguyen/matchadex",
    demoUrl: "https://matchadex.vercel.app",
    coverImage: "/images/project-covers/matcha-dex-icons.svg",
    screenshots: [
      "/images/md1.png",
      "/images/md2.png",
      "/images/md3.png",
    ],
  },
  {
    slug: "stay-in-bloom",
    title: "Stay in Bloom",
    description:
      "A community digital flower garden where users can draw a flower, leave a message, and plant it for everyone to see. Built with React and Vite, backed by Supabase for real-time persistence, and deployed on Vercel.",
    tech: ["React", "Vite", "Supabase", "JavaScript", "CSS"],
    githubUrl: "https://github.com/nothenrynguyen/stay-in-bloom",
    demoUrl: "https://stay-in-bloom.vercel.app",
    coverImage: "/images/project-covers/stay-in-bloom-icons.svg",
    screenshots: [
      "/images/sib1.png",
      "/images/sib2.png",
      "/images/sib3.png",
      "/images/sib4.png",
    ],
  },
];
