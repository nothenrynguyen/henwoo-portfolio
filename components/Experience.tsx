import { FiExternalLink } from "react-icons/fi";
import experienceData from "@/data/experience.json";

interface ExperienceItem {
  title: string;
  company: string;
  companyUrl: string;
  date: string;
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
            className="group relative grid gap-4 rounded-lg p-5 transition-all sm:grid-cols-8 sm:gap-8 lg:p-6 lg:hover:bg-light-navy/50 lg:hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:hover:drop-shadow-lg"
          >
            {/* Date */}
            <div className="text-xs font-semibold uppercase tracking-wide text-slate sm:col-span-2 sm:pt-1">
              {exp.date}
            </div>

            {/* Content */}
            <div className="sm:col-span-6">
              <h3 className="font-medium leading-snug">
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-lightest-slate transition-colors group-hover:text-green"
                >
                  {exp.title} · {exp.company}
                  <FiExternalLink className="ml-1 inline-block h-3 w-3 shrink-0" />
                </a>
              </h3>

              <ul className="mt-3 flex flex-col gap-2">
                {exp.description.map((item, j) => (
                  <li key={j} className="text-sm leading-relaxed text-slate">
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex flex-wrap gap-2">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
