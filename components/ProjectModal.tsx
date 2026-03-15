"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { FiX, FiGithub, FiExternalLink } from "react-icons/fi";
import type { Project } from "@/data/projectData";

interface ProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      {/* Backdrop — click outside to close */}
      <div
        className={`fixed inset-0 z-50 bg-[rgba(13,11,26,0.58)] backdrop-blur-sm transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      />

      {/* Centered modal shell */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
        onClick={onClose}
      >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex h-full max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl
                    border border-[rgba(100,255,218,0.12)] bg-[rgba(16,14,30,0.8)] shadow-2xl
                    ring-1 ring-[rgba(255,255,255,0.03)] backdrop-blur-xl
                    transition-all duration-200 ${
                      isOpen
                        ? "translate-y-0 scale-100 opacity-100"
                        : "translate-y-1 scale-[0.985] opacity-0"
                    }`}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4
                        border-b border-[rgba(100,255,218,0.08)]
                        bg-[rgba(16,14,30,0.86)] px-6 py-5 backdrop-blur-xl">
          <h2 className="text-xl font-bold tracking-tight text-[#ccd6f6]">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1.5 text-[#8892b0] transition-colors
                       hover:bg-[rgba(100,255,218,0.08)] hover:text-[#ccd6f6]"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="flex flex-col gap-6">

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded border border-[rgba(100,255,218,0.4)]
                         bg-[rgba(100,255,218,0.08)] px-4 py-2 text-sm font-medium
                         text-[#64ffda] transition-colors hover:bg-[rgba(100,255,218,0.16)]"
            >
              <FiGithub size={15} />
              GitHub
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded border border-[rgba(204,214,246,0.2)]
                           bg-[rgba(204,214,246,0.06)] px-4 py-2 text-sm font-medium
                           text-[#a8b2d1] transition-colors hover:bg-[rgba(204,214,246,0.12)]"
              >
                <FiExternalLink size={15} />
                Live Demo
              </a>
            )}
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed text-[#8892b0]">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[rgba(100,255,218,0.4)]
                           bg-[rgba(100,255,218,0.08)] px-3 py-1 text-xs
                           font-medium text-[#64ffda]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Screenshot gallery */}
          {project.screenshots.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#8892b0]">
                Screenshots
              </p>
              <div className="flex flex-col gap-4 pb-2">
                {project.screenshots.map((src, idx) => (
                  <div
                    key={idx}
                    className="overflow-hidden rounded-lg border border-[rgba(100,255,218,0.1)]"
                  >
                    <Image
                      src={src}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      width={560}
                      height={340}
                      className="h-auto w-full object-cover"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
