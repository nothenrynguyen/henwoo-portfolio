"use client";

import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { projects } from "@/data/projectData";
import type { Project } from "@/data/projectData";
import ProjectModal from "@/components/ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selected) {
      setIsModalOpen(true);
    }
  }, [selected]);

  const openProject = (project: Project) => {
    setSelected(project);
  };

  const closeProject = () => {
    setIsModalOpen(false);
    window.setTimeout(() => setSelected(null), 180);
  };

  return (
    <>
      <section id="projects" className="mb-24 scroll-mt-24">
        <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-lightest-slate lg:hidden">
          Projects
        </h2>
        <div className="flex flex-col gap-12">
          {projects.map((project, i) => (
            <button
              key={i}
              onClick={() => openProject(project)}
              className="group relative block w-full rounded-lg border border-transparent p-5 text-left transition-all lg:p-6 hover:border-[rgba(148,163,184,0.24)] hover:bg-[rgba(20,18,43,0.55)] hover:drop-shadow-lg"
            >
              {/* Title */}
              <h3 className="text-lg font-medium leading-snug">
                <span className="inline-flex items-center gap-2 text-white transition-colors group-hover:text-green">
                  {project.title}
                  <FiChevronRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
              </h3>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-slate line-clamp-3">
                {project.description}
              </p>

              {/* Tech tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green border border-green/40"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <ProjectModal
          project={selected}
          isOpen={isModalOpen}
          onClose={closeProject}
        />
      )}
    </>
  );
}
