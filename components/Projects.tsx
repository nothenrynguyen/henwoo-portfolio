import Image from "next/image";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import projectsData from "@/data/projects.json";

interface ProjectItem {
  title: string;
  image: string;
  description: string[];
  technologies: string[];
  github: string;
  demo: string | null;
}

export default function Projects() {
  const projects: ProjectItem[] = projectsData;

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="mb-24 scroll-mt-24">
      <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-lightest-slate lg:hidden">
        Projects
      </h2>
      <div className="flex flex-col gap-12">
        {projects.map((project, i) => (
          <div
            key={i}
            className="group relative grid gap-4 rounded-lg p-5 transition-all sm:grid-cols-8 sm:gap-8 lg:p-6 lg:hover:bg-light-navy/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg"
          >
            {/* Image Preview */}
            <div className="overflow-hidden rounded-md border-2 border-light-navy sm:col-span-2">
              <Image
                src={project.image}
                alt={project.title}
                width={200}
                height={120}
                className="h-auto w-full object-cover transition-opacity group-hover:opacity-80"
                unoptimized
              />
            </div>

            {/* Content */}
            <div className="sm:col-span-6">
              <h3 className="font-medium leading-snug">
                <span className="inline-flex items-center gap-2 text-lightest-slate transition-colors group-hover:text-green">
                  {project.title}
                </span>
              </h3>

              <ul className="mt-3 flex flex-col gap-2">
                {project.description.map((point, j) => (
                  <li key={j} className="text-sm leading-relaxed text-slate">
                    • {point}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mt-4 flex gap-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate transition-colors hover:text-lightest-slate"
                  aria-label={`${project.title} GitHub`}
                >
                  <FiGithub size={18} />
                </a>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-slate transition-colors hover:text-lightest-slate"
                    aria-label={`${project.title} Live Demo`}
                  >
                    <FiExternalLink size={18} />
                    <span className="text-xs">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
