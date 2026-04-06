export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  githubUrl: string;
  demoUrl?: string;
  /** Paths relative to /public, e.g. "/images/foo.png" */
  screenshots: string[];
}

export const projects: Project[] = [
  {
    slug: "signalflow",
    title: "Signal Flow",
    description:
      "A real-time event analytics platform that ingests application events and visualizes live metrics through an interactive dashboard. Events are processed by a FastAPI backend, stored in Postgres, and streamed to a Next.js frontend via WebSockets for instant updates. Built as a lightweight observability system for tracking user activity and event throughput.",
    tech: ["Next.js", "FastAPI", "PostgreSQL", "WebSockets", "TypeScript"],
    githubUrl: "https://github.com/nothenrynguyen/SignalFlow",
    demoUrl: "https://signalflow-dashboard.vercel.app/",
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
    screenshots: [
      "/images/sib1.png",
      "/images/sib2.png",
      "/images/sib3.png",
      "/images/sib4.png",
    ],
  },
];
