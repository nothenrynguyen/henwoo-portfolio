import { FiExternalLink } from "react-icons/fi";
import experienceData from "@/data/experience.json";

interface ExperienceItem {
  title: string;
  company: string;
  companyUrl?: string;
  date: string;
  quote?: string;
  description: string[];
  technologies: string[];
}

export default function Experience() {
  const experiences: ExperienceItem[] = experienceData;

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="mb-24 scroll-mt-24">
      <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-lightest-slate lg:hidden">
        Experience
      </h2>
      <div className="flex flex-col gap-12">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="group relative flex flex-col gap-4 rounded-lg border border-transparent p-5 transition-all sm:flex-row sm:gap-6 lg:p-6 hover:border-[rgba(148,163,184,0.24)] hover:bg-[rgba(20,18,43,0.55)] hover:drop-shadow-lg"
          >
            {/* Date */}
            <div className="w-36 shrink-0 whitespace-nowrap pt-1 text-xs font-semibold uppercase tracking-wide text-slate">
              {exp.date}
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <h3 className="font-medium leading-snug">
                {exp.companyUrl ? (
                  <a
                    href={exp.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-white transition-colors group-hover:text-green"
                  >
                    {exp.title} · {exp.company}
                    <FiExternalLink className="ml-1 inline-block h-3 w-3 shrink-0" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1 text-white">
                    {exp.title} · {exp.company}
                  </span>
                )}
              </h3>

              {exp.quote ? (
                <p className="mt-3 text-sm italic leading-relaxed text-slate">
                  "{exp.quote}"
                </p>
              ) : (
                <ul className="mt-3 flex flex-col gap-2">
                  {exp.description.map((item, j) => (
                    <li key={j} className="text-sm leading-relaxed text-slate">
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {exp.technologies.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green border border-green/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
