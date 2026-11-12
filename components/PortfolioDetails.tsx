"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import experience from "@/data/experience.json";
import { projects } from "@/data/projectData";

export default function PortfolioDetails() {
  const [selection, setSelection] = useState<number | "archive" | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selection === null) return;
    const element = dialog.current;
    if (!element) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;
    element.showModal();
    closeButton.current?.focus({ preventScroll: true });
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      previousFocus?.focus({ preventScroll: true });
    };
  }, [selection]);

  const item = typeof selection === "number" ? experience[selection] : null;
  return <>
    <section id="experience" className="experience-section section-wrap">
      <div className="section-label"><span className="eyebrow">03 / Experience</span><h2>Experience</h2></div>
      <div className="experience-list">{experience.map((item, index) => <button className="experience-trigger" key={item.company} onClick={() => setSelection(index)} aria-haspopup="dialog"><span className="exp-company">{item.company}</span><span className="exp-role">{item.title}</span><span className="exp-date">{item.date}</span><span className="details-plus" aria-hidden="true">↗</span></button>)}</div>
    </section>
    <section className="archive-section section-wrap"><button className="archive-trigger" onClick={() => setSelection("archive")} aria-haspopup="dialog"><span><span className="eyebrow">04 / Archive</span><span className="archive-title">More projects</span></span><span className="archive-toggle">View archive <span aria-hidden="true">↗</span></span></button></section>
    <dialog ref={dialog} className={`portfolio-dialog ${selection === "archive" ? "archive-dialog" : ""}`} aria-labelledby="detail-title" onCancel={() => setSelection(null)} onClick={event => { if (event.target === event.currentTarget) setSelection(null); }}>
      <div className="dialog-panel"><header className="dialog-header"><div><span className="eyebrow">{item ? item.date : "Selected experiments"}</span><h2 id="detail-title">{item?.company ?? "Project archive"}</h2>{item && <p>{item.title}</p>}</div><button ref={closeButton} className="dialog-close" onClick={() => setSelection(null)} aria-label="Close details">×</button></header>
        <div className="dialog-body">{item ? <><div className="dialog-description">{item.quote ? <p>“{item.quote}”</p> : item.description.map(line => <p key={line}>{line}</p>)}</div><div className="dialog-tech">{item.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>{item.companyUrl && <a className="dialog-website" href={item.companyUrl} target="_blank" rel="noreferrer">Visit website ↗</a>}</> : <div className="archive-grid">{projects.filter(project => !["yolobun-studios", "app-expo"].includes(project.slug)).map(project => <article key={project.slug}><Image src={project.coverImage} alt={project.title} width={600} height={400} sizes="(max-width: 760px) 85vw, 400px" /><h3>{project.title}</h3><p>{project.description}</p><div>{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">Source ↗</a>}{project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer">Visit ↗</a>}</div></article>)}</div>}</div>
      </div>
    </dialog>
  </>;
}
