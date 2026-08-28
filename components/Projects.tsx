"use client";

import { useEffect, useRef, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import Image from "next/image";
import { projects } from "@/data/projectData";
import type { Project } from "@/data/projectData";
import ProjectModal from "@/components/ProjectModal";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    section.dataset.reveal = "pending";
    let revealTimer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        section.dataset.reveal = "visible";
        revealTimer = window.setTimeout(() => {
          delete section.dataset.reveal;
        }, 1200);
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(section);
    return () => {
      observer.disconnect();
      window.clearTimeout(revealTimer);
    };
  }, []);

  const openProject = (project: Project) => {
    setSelected(project);
    window.requestAnimationFrame(() => setIsModalOpen(true));
  };

  const closeProject = () => {
    setIsModalOpen(false);
    window.setTimeout(() => setSelected(null), 180);
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="projects"
        className="project-band mb-24 scroll-mt-24"
      >
        <div className="project-reveal-item mb-8 flex items-end justify-between gap-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-blue">
            Things I&apos;ve built
          </h2>
          <span className="hidden text-xs uppercase tracking-widest text-slate sm:block">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>
        <div className="grid gap-7 lg:grid-cols-2">
          {projects.map((project, i) => {
            const cardClassName =
              "project-reveal-item group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[rgba(14,14,22,0.64)] text-left shadow-[0_18px_70px_rgba(0,0,0,0.2)] backdrop-blur-md hover:-translate-y-1 hover:border-blue/30 hover:bg-[rgba(18,18,29,0.78)] hover:shadow-[0_24px_90px_rgba(35,45,110,0.2)]";
            const revealStyle = {
              ["--reveal-delay" as string]: `${120 + i * 90}ms`,
            };

            const cardContent = (
              <>
                <div className="relative aspect-[16/9] shrink-0 overflow-hidden border-b border-white/[0.07] bg-[#0d0d16]">
                  <Image
                    src={project.coverImage}
                    alt={`${project.title} cover artwork`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 490px"
                    className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b11]/55 via-transparent to-transparent" />
                  <span className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-lightest-slate backdrop-blur-md">
                    0{i + 1}
                  </span>
                </div>

                <div className="flex min-h-[13rem] flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-xl font-semibold leading-snug">
                    <span className="inline-flex items-center gap-2 text-white transition-colors group-hover:text-blue">
                      {project.title}
                      <FiChevronRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                    </span>
                  </h3>

                  <p
                    className={`mt-3 line-clamp-3 text-sm leading-relaxed text-light-slate ${
                      project.slug === "yolobun-studios" ? "" : "min-h-[4.5rem]"
                    }`}
                  >
                    {project.description}
                  </p>

                  {project.tech.length > 0 && (
                    <div className="mt-auto flex flex-wrap gap-2 pt-5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full border border-green/25 bg-green/[0.07] px-3 py-1 text-[11px] font-medium text-green"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </>
            );

            return (
              <button
                key={i}
                onClick={() => openProject(project)}
                className={cardClassName}
                style={revealStyle}
              >
                {cardContent}
              </button>
            );
          })}
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
