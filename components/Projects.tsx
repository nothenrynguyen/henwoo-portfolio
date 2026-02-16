import Image from "next/image";
import { FiExternalLink } from "react-icons/fi";
import projectsData from "@/data/projects.json";

interface ProjectItem {
  title: string;
  image: string;
  description: string;
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
        {projects.map((project, i) => {
          const link = project.demo || project.github;
          return (
            <a
              key={i}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block rounded-lg border border-transparent p-5 transition-all lg:p-6 hover:border-[rgba(148,163,184,0.24)] hover:bg-[rgba(20,18,43,0.55)] hover:drop-shadow-lg"
            >
              {/* Image Preview — horizontal, wider */}
              <div className="mb-5 overflow-hidden rounded-md border-2 border-lightest-navy/30">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={560}
                  height={300}
                  className="h-auto w-full object-cover transition-opacity group-hover:opacity-80"
                  unoptimized
                />
              </div>

              {/* Title */}
              <h3 className="text-lg font-medium leading-snug">
                <span className="inline-flex items-center gap-2 text-white transition-colors group-hover:text-green">
                  {project.title}
                  <FiExternalLink className="inline-block h-4 w-4 shrink-0" />
                </span>
              </h3>

              {/* Description — single paragraph */}
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green border border-green/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
